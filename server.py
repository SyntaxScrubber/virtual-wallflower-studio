import base64
import json
import os
import sys
import webbrowser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import List, Optional
from pydantic import BaseModel, Field

from lyric_agent import ROLE_PROMPT, SongSection, LyricDraft

BASE_DIR = Path(__file__).resolve().parent
SONGS_FILE = BASE_DIR / "songs.json"


class SectionRewriteResult(BaseModel):
    tag: str = Field(description="The section tag, e.g. [Verse 1] or [Chorus]")
    lines: List[str] = Field(description="Rewritten short, singable lyric lines for this section")
    alternative_lines: List[str] = Field(description="2 alternative lines April can swap in")
    note: str = Field(description="Short explanation of what changed")


class MultimodalBriefResult(BaseModel):
    theme: str = Field(description="Song theme inspired by the uploaded image or audio")
    mood: str = Field(description="Emotional mood keywords")
    genre: str = Field(description="Dream pop / synth-pop subgenre direction")
    title_idea: str = Field(description="3 evocative song title ideas")
    include_line: str = Field(description="1 singable opening or hook line inspired by the media")
    sensory_notes: str = Field(description="Key visual or sonic textures extracted from the media")


def get_client(override_key: Optional[str] = None):
    api_key = (override_key or os.environ.get("GEMINI_API_KEY") or "").strip()
    if not api_key:
        raise ValueError(
            "No GEMINI_API_KEY found. Set GEMINI_API_KEY in your environment or paste your key in the Studio settings."
        )
    from google import genai
    return genai.Client(api_key=api_key)


class StudioRequestHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(BASE_DIR), **kwargs)

    def _send_json(self, payload: dict, status: int = 200):
        data = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(data)

    def _read_json(self) -> dict:
        length = int(self.headers.get("Content-Length", "0"))
        if length <= 0:
            return {}
        raw = self.rfile.read(length)
        return json.loads(raw.decode("utf-8"))

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_GET(self):
        if self.path == "/api/status":
            has_key = bool(os.environ.get("GEMINI_API_KEY", "").strip())
            self._send_json({
                "ok": True,
                "mode": "python-server",
                "has_env_key": has_key,
                "default_model": "gemini-3.8-flash",
            })
            return

        if self.path == "/api/songs":
            if SONGS_FILE.exists():
                try:
                    songs = json.loads(SONGS_FILE.read_text(encoding="utf-8"))
                    self._send_json({"ok": True, "songs": songs})
                    return
                except Exception as exc:
                    self._send_json({"ok": False, "error": str(exc)}, status=500)
                    return
            self._send_json({"ok": True, "songs": []})
            return

        return super().do_GET()

    def do_POST(self):
        try:
            body = self._read_json()
        except Exception as exc:
            self._send_json({"ok": False, "error": f"Invalid JSON body: {exc}"}, status=400)
            return

        if self.path == "/api/songs":
            songs = body.get("songs", [])
            SONGS_FILE.write_text(json.dumps(songs, indent=2, ensure_ascii=False), encoding="utf-8")
            self._send_json({"ok": True, "saved_count": len(songs)})
            return

        if self.path == "/api/generate":
            try:
                client = get_client(body.get("apiKey"))
                model = body.get("model") or "gemini-3.8-flash"
                role_prompt = (body.get("rolePrompt") or ROLE_PROMPT).strip()
                brief_text = (body.get("briefText") or "").strip()

                interaction = client.interactions.create(
                    model=model,
                    system_instruction=role_prompt,
                    input=f"BRIEF:\n{brief_text}",
                    response_format={
                        "type": "text",
                        "mime_type": "application/json",
                        "schema": LyricDraft.model_json_schema(),
                    },
                )
                draft = LyricDraft.model_validate_json(interaction.output_text)
                self._send_json({
                    "ok": True,
                    "interaction_id": interaction.id,
                    "draft": draft.model_dump(),
                })
            except Exception as exc:
                self._send_json({"ok": False, "error": str(exc)}, status=400)
            return

        if self.path == "/api/rewrite-section":
            try:
                client = get_client(body.get("apiKey"))
                model = body.get("model") or "gemini-3.8-flash"
                role_prompt = (body.get("rolePrompt") or ROLE_PROMPT).strip()
                tag = body.get("tag", "[Verse]")
                current_lines = body.get("lines", [])
                instruction = body.get("instruction", "Make the imagery more vivid and singable.")
                song_context = body.get("songContext", "")

                prompt = (
                    f"CURRENT SONG CONTEXT & BRIEF:\n{song_context}\n\n"
                    f"TARGET SECTION TO REWRITE: {tag}\n"
                    f"CURRENT LINES:\n" + "\n".join(current_lines) + "\n\n"
                    f"REWRITE DIRECTION FROM APRIL:\n{instruction}\n\n"
                    "Rewrite this section keeping virtual wallflower's honest, dreamy synth-pop voice and short singable lines."
                )

                interaction = client.interactions.create(
                    model=model,
                    system_instruction=role_prompt,
                    input=prompt,
                    response_format={
                        "type": "text",
                        "mime_type": "application/json",
                        "schema": SectionRewriteResult.model_json_schema(),
                    },
                )
                result = SectionRewriteResult.model_validate_json(interaction.output_text)
                self._send_json({
                    "ok": True,
                    "interaction_id": interaction.id,
                    "result": result.model_dump(),
                })
            except Exception as exc:
                self._send_json({"ok": False, "error": str(exc)}, status=400)
            return

        if self.path == "/api/chat":
            try:
                client = get_client(body.get("apiKey"))
                model = body.get("model") or "gemini-3.8-flash"
                role_prompt = (body.get("rolePrompt") or ROLE_PROMPT).strip()
                message = body.get("message", "")
                song_context = body.get("songContext", "")
                previous_id = body.get("previousInteractionId") or None

                co_writer_system = (
                    role_prompt
                    + "\n\nYou are currently in interactive co-writing chat mode with April in the Virtual Wallflower Lyric Studio. "
                    "Help brainstorm lines, metaphors, bridges, titles, near-rhymes, or Suno style tags. Keep replies concise, creative, and ready to paste into the song."
                )
                user_input = message if previous_id else f"CURRENT SONG STATE:\n{song_context}\n\nAPRIL'S REQUEST:\n{message}"

                kwargs = {
                    "model": model,
                    "system_instruction": co_writer_system,
                    "input": user_input,
                }
                if previous_id:
                    kwargs["previous_interaction_id"] = previous_id

                interaction = client.interactions.create(**kwargs)
                self._send_json({
                    "ok": True,
                    "interaction_id": interaction.id,
                    "reply": interaction.output_text,
                })
            except Exception as exc:
                self._send_json({"ok": False, "error": str(exc)}, status=400)
            return

        if self.path == "/api/generate-track":
            try:
                client = get_client(body.get("apiKey"))
                lyria_model = body.get("lyriaModel") or "lyria-3-clip-preview"
                prompt = body.get("prompt") or "Dreamy synth-pop song."

                interaction = client.interactions.create(
                    model=lyria_model,
                    input=prompt,
                )
                audio_obj = interaction.output_audio
                if not audio_obj or not getattr(audio_obj, "data", None):
                    raise RuntimeError("No audio returned from Lyria model.")
                self._send_json({
                    "ok": True,
                    "interaction_id": interaction.id,
                    "audio_base64": audio_obj.data,
                    "mime_type": getattr(audio_obj, "mime_type", None) or "audio/mp3",
                    "text": interaction.output_text or "",
                })
            except Exception as exc:
                self._send_json({"ok": False, "error": str(exc)}, status=400)
            return

        if self.path == "/api/tts":
            try:
                client = get_client(body.get("apiKey"))
                text = body.get("text") or "Hands shake on the silver latch."
                style = body.get("style") or "intimate, honest, warm indie dream-pop cadence"
                voice = body.get("voice") or "Kore"

                interaction = client.interactions.create(
                    model="gemini-3.8-flash-tts",
                    input=[{
                        "type": "user_input",
                        "content": [{
                            "type": "text",
                            "text": text,
                            "annotations": [{
                                "type": "speech_metadata",
                                "style": style,
                            }],
                        }],
                    }],
                    response_format={"type": "audio"},
                    generation_config={
                        "speech_config": [{"voice": voice}]
                    },
                )
                audio_obj = interaction.output_audio
                if not audio_obj or not getattr(audio_obj, "data", None):
                    raise RuntimeError("No audio returned from Gemini 3.8 TTS.")
                self._send_json({
                    "ok": True,
                    "audio_base64": audio_obj.data,
                    "mime_type": getattr(audio_obj, "mime_type", None) or "audio/wav",
                })
            except Exception as exc:
                self._send_json({"ok": False, "error": str(exc)}, status=400)
            return

        if self.path == "/api/replicate-voice":
            try:
                client = get_client(body.get("apiKey"))
                display_name = body.get("displayName") or "April (virtual wallflower)"
                source_b64 = body.get("sourceAudioBase64", "")
                source_mime = body.get("sourceMimeType", "audio/wav")
                consent_b64 = body.get("consentAudioBase64", "")
                consent_mime = body.get("consentMimeType", "audio/wav")

                replicated_voice = client.voices.create(
                    store=True,
                    voice={
                        "model": "gemini-3.8-flash-tts",
                        "type": "replicated",
                        "display_name": display_name,
                        "replicated": {
                            "source_audio": {
                                "mime_type": source_mime,
                                "data": source_b64,
                            },
                            "consent_audio": {
                                "mime_type": consent_mime,
                                "data": consent_b64,
                            },
                        },
                    },
                )
                self._send_json({
                    "ok": True,
                    "voice_id": replicated_voice.id,
                    "display_name": display_name,
                })
            except Exception as exc:
                self._send_json({"ok": False, "error": str(exc)}, status=400)
            return

        if self.path == "/api/generate-cover":
            try:
                client = get_client(body.get("apiKey"))
                prompt = body.get("prompt") or "Dream pop album cover art"
                interaction = client.interactions.create(
                    model="gemini-nano-banana-2.1",
                    input=prompt,
                )
                img_obj = interaction.output_image
                if not img_obj or not getattr(img_obj, "data", None):
                    raise RuntimeError("No image returned from Nano Banana 2.1.")
                self._send_json({
                    "ok": True,
                    "image_base64": img_obj.data,
                    "mime_type": getattr(img_obj, "mime_type", None) or "image/png",
                })
            except Exception as exc:
                self._send_json({"ok": False, "error": str(exc)}, status=400)
            return

        if self.path == "/api/multimodal-brief":
            try:
                client = get_client(body.get("apiKey"))
                media_type = body.get("mediaType", "image")  # "image" | "audio"
                mime_type = body.get("mimeType", "image/jpeg")
                data_b64 = body.get("dataBase64", "")

                interaction = client.interactions.create(
                    model="gemini-3.8-flash",
                    system_instruction=ROLE_PROMPT,
                    input=[
                        {
                            "type": "text",
                            "text": (
                                "Analyze this uploaded inspiration media for virtual wallflower (dreamy electronic / synth-pop artist from Ohio). "
                                "Extract a song brief with theme, mood, genre, 3 title ideas, 1 opening or chorus line to include, and sensory notes."
                            ),
                        },
                        {
                            "type": media_type,
                            "data": data_b64,
                            "mime_type": mime_type,
                        },
                    ],
                    response_format={
                        "type": "text",
                        "mime_type": "application/json",
                        "schema": MultimodalBriefResult.model_json_schema(),
                    },
                )
                brief_res = MultimodalBriefResult.model_validate_json(interaction.output_text)
                self._send_json({
                    "ok": True,
                    "brief": brief_res.model_dump(),
                })
            except Exception as exc:
                self._send_json({"ok": False, "error": str(exc)}, status=400)
            return

        self._send_json({"ok": False, "error": f"Unknown endpoint: {self.path}"}, status=404)


def main():
    port = int(os.environ.get("PORT", "8080"))
    server = ThreadingHTTPServer(("127.0.0.1", port), StudioRequestHandler)
    url = f"http://localhost:{port}"
    print(f"============================================================")
    print(f"  Virtual Wallflower — Lyric & Vocal Production Studio v2.0")
    print(f"  Running at: {url}")
    has_key = bool(os.environ.get("GEMINI_API_KEY", "").strip())
    print(f"  GEMINI_API_KEY in environment: {'Yes (Ready!)' if has_key else 'No (Can be set in Studio UI)'}")
    print(f"============================================================")
    if "--no-browser" not in sys.argv:
        try:
            webbrowser.open(url)
        except Exception:
            pass
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down Virtual Wallflower Lyric Studio...")
        server.server_close()


if __name__ == "__main__":
    main()
