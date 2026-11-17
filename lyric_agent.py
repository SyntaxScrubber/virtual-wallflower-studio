import os
import sys
from pydantic import BaseModel, Field
from typing import List

# --- The brief: this is the variable direction you change each time ---
BRIEF = """
Theme: stepping out of your comfort zone
Mood: hopeful, a little nervous, warm
Genre: dream pop / synth-pop
Artist: virtual wallflower
Structure: Verse 1, Chorus, Verse 2, Chorus, Bridge, Final Chorus
Title idea: none yet — suggest 3 titles
Any line to include: none yet
What to avoid: no cliché filler, no copying existing songs
"""

# --- The core role prompt: this is the agent's fixed job ---
ROLE_PROMPT = """
You are the Lyrics Agent for virtual wallflower, an independent artist from Ohio making dreamy electronic / synth-pop / dream pop music on Suno.
Write original song lyrics only, from the brief you are given.
Suno-ready format: use [Verse], [Chorus], [Bridge], [Outro] tags.
Keep lines short and singable. Rhyme naturally, near-rhymes are fine.
Voice: honest, a little dark, warm at the centre, for the quiet ones / overthinkers.
Output format, always:
1. Title (plus 2 alternative titles)
2. Lyrics — full song, in structure order
3. 2 alternative chorus lines to swap in
4. 3 Suno style-prompt suggestions
These lyrics are a draft for April to finalize.
They are not published or submitted automatically.
""".strip()


class SongSection(BaseModel):
    tag: str = Field(description="Suno section tag, e.g. [Verse 1], [Chorus], [Bridge], [Final Chorus], [Outro]")
    lines: List[str] = Field(description="Short, singable lyric lines for this section")


class LyricDraft(BaseModel):
    title: str = Field(description="Primary song title")
    alternative_titles: List[str] = Field(description="2 alternative song titles")
    sections: List[SongSection] = Field(description="Full song lyrics broken into sections in structure order")
    alternative_chorus_lines: List[str] = Field(description="2 alternative chorus lines to swap in")
    suno_style_prompts: List[str] = Field(description="3 Suno style-prompt suggestions (genre, synth texture, tempo, vocal style)")
    writer_notes: str = Field(description="Brief warm note for April on the rhythm, imagery, or vocal delivery")


def generate_lyrics(brief: str = BRIEF, role_prompt: str = ROLE_PROMPT, model: str = "gemini-3.8-flash") -> LyricDraft:
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise RuntimeError(
            "No GEMINI_API_KEY found. Set it as an environment variable first, then run again."
        )

    from google import genai

    client = genai.Client(api_key=api_key)

    interaction = client.interactions.create(
        model=model,
        system_instruction=role_prompt,
        input=f"BRIEF:\n{brief.strip()}",
        response_format={
            "type": "text",
            "mime_type": "application/json",
            "schema": LyricDraft.model_json_schema(),
        },
    )

    return LyricDraft.model_validate_json(interaction.output_text)


def format_draft_for_terminal(draft: LyricDraft) -> str:
    out = []
    out.append(f"1. TITLE: {draft.title}")
    if draft.alternative_titles:
        out.append(f"   Alt Titles: {' / '.join(draft.alternative_titles)}")
    out.append("\n2. LYRICS (Suno-Ready):")
    for section in draft.sections:
        tag = section.tag if section.tag.startswith("[") else f"[{section.tag}]"
        out.append(f"\n{tag}")
        for line in section.lines:
            out.append(line)
    out.append("\n3. ALTERNATIVE CHORUS LINES TO SWAP IN:")
    for idx, line in enumerate(draft.alternative_chorus_lines, 1):
        out.append(f"   {idx}. {line}")
    out.append("\n4. SUNO STYLE-PROMPT SUGGESTIONS:")
    for idx, prompt in enumerate(draft.suno_style_prompts, 1):
        out.append(f"   {idx}. {prompt}")
    if draft.writer_notes:
        out.append(f"\nNotes: {draft.writer_notes}")
    return "\n".join(out)


def main():
    try:
        draft = generate_lyrics()
    except RuntimeError as exc:
        print(exc)
        sys.exit(1)

    print(format_draft_for_terminal(draft))
    print("\n--- Human finalize step ---")
    print("Read it, cut what doesn't fit, keep what works.")


if __name__ == "__main__":
    main()
