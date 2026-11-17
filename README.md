# 🌸 virtual wallflower — Lyric Studio & Suno Co-Writer

An interactive songwriting studio and web app built around April's **Virtual Wallflower Lyrics Agent**, powered by the **Gemini Interactions API** (`gemini-3.8-flash` / `gemini-4-argon`).

## Two Ways to Run

### Option 1: Instant Webpage Mode (Zero Setup)
Simply open `index.html` in any web browser!
1. Click **⚙️ API Key & Role Prompt** in the top bar.
2. Paste your `GEMINI_API_KEY` (stored locally in your browser's `localStorage`).
3. Generate full Suno-ready songs, rewrite individual sections, chat with the co-writer, inspect syllable counts & near-rhymes, and export your drafts.

### Option 2: Local Python Server Mode (`server.py`)
If you already set `GEMINI_API_KEY` as an environment variable (like in your original script):

```powershell
pip install -U -r requirements.txt
$env:GEMINI_API_KEY="your-api-key-here"
python server.py
```

This starts the studio at `http://localhost:8080`, uses your environment `GEMINI_API_KEY` automatically via the `google-genai` SDK (`client.interactions.create`), and saves your song library to `songs.json`.

### Option 3: Terminal CLI (`lyric_agent.py`)
Your original command-line script has also been upgraded to the latest `google-genai` Interactions API (`client.interactions.create` with structured Pydantic output):

```powershell
python lyric_agent.py
```
