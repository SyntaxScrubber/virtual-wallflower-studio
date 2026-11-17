// ============================================================================
// virtual wallflower — AI Music Creation, Lyric Studio & Vocal Overdub DAW v3.0
// Suno-Style Custom Mode + Dual-Take Track Crate + Lyria 3.5 + WebAudio Stem DAW
// ============================================================================

const DEFAULT_ROLE_PROMPT = `You are the Lyrics Agent for virtual wallflower, an independent artist from Ohio making dreamy electronic / synth-pop / dream pop music on Suno.
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
They are not published or submitted automatically.`;

const AI_CLICHE_PHRASES = [
  "neon glow", "shadows dance", "dancing in the shadows", "echoes in the night",
  "symphony", "tapestry", "whisper in the wind", "whispers in the wind",
  "moth to a flame", "concrete jungle", "break the chains", "shattered dreams",
  "ashes to ashes", "testament", "unspoken words", "lost in the abyss",
  "painted sky", "tears like rain", "edge of tomorrow", "heart of gold"
];

const PRESET_BRIEFS = [
  {
    name: "Stepping Out of Your Comfort Zone (Default Brief)",
    theme: "stepping out of your comfort zone",
    mood: "hopeful, a little nervous, warm",
    genre: "dream pop / synth-pop",
    artist: "virtual wallflower",
    structure: "Verse 1, Chorus, Verse 2, Chorus, Bridge, Final Chorus",
    titleIdea: "none yet — suggest 3 titles",
    includeLine: "none yet",
    avoid: "no cliché filler, no copying existing songs"
  },
  {
    name: "2AM Ohio Overpass Drive",
    theme: "driving home late after leaving a party early, feeling relief and quiet wonder",
    mood: "2AM overthinking, honest, velvet dark, warm centre",
    genre: "dream pop / nocturnal synth-pop",
    artist: "virtual wallflower",
    structure: "Verse 1, Pre-Chorus, Chorus, Verse 2, Chorus, Bridge, Final Chorus, Outro",
    titleIdea: "something about headlights or exit signs",
    includeLine: "the radio knows my name better than the room did",
    avoid: "no cliché party tropes, keep lines short and airy"
  },
  {
    name: "Unmuting Your Own Voice",
    theme: "saying what you actually mean instead of rehearsing it in your head for days",
    mood: "quiet defiance, pulse racing, warm, electric",
    genre: "synth-pop / bedroom electronic",
    artist: "virtual wallflower",
    structure: "Verse 1, Chorus, Verse 2, Chorus, Bridge, Final Chorus",
    titleIdea: "none yet — suggest 3 titles",
    includeLine: "none yet",
    avoid: "no generic motivational quotes, keep imagery grounded"
  }
];

const STARTER_SONGS = [
  {
    id: "song-porchlight-static",
    title: "Porchlight on the Static",
    alternativeTitles: ["Unbuttoning the Coat", "Half-Step Into Neon"],
    status: "Suno Ready",
    bpm: 108,
    musicalKey: "F# Minor",
    epName: "Porchlight Static EP",
    sunoUrl: "",
    coverArtDataUrl: "",
    updatedAt: new Date().toISOString(),
    brief: {
      theme: "stepping out of your comfort zone",
      mood: "hopeful, a little nervous, warm",
      genre: "dream pop / synth-pop",
      artist: "virtual wallflower",
      structure: "Verse 1, Chorus, Verse 2, Chorus, Bridge, Final Chorus",
      titleIdea: "none yet — suggest 3 titles",
      includeLine: "none yet",
      avoid: "no cliché filler, no copying existing songs"
    },
    sections: [
      {
        tag: "[Verse 1]",
        energy: 4,
        lines: [
          "Kept my shoes by the radiator",
          "Rehearsed the weather in my head",
          "Every doorknob feels like winter",
          "When you've memorized the bed",
          "Screen glow painting constellations",
          "On a ceiling I outgrew"
        ],
        cutIndices: []
      },
      {
        tag: "[Chorus]",
        energy: 8,
        lines: [
          "Hands shake on the silver latch",
          "Heart beats like a skipping track",
          "I'm stepping past the porchlight hum",
          "Into the cold where the colors run",
          "Scared to death, but I'm finally warm",
          "Walking out in my own storm"
        ],
        cutIndices: []
      },
      {
        tag: "[Verse 2]",
        energy: 5,
        lines: [
          "Ohio frost on the hatchback glass",
          "Breath blooms white in the dashboard air",
          "Used to fold myself like paper",
          "Just to fit inside a chair",
          "Now the streetlight turns to amber",
          "And I don't pull the curtain back"
        ],
        cutIndices: []
      },
      {
        tag: "[Chorus]",
        energy: 8,
        lines: [
          "Hands shake on the silver latch",
          "Heart beats like a skipping track",
          "I'm stepping past the porchlight hum",
          "Into the cold where the colors run",
          "Scared to death, but I'm finally warm",
          "Walking out in my own storm"
        ],
        cutIndices: []
      },
      {
        tag: "[Bridge]",
        energy: 6,
        lines: [
          "[Half-Time Bridge]",
          "Maybe quiet doesn't mean invisible",
          "Maybe shaking is just how engines start",
          "Let the synth bass carry the tremors",
          "All the way to the open part"
        ],
        cutIndices: []
      },
      {
        tag: "[Final Chorus]",
        energy: 9,
        lines: [
          "Hands steady on the silver latch",
          "No more rewinding the same old track",
          "I'm stepping past the porchlight hum",
          "Into the night where the colors run",
          "A little nervous, a lot alive",
          "Watch the quiet one learn to drive"
        ],
        cutIndices: []
      }
    ],
    alternativeChorusLines: [
      "Trading the wallpaper for the wide-open static",
      "My voice is shaking, but the melody's mine"
    ],
    sunoStylePrompts: [
      "dream pop, atmospheric synth-pop, warm analog Juno pads, crisp electronic drums, intimate female indie vocals, 108 bpm, bittersweet and hopeful",
      "bedroom electronic, shimmering arpeggiated synths, reverb-drenched guitar swells, driving bassline, honest nocturnal vocal delivery, midtempo",
      "indietronica, lush synthwave textures, soft vocoder harmonies, glowing chorus lift, emotional dream-pop production"
    ],
    snapshots: [
      {
        id: "snap-initial",
        label: "v1 — Initial Comfort-Zone Draft",
        createdAt: new Date(Date.now() - 3600 * 1000 * 2).toISOString(),
        lyricsText: `[Verse 1]\nKept my shoes by the radiator\nRehearsed the weather in my head\nEvery doorknob feels like winter\nWhen you've memorized the bed\n\n[Chorus]\nHands shake on the silver latch\nHeart beats like a skipping track\nI'm stepping past the porchlight hum\nInto the cold where the colors run`
      }
    ],
    writerNotes: "Kept lines between 6–9 syllables for clean phrasing. Notice how the Final Chorus shifts 'Hands shake' to 'Hands steady' to mirror the comfort-zone arc."
  },
  {
    id: "song-i71-midnight",
    title: "I-71 After Midnight",
    alternativeTitles: ["Exit Sign Halo", "Radio Knows My Name"],
    status: "Draft",
    bpm: 100,
    musicalKey: "D Minor",
    epName: "Porchlight Static EP",
    sunoUrl: "",
    coverArtDataUrl: "",
    updatedAt: new Date(Date.now() - 3600 * 1000 * 5).toISOString(),
    brief: {
      theme: "driving home late after leaving a loud room early, finding peace in the quiet",
      mood: "2AM overthinking, honest, velvet dark",
      genre: "dream pop / nocturnal synth-pop",
      artist: "virtual wallflower",
      structure: "Verse 1, Chorus, Verse 2, Chorus, Bridge, Outro",
      titleIdea: "something about Ohio highways at night",
      includeLine: "the radio knows my name",
      avoid: "no cliché party lyrics"
    },
    sections: [
      {
        tag: "[Verse 1]",
        energy: 3,
        lines: [
          "Left my cup on the kitchen counter",
          "Slipped out before the second toast",
          "Too many voices in a small room",
          "Turn a person into a ghost"
        ],
        cutIndices: []
      },
      {
        tag: "[Chorus]",
        energy: 7,
        lines: [
          "Out on I-71 after midnight",
          "Tail-lights melting into rose",
          "The radio knows my name tonight",
          "Better than anybody knows"
        ],
        cutIndices: []
      },
      {
        tag: "[Verse 2]",
        energy: 4,
        lines: [
          "Mile markers blinking like a metronome",
          "Heater humming against my knees",
          "Nothing wrong with wanting the quiet",
          "More than the company"
        ],
        cutIndices: []
      },
      {
        tag: "[Chorus]",
        energy: 8,
        lines: [
          "Out on I-71 after midnight",
          "Tail-lights melting into rose",
          "The radio knows my name tonight",
          "Better than anybody knows"
        ],
        cutIndices: []
      },
      {
        tag: "[Bridge]",
        energy: 6,
        lines: [
          "Overthinker in the passing lane",
          "Letting go of every awkward line",
          "Static turns into a lullaby",
          "Right across the county line"
        ],
        cutIndices: []
      },
      {
        tag: "[Outro]",
        energy: 2,
        lines: [
          "[Whispered Vocals]",
          "Green dashboard glow",
          "Almost home now",
          "Almost home"
        ],
        cutIndices: []
      }
    ],
    alternativeChorusLines: [
      "Sixty-five miles of velvet static and I can finally breathe",
      "Nobody asking why I'm quiet in the driver's seat"
    ],
    sunoStylePrompts: [
      "nocturnal dream pop, lush analog synth bass, soft gated reverb snare, airy introspective vocals, 100 bpm, late night drive vibe",
      "chillwave synth-pop, warm tape saturation, shimmering synth bells, emotional minimal verse to wide chorus"
    ],
    snapshots: [],
    writerNotes: "Built around sparse highway imagery and gentle near-rhymes (toast/ghost, midnight/tonight)."
  }
];

const SENSORY_PALETTE = [
  "porchlight", "static", "amber", "radiator", "cassette", "overpass",
  "frost", "ultraviolet", "velvet", "latch", "dashboard", "skipping track",
  "neon", "breath", "metronome", "silhouette", "midwest", "mercury",
  "undertow", "afterglow", "coat pocket", "windowpane", "frequency", "haze"
];

const BUILTIN_NEAR_RHYMES = {
  night: { exact: ["light", "bright", "sight", "flight", "white"], near: ["time", "alive", "drive", "quiet", "mine", "line", "wide"] },
  warm: { exact: ["storm", "form"], near: ["worn", "morning", "born", "arm", "heart", "dark", "start"] },
  static: { exact: ["attic", "erratic", "dramatic"], near: ["traffic", "habit", "jacket", "past it", "latch it", "magic"] },
  hum: { exact: ["drum", "numb", "come", "some"], near: ["run", "sun", "done", "young", "lungs", "home"] },
  head: { exact: ["bed", "said", "red", "thread"], near: ["breath", "left", "step", "rest", "chest", "kept"] },
  glass: { exact: ["pass", "grass", "class"], near: ["latch", "track", "back", "fast", "last", "ash"] },
  drive: { exact: ["alive", "dive", "thrive"], near: ["night", "light", "mine", "line", "side", "wide"] },
  ghost: { exact: ["toast", "coast", "most", "post"], near: ["close", "knows", "rose", "cold", "home", "alone"] },
  home: { exact: ["roam", "foam", "chrome"], near: ["alone", "stone", "phone", "known", "low", "glow", "cold"] }
};

const LYRIC_DRAFT_JSON_SCHEMA = {
  type: "object",
  properties: {
    title: { type: "string" },
    alternative_titles: { type: "array", items: { type: "string" } },
    sections: {
      type: "array",
      items: {
        type: "object",
        properties: {
          tag: { type: "string" },
          lines: { type: "array", items: { type: "string" } }
        },
        required: ["tag", "lines"]
      }
    },
    alternative_chorus_lines: { type: "array", items: { type: "string" } },
    suno_style_prompts: { type: "array", items: { type: "string" } },
    writer_notes: { type: "string" }
  },
  required: [
    "title",
    "alternative_titles",
    "sections",
    "alternative_chorus_lines",
    "suno_style_prompts",
    "writer_notes"
  ]
};

const SECTION_REWRITE_JSON_SCHEMA = {
  type: "object",
  properties: {
    tag: { type: "string" },
    lines: { type: "array", items: { type: "string" } },
    alternative_lines: { type: "array", items: { type: "string" } },
    note: { type: "string" }
  },
  required: ["tag", "lines", "alternative_lines", "note"]
};

const MULTIMODAL_BRIEF_JSON_SCHEMA = {
  type: "object",
  properties: {
    theme: { type: "string" },
    mood: { type: "string" },
    genre: { type: "string" },
    title_idea: { type: "string" },
    include_line: { type: "string" },
    sensory_notes: { type: "string" }
  },
  required: ["theme", "mood", "genre", "title_idea", "include_line", "sensory_notes"]
};

// ============================================================================
// APPLICATION STATE & TRACK CRATE STATE
// ============================================================================
const state = {
  songs: [],
  activeSongId: null,
  centerView: "suno", // "suno" | "cards" | "audio" | "raw" | "compare" | "ep"
  serverAvailable: false,
  serverHasEnvKey: false,
  apiKey: localStorage.getItem("vw_gemini_api_key") || "",
  rolePrompt: localStorage.getItem("vw_role_prompt") || DEFAULT_ROLE_PROMPT,
  model: localStorage.getItem("vw_model") || "gemini-3.8-flash",
  ttsVoice: localStorage.getItem("vw_tts_voice") || "Kore",
  ttsStyle: localStorage.getItem("vw_tts_style") || "intimate, honest, warm dream-pop vocal cadence",
  previousInteractionId: null,
  styleSuggestionIndex: 0,
  presetIndex: 0,
  // Track Crate (Generated Songs Feed)
  trackCrate: [],
  activeCrateTrackId: null,
  // WebAudio DAW & Visualizer State
  audioCtx: null,
  backingBuffer: null,
  vocalBuffer: null,
  activeMixSources: [],
  isRecordingMic: false,
  mediaRecorder: null,
  recordedChunks: [],
  deckAnalyser: null,
  deckSourceConnected: false,
  chatHistory: [
    {
      role: "agent",
      text: "Hey April 🌸 Welcome to WAVEFORM v3.0 — your personal Suno-style AI Music Generator + Lyric Studio + Multi-Track Vocal Overdub DAW!\n\n• Click 🔥 Create Song (Generate Take A & Take B) to spin up playable takes in the Track Crate.\n• Click 🎙️ Layer My Vocals on any track to record or import your own vocals with stereo Dream-Pop Doubler, Lush Reverb & Tape Delay!"
    }
  ]
};

// ============================================================================
// UTILITY FUNCTIONS (SYLLABLES, RHYME SCHEME, TIMED STRUCTURE COMPILER)
// ============================================================================
function countWordSyllables(word) {
  word = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!word) return 0;
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "");
  word = word.replace(/^y/, "");
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

function countLineSyllables(line) {
  if (!line || !line.trim()) return 0;
  if (/^\[.+\]$/.test(line.trim())) return 0;
  const words = line.trim().split(/\s+/);
  return words.reduce((sum, w) => sum + countWordSyllables(w), 0);
}

function getLastWord(line) {
  if (!line) return "";
  if (/^\[.+\]$/.test(line.trim())) return "";
  const cleaned = line.trim().replace(/[^a-zA-Z\s'-]/g, "");
  const parts = cleaned.split(/\s+/).filter(Boolean);
  return parts.length ? parts[parts.length - 1].toLowerCase() : "";
}

function getPhoneticRhymeKey(word) {
  if (!word) return "";
  let w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!w) return "";
  w = w.replace(/e$/, "");
  const match = w.match(/[aeiouy]+[bcdfghjklmnpqrstvwxz]*$/);
  if (!match) return w.slice(-2);
  let tail = match[0];
  tail = tail
    .replace(/ght$/, "t")
    .replace(/atch$/, "ack")
    .replace(/um$/, "un")
    .replace(/rm$/, "rn")
    .replace(/st$/, "s")
    .replace(/ve$/, "ne");
  return tail;
}

function computeSectionRhymeLetters(lines) {
  const map = {};
  const letters = ["A", "B", "C", "D", "E", "F"];
  let nextIdx = 0;

  return lines.map(line => {
    if (/^\[.+\]$/.test((line || "").trim())) return null;
    const last = getLastWord(line);
    if (!last) return null;
    const key = getPhoneticRhymeKey(last);
    if (!key) return null;
    if (!map[key]) {
      map[key] = letters[nextIdx % letters.length];
      nextIdx++;
    }
    return map[key];
  });
}

function findClichesInSong(song) {
  if (!song) return [];
  const hits = [];
  song.sections.forEach((sec, secIdx) => {
    sec.lines.forEach((line, lineIdx) => {
      const lower = (line || "").toLowerCase();
      AI_CLICHE_PHRASES.forEach(phrase => {
        if (lower.includes(phrase)) {
          hits.push({ secIdx, lineIdx, tag: sec.tag, line, phrase });
        }
      });
    });
  });
  return hits;
}

function getActiveSong() {
  return state.songs.find(s => s.id === state.activeSongId) || state.songs[0];
}

function formatTimeSec(sec) {
  const s = Math.max(0, Math.floor(Number(sec) || 0));
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return `${m}:${rem < 10 ? "0" : ""}${rem}`;
}

function buildTimedLyriaStructurePrompt(song, includeTimestamps = true) {
  if (!song) return "";
  let currentSec = 0;
  return (song.sections || [])
    .map(sec => {
      const activeLines = sec.lines.filter((_, idx) => !(sec.cutIndices || []).includes(idx));
      const secDur = Math.max(8, activeLines.length * 3);
      const startStr = formatTimeSec(currentSec);
      const endStr = formatTimeSec(currentSec + secDur);
      currentSec += secDur;

      const tag = sec.tag.startsWith("[") ? sec.tag : `[${sec.tag}]`;
      const energyDesc =
        (sec.energy || 5) >= 8
          ? "Full lush synth-pop chorus lift, wide analog pads, driving drums"
          : (sec.energy || 5) <= 3
          ? "Intimate minimal synth pulse, soft atmospheric texture"
          : "Warm midtempo electronic groove, shimmering arpeggio";

      const header = includeTimestamps
        ? `[${startStr} - ${endStr}] ${tag} (${energyDesc})`
        : tag;
      return `${header}\n${activeLines.join("\n")}`;
    })
    .join("\n\n");
}

function formatSongForSuno(song) {
  if (!song) return "";
  return (song.sections || [])
    .map(sec => {
      const tag = sec.tag.startsWith("[") ? sec.tag : `[${sec.tag}]`;
      const activeLines = sec.lines.filter((_, idx) => !(sec.cutIndices || []).includes(idx));
      return `${tag}\n${activeLines.join("\n")}`;
    })
    .join("\n\n");
}

function parseRawSunoText(rawText) {
  const lines = rawText.split(/\r?\n/);
  const sections = [];
  let current = null;

  for (const rawLine of lines) {
    const trimmed = rawLine.trim();
    if (!trimmed) continue;
    if (/^\[(Verse|Chorus|Bridge|Pre-Chorus|Final Chorus|Outro|Intro).*\]$/i.test(trimmed)) {
      current = { tag: trimmed, energy: /chorus/i.test(trimmed) ? 8 : 5, lines: [], cutIndices: [] };
      sections.push(current);
    } else {
      if (!current) {
        current = { tag: "[Verse 1]", energy: 4, lines: [], cutIndices: [] };
        sections.push(current);
      }
      current.lines.push(trimmed);
    }
  }
  return sections.length ? sections : [{ tag: "[Verse 1]", energy: 4, lines: [""], cutIndices: [] }];
}

function showToast(message, icon = "✨") {
  const el = document.getElementById("toastNotification");
  const iconEl = document.getElementById("toastIcon");
  const textEl = document.getElementById("toastText");
  if (!el) return;
  iconEl.textContent = icon;
  textEl.textContent = message;
  el.classList.remove("hidden");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => {
    el.classList.add("hidden");
  }, 3000);
}

function saveSongsToStorage() {
  localStorage.setItem("vw_songs_library_v3", JSON.stringify(state.songs));
  if (state.serverAvailable) {
    fetch("/api/songs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ songs: state.songs })
    }).catch(() => {});
  }
  renderSongList();
  renderSingabilityDiagnostics();
  renderEnergyArcSvg();
}

function buildBriefString(briefObj) {
  return [
    `Theme: ${briefObj.theme || "stepping out of your comfort zone"}`,
    `Mood: ${briefObj.mood || "hopeful, a little nervous, warm"}`,
    `Genre: ${briefObj.genre || "dream pop / synth-pop"}`,
    `Artist: ${briefObj.artist || "virtual wallflower"}`,
    `Structure: ${briefObj.structure || "Verse 1, Chorus, Verse 2, Chorus, Bridge, Final Chorus"}`,
    `Title idea: ${briefObj.titleIdea || "none yet — suggest 3 titles"}`,
    `Any line to include: ${briefObj.includeLine || "none yet"}`,
    `What to avoid: ${briefObj.avoid || "no cliché filler, no copying existing songs"}`
  ].join("\n");
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || "");
      const commaIdx = result.indexOf(",");
      resolve(commaIdx >= 0 ? result.slice(commaIdx + 1) : result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function base64ToArrayBuffer(b64) {
  const binary = atob(b64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

// ============================================================================
// GEMINI INTERACTIONS API CLIENT (SERVER OR DIRECT BROWSER REST)
// ============================================================================
async function checkBackendStatus() {
  try {
    const res = await fetch("/api/status", { method: "GET" });
    if (res.ok) {
      const data = await res.json();
      state.serverAvailable = true;
      state.serverHasEnvKey = !!data.has_env_key;
    }
  } catch (_) {
    state.serverAvailable = false;
    state.serverHasEnvKey = false;
  }
  updateConnectionBadge();
}

function updateConnectionBadge() {
  const dot = document.getElementById("connectionDot");
  const text = document.getElementById("connectionText");
  if (!dot || !text) return;

  if (state.serverAvailable && state.serverHasEnvKey) {
    dot.className = "w-2 h-2 rounded-full bg-emerald-400";
    text.textContent = "Gemini Live (Python Server + Env Key)";
  } else if (state.apiKey) {
    dot.className = "w-2 h-2 rounded-full bg-emerald-400";
    text.textContent = "Gemini Live (API Key Active)";
  } else {
    dot.className = "w-2 h-2 rounded-full bg-amber-400";
    text.textContent = "Synth Engine Ready (Add API Key for Gemini/Lyria)";
  }
}

function extractInteractionOutputText(interactionData) {
  if (!interactionData) return "";
  if (typeof interactionData.output_text === "string" && interactionData.output_text) {
    return interactionData.output_text;
  }
  if (Array.isArray(interactionData.steps)) {
    const texts = [];
    for (const step of interactionData.steps) {
      if (step.type === "model_output" && Array.isArray(step.content)) {
        for (const part of step.content) {
          if (part.type === "text" && typeof part.text === "string") {
            texts.push(part.text);
          }
        }
      }
    }
    if (texts.length) return texts.join("");
  }
  return "";
}

function extractInteractionPart(interactionData, partType) {
  if (!interactionData) return null;
  if (partType === "audio" && interactionData.output_audio?.data) {
    return interactionData.output_audio;
  }
  if (partType === "image" && interactionData.output_image?.data) {
    return interactionData.output_image;
  }
  if (Array.isArray(interactionData.steps)) {
    for (let i = interactionData.steps.length - 1; i >= 0; i--) {
      const step = interactionData.steps[i];
      if (step.type === "model_output" && Array.isArray(step.content)) {
        for (let j = step.content.length - 1; j >= 0; j--) {
          const part = step.content[j];
          if (part.type === partType && part.data) {
            return part;
          }
        }
      }
    }
  }
  return null;
}

async function callGeminiInteractionsDirect({ model, systemInstruction, input, previousInteractionId, responseFormat, generationConfig }) {
  const key = (state.apiKey || "").trim();
  if (!key) throw new Error("MISSING_API_KEY");

  const payload = {
    model: model || state.model || "gemini-3.8-flash",
    input: input
  };
  if (systemInstruction) payload.system_instruction = systemInstruction;
  if (previousInteractionId) payload.previous_interaction_id = previousInteractionId;
  if (responseFormat) payload.response_format = responseFormat;
  if (generationConfig) payload.generation_config = generationConfig;

  const response = await fetch("https://generativelanguage.googleapis.com/v1beta/interactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": key,
      "Api-Revision": "2026-05-20"
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();
  if (!response.ok) {
    const errMsg = data?.error?.message || JSON.stringify(data);
    throw new Error(`Gemini API Error (${response.status}): ${errMsg}`);
  }

  return {
    id: data.id,
    raw: data,
    text: extractInteractionOutputText(data),
    audio: extractInteractionPart(data, "audio"),
    image: extractInteractionPart(data, "image")
  };
}

// ============================================================================
// MULTI-SECTION SYNTH-POP ARRANGEMENT ENGINE & DUAL-TAKE GENERATOR
// ============================================================================
// Synthesizes a multi-section stereo track (Verse -> Chorus -> Bridge -> Final Chorus)
// that follows the active song's section energy levels, BPM, Key, and mixes in Vocal Stem if available!
async function synthesizeMultiSectionTrackBuffer({ song, variant = "A", includeVocalStem = false }) {
  const bpm = Number(song?.bpm) || 108;
  const keyStr = (song?.musicalKey || "F# Minor").toUpperCase();

  const rootMap = {
    "C": 130.81, "C#": 138.59, "D": 146.83, "D#": 155.56, "EB": 155.56,
    "E": 164.81, "F": 174.61, "F#": 185.00, "G": 196.00, "G#": 207.65,
    "A": 220.00, "A#": 233.08, "BB": 233.08, "B": 246.94
  };
  const keyMatch = keyStr.match(/^[A-G][#B]?/);
  const baseFreq = (keyMatch && rootMap[keyMatch[0]]) || 185.00;
  const isMinor = keyStr.includes("M") && !keyStr.includes("MAJ");

  const sampleRate = 44100;
  const secPerBeat = 60 / bpm;
  const barDur = 4 * secPerBeat;

  // Build section timeline (2 bars per section so a 6-section song is ~26-30 seconds of dynamic sections)
  const sections = (song?.sections && song.sections.length)
    ? song.sections
    : [
        { tag: "[Verse 1]", energy: 4 },
        { tag: "[Chorus]", energy: 8 },
        { tag: "[Verse 2]", energy: 5 },
        { tag: "[Final Chorus]", energy: 9 }
      ];

  const barsPerSection = 2;
  const totalBars = sections.length * barsPerSection;
  const totalDuration = totalBars * barDur;

  const offline = new OfflineAudioContext(2, Math.ceil(sampleRate * totalDuration), sampleRate);

  // Variant A = Warm Juno-106 Progression (i - VI - III - VII)
  // Variant B = Nocturnal Shimmer Progression (i - iv - VII - III with higher octave bells)
  const progA = isMinor
    ? [
        [1, 1.189, 1.498, 1.782],
        [0.7937, 1.0, 1.189, 1.498],
        [1.189, 1.498, 1.782, 2.245],
        [0.8909, 1.122, 1.335, 1.682]
      ]
    : [
        [1, 1.2599, 1.498, 1.8877],
        [0.749, 0.9438, 1.122, 1.498],
        [0.8409, 1.0, 1.2599, 1.498],
        [0.6674, 0.8409, 1.0, 1.2599]
      ];

  const progB = isMinor
    ? [
        [1, 1.189, 1.498, 1.8877],
        [1.3348, 1.5874, 2.0, 2.378],
        [0.8909, 1.122, 1.335, 1.682],
        [1.189, 1.498, 1.782, 2.245]
      ]
    : progA.slice().reverse();

  const chords = variant === "B" ? progB : progA;

  sections.forEach((sec, secIdx) => {
    const energy = Math.max(1, Math.min(10, Number(sec.energy) || 5));
    const energyNorm = energy / 10; // 0.1 to 1.0
    const isChorus = /chorus/i.test(sec.tag);
    const isBridge = /bridge/i.test(sec.tag);

    for (let b = 0; b < barsPerSection; b++) {
      const globalBar = secIdx * barsPerSection + b;
      const barStart = globalBar * barDur;
      const chord = chords[globalBar % chords.length];

      // 1. Lush Stereo Analog Pad (opens filter wider on high-energy Choruses)
      const cutoff = 420 + energyNorm * 1650;
      chord.forEach((ratio, vIdx) => {
        [-8, 8].forEach((detune, panIdx) => {
          const osc = offline.createOscillator();
          osc.type = variant === "B" ? "triangle" : "sawtooth";
          osc.frequency.value = baseFreq * ratio;
          osc.detune.value = detune + vIdx * 2.5;

          const filter = offline.createBiquadFilter();
          filter.type = "lowpass";
          filter.frequency.setValueAtTime(cutoff * 0.7, barStart);
          filter.frequency.exponentialRampToValueAtTime(cutoff, barStart + barDur * 0.5);
          filter.frequency.exponentialRampToValueAtTime(cutoff * 0.75, barStart + barDur);

          const gain = offline.createGain();
          const padPeak = 0.028 + energyNorm * 0.025;
          gain.gain.setValueAtTime(0.001, barStart);
          gain.gain.linearRampToValueAtTime(padPeak, barStart + 0.2);
          gain.gain.setValueAtTime(padPeak, barStart + barDur - 0.2);
          gain.gain.linearRampToValueAtTime(0.001, barStart + barDur);

          const panner = offline.createStereoPanner();
          panner.pan.value = panIdx === 0 ? -0.55 : 0.55;

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(panner);
          panner.connect(offline.destination);
          osc.start(barStart);
          osc.stop(barStart + barDur);
        });
      });

      // 2. Driving Synth Bassline (8th-note pulsing bass in Choruses, warm sustained bass in Verses/Bridges)
      const bassSteps = isChorus ? 8 : 2;
      const bassStepDur = barDur / bassSteps;
      for (let s = 0; s < bassSteps; s++) {
        const st = barStart + s * bassStepDur;
        const bassOsc = offline.createOscillator();
        bassOsc.type = "sawtooth";
        bassOsc.frequency.value = (baseFreq * 0.5) * chord[0];

        const bassFilter = offline.createBiquadFilter();
        bassFilter.type = "lowpass";
        bassFilter.frequency.value = isChorus ? 520 : 310;

        const bassGain = offline.createGain();
        const bAmp = 0.09 + energyNorm * 0.06;
        bassGain.gain.setValueAtTime(0.001, st);
        bassGain.gain.linearRampToValueAtTime(bAmp, st + 0.02);
        bassGain.gain.exponentialRampToValueAtTime(0.002, st + bassStepDur * 0.92);

        bassOsc.connect(bassFilter);
        bassFilter.connect(bassGain);
        bassGain.connect(offline.destination);
        bassOsc.start(st);
        bassOsc.stop(st + bassStepDur);
      }

      // 3. Shimmering Synth Arpeggio / Lead Bell Melody
      const arpSteps = variant === "B" ? 16 : 8;
      const arpStepDur = barDur / arpSteps;
      for (let s = 0; s < arpSteps; s++) {
        const nt = barStart + s * arpStepDur;
        const noteRatio = chord[(s + (variant === "B" ? 1 : 0)) % chord.length] * (isChorus ? 2 : 1.5);
        const arpOsc = offline.createOscillator();
        arpOsc.type = variant === "B" ? "sine" : "triangle";
        arpOsc.frequency.value = baseFreq * noteRatio;

        const arpGain = offline.createGain();
        const aAmp = 0.025 + energyNorm * 0.035;
        arpGain.gain.setValueAtTime(0.001, nt);
        arpGain.gain.linearRampToValueAtTime(aAmp, nt + 0.015);
        arpGain.gain.exponentialRampToValueAtTime(0.001, nt + arpStepDur * 0.88);

        const arpPan = offline.createStereoPanner();
        arpPan.pan.value = ((s % 4) - 1.5) * 0.3;

        arpOsc.connect(arpGain);
        arpGain.connect(arpPan);
        arpPan.connect(offline.destination);
        arpOsc.start(nt);
        arpOsc.stop(nt + arpStepDur);
      }

      // 4. Drum Machine (Kick, Gated Snare, 16th Hi-Hats on Choruses)
      if (!isBridge || energy >= 5) {
        for (let beat = 0; beat < 4; beat++) {
          const bt = barStart + beat * secPerBeat;
          if (beat % 2 === 0) {
            const kick = offline.createOscillator();
            kick.type = "sine";
            kick.frequency.setValueAtTime(130, bt);
            kick.frequency.exponentialRampToValueAtTime(40, bt + 0.14);
            const kGain = offline.createGain();
            kGain.gain.setValueAtTime(0.28 + energyNorm * 0.1, bt);
            kGain.gain.exponentialRampToValueAtTime(0.001, bt + 0.22);
            kick.connect(kGain);
            kGain.connect(offline.destination);
            kick.start(bt);
            kick.stop(bt + 0.24);
          } else {
            const noiseBuf = offline.createBuffer(1, Math.floor(sampleRate * 0.22), sampleRate);
            const data = noiseBuf.getChannelData(0);
            for (let i = 0; i < data.length; i++) {
              data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (sampleRate * (isChorus ? 0.08 : 0.045)));
            }
            const noise = offline.createBufferSource();
            noise.buffer = noiseBuf;
            const bp = offline.createBiquadFilter();
            bp.type = "bandpass";
            bp.frequency.value = variant === "B" ? 2100 : 1750;
            const sGain = offline.createGain();
            sGain.gain.value = 0.11 + energyNorm * 0.08;
            noise.connect(bp);
            bp.connect(sGain);
            sGain.connect(offline.destination);
            noise.start(bt);
          }
        }
      }
    }
  });

  // Mix in User's Vocal Stem if requested and loaded
  if (includeVocalStem && state.vocalBuffer) {
    const vocSrc = offline.createBufferSource();
    vocSrc.buffer = state.vocalBuffer;
    const vocGain = offline.createGain();
    vocGain.gain.value = 1.0;
    vocSrc.connect(vocGain);
    vocGain.connect(offline.destination);

    // Stereo Doubler
    [-0.015, 0.021].forEach((delaySec, idx) => {
      const d = offline.createDelay(0.1);
      d.delayTime.value = Math.abs(delaySec);
      const p = offline.createStereoPanner();
      p.pan.value = idx === 0 ? -0.65 : 0.65;
      const g = offline.createGain();
      g.gain.value = 0.28;
      vocSrc.connect(d);
      d.connect(g);
      g.connect(p);
      p.connect(offline.destination);
    });

    vocSrc.start(0);
  }

  return await offline.startRendering();
}

// Suno-Style "Create Song (Generate Take A & Take B)" Handler
async function handleSunoCreateDualTakes() {
  const song = getActiveSong();
  if (!song) return;

  const isInstrumental = document.getElementById("sunoInstrumentalToggle").checked;
  const includeTimed = document.getElementById("sunoTimedStructureToggle").checked;
  const styleText = document.getElementById("sunoStyleInput").value.trim() ||
    (song.sunoStylePrompts && song.sunoStylePrompts[0]) ||
    "dream pop, synth-pop, warm analog Juno pads";
  const negText = document.getElementById("sunoNegativeStyleInput").value.trim();
  const vocalSource = document.getElementById("sunoVocalSourceSelect").value;
  const engine = document.getElementById("sunoEngineSelect").value;

  const btn = document.getElementById("sunoCreateDualTakesBtn");
  const btnText = document.getElementById("sunoCreateBtnText");
  btn.disabled = true;
  btnText.textContent = "⏳ Spinning Up Take A & Take B...";

  try {
    // If user chose "Gemini 3.8 TTS / My Voice ID" as Vocal Layer Source and we have an API key, synthesize vocal stem first
    if (!isInstrumental && vocalSource === "tts-clone" && (state.apiKey || state.serverHasEnvKey) && !state.vocalBuffer) {
      try {
        await handleGenerateTtsReadback(formatSongForSuno(song), song.title, true);
      } catch (_) {}
    }

    const mixVocal = !isInstrumental && (vocalSource === "user-stem" || vocalSource === "tts-clone") && !!state.vocalBuffer;

    // 1. Always synthesize Take A & Take B with our Multi-Section Arrangement Engine so 2 full takes appear immediately
    const [bufA, bufB] = await Promise.all([
      synthesizeMultiSectionTrackBuffer({ song, variant: "A", includeVocalStem: mixVocal }),
      synthesizeMultiSectionTrackBuffer({ song, variant: "B", includeVocalStem: mixVocal })
    ]);

    const wavA = audioBufferToWav(bufA);
    const wavB = audioBufferToWav(bufB);
    const urlA = URL.createObjectURL(new Blob([wavA], { type: "audio/wav" }));
    const urlB = URL.createObjectURL(new Blob([wavB], { type: "audio/wav" }));

    const takeA = {
      id: "crate-" + Date.now() + "-a",
      songId: song.id,
      title: `${song.title} — Take A`,
      badge: mixVocal ? "v1 Vocal + Synth Mix" : isInstrumental ? "v1 Instrumental" : "v1 Warm Juno Mix",
      style: styleText,
      bpm: song.bpm || 108,
      musicalKey: song.musicalKey || "F# Minor",
      durationSec: Math.round(bufA.duration),
      audioUrl: urlA,
      arrayBuffer: wavA,
      coverArt: song.coverArtDataUrl || "",
      liked: false,
      createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    const takeB = {
      id: "crate-" + Date.now() + "-b",
      songId: song.id,
      title: `${song.title} — Take B`,
      badge: mixVocal ? "v2 Nocturnal Vocal Mix" : isInstrumental ? "v2 Shimmer Instrumental" : "v2 Nocturnal Arp Mix",
      style: styleText,
      bpm: song.bpm || 108,
      musicalKey: song.musicalKey || "F# Minor",
      durationSec: Math.round(bufB.duration),
      audioUrl: urlB,
      arrayBuffer: wavB,
      coverArt: song.coverArtDataUrl || "",
      liked: false,
      createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    state.trackCrate.unshift(takeB);
    state.trackCrate.unshift(takeA);

    // Also try calling Lyria 3.5 / Lyria 3 Clip API if user selected a Lyria engine and has an API key
    if ((engine === "lyria-3.5" || engine === "lyria-3-clip-preview" || engine === "hybrid-auto") && (state.apiKey || state.serverHasEnvKey)) {
      const lyriaModel = engine === "lyria-3.5" ? "lyria-3.5" : "lyria-3-clip-preview";
      const structurePrompt = buildTimedLyriaStructurePrompt(song, includeTimed);
      const fullLyriaPrompt = isInstrumental
        ? `Create a ${styleText} instrumental song in ${song.musicalKey || "F# Minor"} at ${song.bpm || 108} BPM. Avoid: ${negText}.\n\n${structurePrompt}`
        : `Create a ${styleText} song in ${song.musicalKey || "F# Minor"} at ${song.bpm || 108} BPM. Avoid: ${negText}.\n\nLyrics & Timed Structure:\n${structurePrompt}`;

      try {
        btnText.textContent = `⏳ Calling Gemini ${lyriaModel}...`;
        const lyriaBuf = await callLyriaApiForArrayBuffer(lyriaModel, fullLyriaPrompt);
        if (lyriaBuf) {
          const lyriaBlob = new Blob([lyriaBuf.buffer], { type: lyriaBuf.mimeType });
          const lyriaUrl = URL.createObjectURL(lyriaBlob);
          state.trackCrate.unshift({
            id: "crate-" + Date.now() + "-lyria",
            songId: song.id,
            title: `${song.title} (Lyria AI Master)`,
            badge: lyriaModel,
            style: styleText,
            bpm: song.bpm || 108,
            musicalKey: song.musicalKey || "F# Minor",
            durationSec: 30,
            audioUrl: lyriaUrl,
            arrayBuffer: lyriaBuf.buffer,
            coverArt: song.coverArtDataUrl || "",
            liked: true,
            createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          });
        }
      } catch (lyriaErr) {
        if (engine !== "hybrid-auto") {
          showToast(`Lyria API note: ${lyriaErr.message}. Created Synth Takes A & B!`, "ℹ️");
        }
      }
    }

    renderTrackCrate();
    playCrateTrackInDeck(state.trackCrate[0].id);
    showToast(`Created Take A & Take B for "${song.title}"!`, "🔥");
  } catch (err) {
    showToast(err.message || "Creation failed", "⚠️");
  } finally {
    btn.disabled = false;
    btnText.textContent = "Create Song (Generate Take A & Take B)";
  }
}

async function callLyriaApiForArrayBuffer(lyriaModel, prompt) {
  let audioB64 = "";
  let mimeType = "audio/mp3";

  if (state.serverAvailable && (state.serverHasEnvKey || state.apiKey)) {
    const res = await fetch("/api/generate-track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apiKey: state.apiKey,
        lyriaModel,
        prompt
      })
    });
    const json = await res.json();
    if (!res.ok || !json.ok) throw new Error(json.error || "Lyria generation failed");
    audioB64 = json.audio_base64;
    mimeType = json.mime_type || "audio/mp3";
  } else {
    const result = await callGeminiInteractionsDirect({
      model: lyriaModel,
      input: prompt
    });
    if (!result.audio?.data) throw new Error("No audio returned from Lyria model.");
    audioB64 = result.audio.data;
    mimeType = result.audio.mime_type || "audio/mp3";
  }

  return {
    buffer: base64ToArrayBuffer(audioB64),
    mimeType
  };
}

// ============================================================================
// PERSISTENT BOTTOM PLAYER DECK, SPECTRUM VISUALIZER & KARAOKE TELEPROMPTER
// ============================================================================
function playCrateTrackInDeck(crateId) {
  const item = state.trackCrate.find(t => t.id === crateId);
  if (!item) return;

  state.activeCrateTrackId = item.id;
  const audioEl = document.getElementById("deckMasterAudio");
  audioEl.src = item.audioUrl;

  document.getElementById("deckTrackTitle").textContent = item.title;
  document.getElementById("deckTrackSubtitle").textContent = `virtual wallflower • ${item.bpm} BPM • ${item.musicalKey} • ${item.badge}`;

  const dl = document.getElementById("deckDownloadLink");
  dl.href = item.audioUrl;
  dl.download = `${item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.wav`;

  const imgEl = document.getElementById("deckCoverImg");
  const emojiEl = document.getElementById("deckCoverEmoji");
  if (item.coverArt) {
    imgEl.src = item.coverArt;
    imgEl.classList.remove("hidden");
    emojiEl.classList.add("hidden");
  } else {
    imgEl.classList.add("hidden");
    emojiEl.classList.remove("hidden");
  }

  setupDeckVisualizer();
  audioEl.play().catch(() => {});
  renderTrackCrate();
}

function setupDeckVisualizer() {
  const audioEl = document.getElementById("deckMasterAudio");
  if (state.deckSourceConnected) return;
  try {
    const ctx = getAudioContext();
    const src = ctx.createMediaElementSource(audioEl);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 64;
    src.connect(analyser);
    analyser.connect(ctx.destination);
    state.deckAnalyser = analyser;
    state.deckSourceConnected = true;
    requestAnimationFrame(drawDeckVisualizerLoop);
  } catch (_) {}
}

function drawDeckVisualizerLoop() {
  const canvas = document.getElementById("bottomVisualizerCanvas");
  if (canvas && state.deckAnalyser) {
    const ctx2d = canvas.getContext("2d");
    const bufferLength = state.deckAnalyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    state.deckAnalyser.getByteFrequencyData(dataArray);

    ctx2d.clearRect(0, 0, canvas.width, canvas.height);
    const barWidth = (canvas.width / bufferLength) - 1;
    for (let i = 0; i < bufferLength; i++) {
      const val = dataArray[i] / 255;
      const barHeight = Math.max(2, val * canvas.height);
      const x = i * (barWidth + 1);
      const y = canvas.height - barHeight;
      ctx2d.fillStyle = i % 2 === 0 ? "#a78bfa" : "#f472b6";
      ctx2d.fillRect(x, y, barWidth, barHeight);
    }
  }
  requestAnimationFrame(drawDeckVisualizerLoop);
}

function renderTrackCrate() {
  const container = document.getElementById("trackCrateContainer");
  const badge = document.getElementById("trackCrateCountBadge");
  if (!container) return;

  badge.textContent = String(state.trackCrate.length);
  container.innerHTML = "";

  state.trackCrate.forEach(item => {
    const isPlaying = item.id === state.activeCrateTrackId;
    const card = document.createElement("div");
    card.className = `track-crate-card p-3 flex flex-wrap items-center justify-between gap-3 ${isPlaying ? "playing" : ""}`;

    card.innerHTML = `
      <div class="flex items-center gap-3 min-w-[220px] flex-1">
        <button type="button" data-crate-play="${item.id}" class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/40 via-pink-600/30 to-amber-500/20 border border-pink-400/40 flex items-center justify-center text-white font-bold text-sm shadow-md cursor-pointer relative overflow-hidden">
          ${item.coverArt ? `<img src="${item.coverArt}" class="w-full h-full object-cover opacity-65" />` : ""}
          <span class="relative z-10">${isPlaying ? "🔊" : "▶"}</span>
        </button>
        <div class="truncate flex-1">
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold text-white truncate">${escapeHtml(item.title)}</span>
            <span class="text-xs px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-200 border border-pink-400/30 mono whitespace-nowrap">${escapeHtml(item.badge)}</span>
          </div>
          <div class="text-xs text-[#9e96b8] truncate mt-0.5">${escapeHtml(item.style)}</div>
          <div class="text-xs text-purple-300/80 mono mt-0.5">${item.bpm} BPM • ${escapeHtml(item.musicalKey)} • ${formatTimeSec(item.durationSec)} • ${item.createdAt}</div>
        </div>
      </div>

      <div class="flex items-center gap-1.5">
        <button type="button" data-crate-overdub="${item.id}" class="px-2.5 py-1.5 rounded-lg bg-pink-500/20 hover:bg-pink-500/35 border border-pink-400/40 text-xs font-semibold text-pink-100 transition cursor-pointer" title="Send to Channel 1 in Vocal Overdub Studio to record/mix your own vocals">
          🎙️ Overdub Vocals
        </button>
        <button type="button" data-crate-like="${item.id}" class="px-2.5 py-1.5 rounded-lg bg-[#0e0c16] border border-[#2a2440] text-xs ${item.liked ? "text-rose-400" : "text-[#9e96b8]"}" title="Like take">
          ${item.liked ? "❤️" : "🤍"}
        </button>
        <a href="${item.audioUrl}" download="${item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.wav" class="px-2.5 py-1.5 rounded-lg bg-[#0e0c16] hover:bg-purple-500/20 border border-[#2a2440] text-xs text-gray-200 mono">
          ⬇️ WAV
        </a>
      </div>
    `;
    container.appendChild(card);
  });
}

// ============================================================================
// AI FEATURES: LYRICS, MULTIMODAL BRIEF, COVER ART, LYRIA TRACK, TTS & VOICE REP
// ============================================================================
async function handleGenerateFullDraft() {
  const song = getActiveSong();
  if (!song) return;

  syncBriefInputsToSong();
  const briefText = buildBriefString(song.brief);
  const btn = document.getElementById("generateDraftBtn");
  const btnText = document.getElementById("generateBtnText");
  const btnIcon = document.getElementById("generateBtnIcon");

  btn.disabled = true;
  btnIcon.textContent = "⏳";
  btnText.textContent = "Writing with Gemini...";

  try {
    let draftData = null;

    if (state.serverAvailable && (state.serverHasEnvKey || state.apiKey)) {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey: state.apiKey,
          model: state.model,
          rolePrompt: state.rolePrompt,
          briefText
        })
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Server generation failed");
      draftData = json.draft;
      state.previousInteractionId = json.interaction_id;
    } else {
      const result = await callGeminiInteractionsDirect({
        model: state.model,
        systemInstruction: state.rolePrompt,
        input: `BRIEF:\n${briefText}`,
        responseFormat: {
          type: "text",
          mime_type: "application/json",
          schema: LYRIC_DRAFT_JSON_SCHEMA
        }
      });
      draftData = JSON.parse(result.text);
      state.previousInteractionId = result.id;
    }

    if (song.sections && song.sections.length) {
      song.snapshots = song.snapshots || [];
      song.snapshots.unshift({
        id: "snap-" + Date.now(),
        label: `Pre-Generate Backup (${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })})`,
        createdAt: new Date().toISOString(),
        lyricsText: formatSongForSuno(song)
      });
    }

    song.title = draftData.title || "Untitled Draft";
    song.alternativeTitles = draftData.alternative_titles || [];
    song.sections = (draftData.sections || []).map(s => {
      const tag = s.tag.startsWith("[") ? s.tag : `[${s.tag}]`;
      return {
        tag,
        energy: /final chorus/i.test(tag) ? 9 : /chorus/i.test(tag) ? 8 : /bridge/i.test(tag) ? 6 : 4,
        lines: s.lines || [],
        cutIndices: []
      };
    });
    song.alternativeChorusLines = draftData.alternative_chorus_lines || [];
    song.sunoStylePrompts = draftData.suno_style_prompts || [];
    song.writerNotes = draftData.writer_notes || "Read it, cut what doesn't fit, keep what works.";
    song.status = "Suno Ready";
    song.updatedAt = new Date().toISOString();

    saveSongsToStorage();
    renderActiveSong();
    showToast(`Generated "${song.title}"! Ready to Create Audio.`, "🌸");
  } catch (err) {
    handleApiError(err, "Paste your GEMINI_API_KEY in Settings to generate live lyrics");
  } finally {
    btn.disabled = false;
    btnIcon.textContent = "✨";
    btnText.textContent = "Write Song Lyrics with Gemini";
  }
}

async function handleInspirationMediaUpload(file) {
  if (!file) return;
  const statusEl = document.getElementById("inspirationStatusText");
  statusEl.textContent = `⏳ Analyzing "${file.name}" with Gemini 3.8 Flash...`;

  try {
    const b64 = await fileToBase64(file);
    const mimeType = file.type || (file.name.endsWith(".mp3") ? "audio/mp3" : "image/jpeg");
    const mediaType = mimeType.startsWith("audio/") ? "audio" : "image";

    let extracted = null;
    if (state.serverAvailable && (state.serverHasEnvKey || state.apiKey)) {
      const res = await fetch("/api/multimodal-brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey: state.apiKey,
          mediaType,
          mimeType,
          dataBase64: b64
        })
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Multimodal extraction failed");
      extracted = json.brief;
    } else {
      const result = await callGeminiInteractionsDirect({
        model: "gemini-3.8-flash",
        systemInstruction: state.rolePrompt,
        input: [
          {
            type: "text",
            text: "Analyze this uploaded inspiration media for virtual wallflower (dreamy electronic / synth-pop artist from Ohio). Extract a song brief with theme, mood, genre, 3 title ideas, 1 opening or chorus line to include, and sensory notes."
          },
          {
            type: mediaType,
            data: b64,
            mime_type: mimeType
          }
        ],
        responseFormat: {
          type: "text",
          mime_type: "application/json",
          schema: MULTIMODAL_BRIEF_JSON_SCHEMA
        }
      });
      extracted = JSON.parse(result.text);
    }

    const song = getActiveSong();
    if (song && extracted) {
      song.brief.theme = extracted.theme || song.brief.theme;
      song.brief.mood = extracted.mood || song.brief.mood;
      song.brief.genre = extracted.genre || song.brief.genre;
      song.brief.titleIdea = extracted.title_idea || song.brief.titleIdea;
      song.brief.includeLine = extracted.include_line || song.brief.includeLine;
      song.writerNotes = `Inspiration Media Notes: ${extracted.sensory_notes || ""}`;
      saveSongsToStorage();
      renderActiveSong();
      statusEl.textContent = `✨ Extracted Brief from "${file.name}"!`;
      showToast("Populated Brief from your uploaded media!", "📸");
    }
  } catch (err) {
    statusEl.textContent = "Extract theme, mood & seed lines from an image or voice memo.";
    handleApiError(err, "Add GEMINI_API_KEY in Settings to analyze photos/voice memos");
  }
}

async function handleGenerateCoverArt() {
  const song = getActiveSong();
  if (!song) return;

  const btn = document.getElementById("generateCoverArtBtn");
  btn.textContent = "⏳ Painting...";
  btn.disabled = true;

  const prompt = `Indie dream-pop / synth-pop album single cover art for "${song.title}" by virtual wallflower. Mood: ${song.brief?.mood || "hopeful, nocturnal, warm"}. Theme: ${song.brief?.theme || "stepping out"}. Aesthetic: atmospheric midwestern night, soft analog grain, glowing amber porchlight and ultraviolet synth haze, minimal artistic photography, square album cover.`;

  try {
    let b64 = "";
    let mime = "image/png";

    if (state.serverAvailable && (state.serverHasEnvKey || state.apiKey)) {
      const res = await fetch("/api/generate-cover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey: state.apiKey, prompt })
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Cover art failed");
      b64 = json.image_base64;
      mime = json.mime_type || "image/png";
    } else {
      const result = await callGeminiInteractionsDirect({
        model: "gemini-nano-banana-2.1",
        input: prompt
      });
      if (!result.image?.data) throw new Error("No image returned from gemini-nano-banana-2.1");
      b64 = result.image.data;
      mime = result.image.mime_type || "image/png";
    }

    song.coverArtDataUrl = `data:${mime};base64,${b64}`;
    saveSongsToStorage();
    renderActiveSong();
    showToast(`Generated cover art with Nano Banana 2.1!`, "🎨");
  } catch (err) {
    handleApiError(err, "Add GEMINI_API_KEY in Settings to generate cover art with Nano Banana 2.1");
  } finally {
    btn.textContent = "🎨 Cover Art";
    btn.disabled = false;
  }
}

async function handleGenerateLyriaTrack() {
  const song = getActiveSong();
  if (!song) return;

  const lyriaModel = document.getElementById("lyriaModelSelect").value || "lyria-3-clip-preview";
  const mode = document.getElementById("lyriaModeSelect").value || "instrumental";
  const stylePrompt = (song.sunoStylePrompts && song.sunoStylePrompts[0]) || "dream pop, synth-pop, warm analog pads";
  const bpm = song.bpm || 108;
  const key = song.musicalKey || "F# Minor";

  const prompt = mode === "instrumental"
    ? `Create an instrumental ${stylePrompt} backing track in ${key} at ${bpm} BPM for "${song.title}". Pure instrumental arrangement with lush synth pads, bassline, and electronic drums.`
    : `Create a ${stylePrompt} song in ${key} at ${bpm} BPM with the following lyrics:\n\n${buildTimedLyriaStructurePrompt(song, true)}`;

  const btnText = document.getElementById("generateLyriaBtnText");
  const badge = document.getElementById("backingTrackStatusBadge");
  btnText.textContent = `Calling ${lyriaModel}...`;
  badge.textContent = "Generating...";

  try {
    const res = await callLyriaApiForArrayBuffer(lyriaModel, prompt);
    await loadBackingArrayBuffer(res.buffer, res.mimeType, `${song.title} (${lyriaModel} — ${mode})`);
    badge.textContent = `Loaded (${lyriaModel})`;
    showToast(`Generated ${lyriaModel} track into Channel 1!`, "🎵");
  } catch (err) {
    badge.textContent = "Ready";
    handleApiError(err, "Add GEMINI_API_KEY in Settings to call Lyria API (or click 🎹 Synthesize Full Multi-Section Arrangement!)");
  } finally {
    btnText.textContent = "Generate via Lyria API";
  }
}

async function handleGenerateTtsReadback(textToRead, targetLabel = "Full Song", silentSwitch = false) {
  if (!textToRead || !textToRead.trim()) return;
  const cleanText = textToRead.replace(/^\[.+\]$/gm, "").trim();
  const badge = document.getElementById("vocalStemStatusBadge");
  if (badge) badge.textContent = "Synthesizing TTS...";
  showToast(`Synthesizing vocal stem (${state.ttsVoice})...`, "🗣️");

  try {
    let audioB64 = "";
    let mimeType = "audio/wav";

    if (state.serverAvailable && (state.serverHasEnvKey || state.apiKey)) {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey: state.apiKey,
          text: cleanText,
          style: state.ttsStyle,
          voice: state.ttsVoice
        })
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "TTS failed");
      audioB64 = json.audio_base64;
      mimeType = json.mime_type || "audio/wav";
    } else {
      const result = await callGeminiInteractionsDirect({
        model: "gemini-3.8-flash-tts",
        input: [
          {
            type: "user_input",
            content: [
              {
                type: "text",
                text: cleanText,
                annotations: [
                  {
                    type: "speech_metadata",
                    style: state.ttsStyle
                  }
                ]
              }
            ]
          }
        ],
        responseFormat: { type: "audio" },
        generationConfig: {
          speech_config: [{ voice: state.ttsVoice }]
        }
      });
      if (!result.audio?.data) throw new Error("No audio returned from gemini-3.8-flash-tts");
      audioB64 = result.audio.data;
      mimeType = result.audio.mime_type || "audio/wav";
    }

    const arrayBuf = base64ToArrayBuffer(audioB64);
    await loadVocalArrayBuffer(arrayBuf, mimeType, `Gemini TTS (${state.ttsVoice}) — ${targetLabel}`);
    if (!silentSwitch) {
      switchCenterView("audio");
      const vocalPlayer = document.getElementById("vocalAudioPlayer");
      vocalPlayer.play().catch(() => {});
    }
    showToast(`Loaded "${targetLabel}" into Vocal Channel 2!`, "🎙️");
  } catch (err) {
    if (badge) badge.textContent = "No Vocal Loaded";
    handleApiError(err, "Add GEMINI_API_KEY in Settings to synthesize Gemini 3.8 TTS vocals");
  }
}

async function handleCreateReplicatedVoice() {
  const sourceFile = document.getElementById("repSourceAudioInput").files?.[0];
  const consentFile = document.getElementById("repConsentAudioInput").files?.[0];
  if (!sourceFile || !consentFile) {
    showToast("Please select both your reference voice clip and consent audio clip", "⚠️");
    return;
  }

  const btn = document.getElementById("createReplicatedVoiceBtn");
  btn.textContent = "⏳ Creating Replicated Voice...";
  btn.disabled = true;

  try {
    const [sourceB64, consentB64] = await Promise.all([
      fileToBase64(sourceFile),
      fileToBase64(consentFile)
    ]);

    let voiceId = "";
    if (state.serverAvailable && (state.serverHasEnvKey || state.apiKey)) {
      const res = await fetch("/api/replicate-voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey: state.apiKey,
          displayName: "April (virtual wallflower)",
          sourceAudioBase64: sourceB64,
          sourceMimeType: sourceFile.type || "audio/wav",
          consentAudioBase64: consentB64,
          consentMimeType: consentFile.type || "audio/wav"
        })
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Voice replication failed");
      voiceId = json.voice_id;
    } else {
      const key = (state.apiKey || "").trim();
      if (!key) throw new Error("MISSING_API_KEY");
      const res = await fetch("https://generativelanguage.googleapis.com/v1beta/voices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": key
        },
        body: JSON.stringify({
          store: true,
          voice: {
            model: "gemini-3.8-flash-tts",
            type: "replicated",
            display_name: "April (virtual wallflower)",
            replicated: {
              source_audio: {
                mime_type: sourceFile.type || "audio/wav",
                data: sourceB64
              },
              consent_audio: {
                mime_type: consentFile.type || "audio/wav",
                data: consentB64
              }
            }
          }
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error?.message || "Voice replication failed");
      voiceId = data.id || data.voice?.id;
    }

    if (voiceId) {
      state.ttsVoice = voiceId;
      localStorage.setItem("vw_tts_voice", voiceId);
      document.getElementById("ttsVoiceInput").value = voiceId;
      showToast(`Created Replicated Voice ID: ${voiceId}!`, "🧬");
    }
  } catch (err) {
    handleApiError(err, "Paste your GEMINI_API_KEY above first");
  } finally {
    btn.textContent = "🧬 Create My Replicated Voice ID";
    btn.disabled = false;
  }
}

async function handleRewriteSection(sectionIndex, instruction) {
  const song = getActiveSong();
  if (!song || !song.sections[sectionIndex]) return;
  const sec = song.sections[sectionIndex];
  const songContext = `Title: ${song.title}\n${buildBriefString(song.brief)}\n\nFull Song So Far:\n${formatSongForSuno(song)}`;

  showToast(`Rewriting ${sec.tag}...`, "⏳");

  try {
    let rewriteResult = null;
    if (state.serverAvailable && (state.serverHasEnvKey || state.apiKey)) {
      const res = await fetch("/api/rewrite-section", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey: state.apiKey,
          model: state.model,
          rolePrompt: state.rolePrompt,
          tag: sec.tag,
          lines: sec.lines,
          instruction,
          songContext
        })
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Rewrite failed");
      rewriteResult = json.result;
    } else {
      const prompt = [
        `CURRENT SONG CONTEXT & BRIEF:\n${songContext}`,
        `TARGET SECTION TO REWRITE: ${sec.tag}`,
        `CURRENT LINES:\n${sec.lines.join("\n")}`,
        `REWRITE DIRECTION FROM APRIL:\n${instruction}`,
        `Rewrite this section keeping virtual wallflower's honest, dreamy synth-pop voice and short singable lines.`
      ].join("\n\n");

      const result = await callGeminiInteractionsDirect({
        model: state.model,
        systemInstruction: state.rolePrompt,
        input: prompt,
        responseFormat: {
          type: "text",
          mime_type: "application/json",
          schema: SECTION_REWRITE_JSON_SCHEMA
        }
      });
      rewriteResult = JSON.parse(result.text);
    }

    if (rewriteResult && Array.isArray(rewriteResult.lines)) {
      sec.lines = rewriteResult.lines;
      sec.cutIndices = [];
      if (rewriteResult.note) {
        song.writerNotes = `${sec.tag} Rewrite: ${rewriteResult.note}`;
      }
      if (Array.isArray(rewriteResult.alternative_lines) && rewriteResult.alternative_lines.length) {
        song.alternativeChorusLines = [
          ...rewriteResult.alternative_lines,
          ...(song.alternativeChorusLines || [])
        ].slice(0, 5);
      }
      song.updatedAt = new Date().toISOString();
      saveSongsToStorage();
      renderActiveSong();
      showToast(`Updated ${sec.tag}!`, "✨");
    }
  } catch (err) {
    handleApiError(err, "Add your GEMINI_API_KEY in Settings first");
  }
}

async function handleSendChat(customMessage) {
  const inputEl = document.getElementById("chatInput");
  const message = (customMessage || inputEl.value || "").trim();
  if (!message) return;

  if (!customMessage) inputEl.value = "";
  state.chatHistory.push({ role: "user", text: message });
  renderChatMessages();

  const song = getActiveSong();
  const songContext = song
    ? `Active Song: ${song.title} (${song.bpm || 108} BPM, ${song.musicalKey || "F# Minor"})\nBrief:\n${buildBriefString(song.brief)}\n\nCurrent Lyrics:\n${formatSongForSuno(song)}`
    : "";

  try {
    let replyText = "";
    if (state.serverAvailable && (state.serverHasEnvKey || state.apiKey)) {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey: state.apiKey,
          model: state.model,
          rolePrompt: state.rolePrompt,
          message,
          songContext,
          previousInteractionId: state.previousInteractionId
        })
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Chat failed");
      replyText = json.reply;
      state.previousInteractionId = json.interaction_id;
    } else {
      const coWriterSystem = `${state.rolePrompt}\n\nYou are in interactive co-writing chat mode with April in the Virtual Wallflower Lyric Studio. Help brainstorm lines, metaphors, bridges, titles, near-rhymes, or Suno/Lyria style tags. Keep replies concise, warm, and ready to paste into the song.`;
      const userPrompt = state.previousInteractionId
        ? message
        : `CURRENT SONG STATE:\n${songContext}\n\nAPRIL'S REQUEST:\n${message}`;

      const result = await callGeminiInteractionsDirect({
        model: state.model,
        systemInstruction: coWriterSystem,
        input: userPrompt,
        previousInteractionId: state.previousInteractionId
      });
      replyText = result.text;
      state.previousInteractionId = result.id;
    }

    state.chatHistory.push({ role: "agent", text: replyText });
    renderChatMessages();
  } catch (err) {
    if (err.message === "MISSING_API_KEY") {
      state.chatHistory.push({
        role: "agent",
        text: "🔑 To chat live with Gemini, click **⚙️ API Key & Voice Clone** in the top bar and paste your `GEMINI_API_KEY`."
      });
      renderChatMessages();
      document.getElementById("settingsModal").classList.remove("hidden");
    } else {
      state.chatHistory.push({ role: "agent", text: `⚠️ ${err.message}` });
      renderChatMessages();
    }
  }
}

function handleApiError(err, missingKeyMsg) {
  if (err && err.message === "MISSING_API_KEY") {
    document.getElementById("settingsModal").classList.remove("hidden");
    showToast(missingKeyMsg || "Paste your GEMINI_API_KEY in Settings", "🔑");
  } else {
    showToast(err?.message || "Operation failed", "⚠️");
  }
}

// ============================================================================
// WEBAUDIO VOCAL OVERDUB DAW & MASTER BOUNCE TO CRATE
// ============================================================================
function getAudioContext() {
  if (!state.audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    state.audioCtx = new AudioContextClass();
  }
  if (state.audioCtx.state === "suspended") {
    state.audioCtx.resume();
  }
  return state.audioCtx;
}

async function loadBackingArrayBuffer(arrayBuffer, mimeType, label) {
  const ctx = getAudioContext();
  const copyBuf = arrayBuffer.slice(0);
  state.backingBuffer = await ctx.decodeAudioData(copyBuf);

  const blob = new Blob([arrayBuffer], { type: mimeType || "audio/wav" });
  const url = URL.createObjectURL(blob);
  const player = document.getElementById("backingAudioPlayer");
  player.src = url;
  document.getElementById("backingTrackTitleLabel").textContent = label || "Loaded Backing Track";
  document.getElementById("backingTrackStatusBadge").textContent = `${state.backingBuffer.duration.toFixed(1)}s Ready`;
}

async function loadVocalArrayBuffer(arrayBuffer, mimeType, label) {
  const ctx = getAudioContext();
  const copyBuf = arrayBuffer.slice(0);
  state.vocalBuffer = await ctx.decodeAudioData(copyBuf);

  const blob = new Blob([arrayBuffer], { type: mimeType || "audio/wav" });
  const url = URL.createObjectURL(blob);
  const player = document.getElementById("vocalAudioPlayer");
  player.src = url;
  document.getElementById("vocalTrackTitleLabel").textContent = label || "Loaded User Vocal Stem";
  document.getElementById("vocalStemStatusBadge").textContent = `${state.vocalBuffer.duration.toFixed(1)}s Vocal Loaded`;
}

async function synthesizeFullMultiSectionBackingForDaw() {
  const song = getActiveSong();
  const rendered = await synthesizeMultiSectionTrackBuffer({ song, variant: "A", includeVocalStem: false });
  const wavArrayBuf = audioBufferToWav(rendered);
  await loadBackingArrayBuffer(
    wavArrayBuf,
    "audio/wav",
    `${song?.title || "Song"} — Multi-Section Arrangement (${song?.bpm || 108} BPM)`
  );
  showToast("Synthesized full multi-section arrangement into Channel 1!", "🎹");
}

async function toggleRecordMicVocal() {
  const btn = document.getElementById("recordMicVocalBtn");
  const iconEl = document.getElementById("recordMicIcon");
  const textEl = document.getElementById("recordMicText");
  const backingPlayer = document.getElementById("backingAudioPlayer");

  if (state.isRecordingMic && state.mediaRecorder) {
    state.mediaRecorder.stop();
    backingPlayer.pause();
    state.isRecordingMic = false;
    iconEl.textContent = "🔴";
    textEl.textContent = "Record Live Mic Vocal";
    btn.classList.remove("bg-rose-600/30");
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    state.recordedChunks = [];
    const recorder = new MediaRecorder(stream);
    state.mediaRecorder = recorder;

    recorder.ondataavailable = e => {
      if (e.data && e.data.size > 0) state.recordedChunks.push(e.data);
    };

    recorder.onstop = async () => {
      stream.getTracks().forEach(t => t.stop());
      const blob = new Blob(state.recordedChunks, { type: recorder.mimeType || "audio/webm" });
      const arrayBuf = await blob.arrayBuffer();
      await loadVocalArrayBuffer(arrayBuf, blob.type, `Live Mic Vocal Take (${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })})`);
      showToast("Recorded and loaded your vocal take into Channel 2!", "🎙️");
    };

    recorder.start();
    state.isRecordingMic = true;
    iconEl.textContent = "⏹️";
    textEl.textContent = "Stop Recording Take";
    btn.classList.add("bg-rose-600/30");

    if (backingPlayer.src) {
      backingPlayer.currentTime = 0;
      backingPlayer.play().catch(() => {});
    }
    showToast("Recording microphone! Follow the Lyric Teleprompter above...", "🎙️");
  } catch (err) {
    showToast(`Microphone error: ${err.message}`, "⚠️");
  }
}

function createDreamPopImpulseResponse(ctx, duration = 2.4, decay = 2.2) {
  const rate = ctx.sampleRate;
  const length = Math.floor(rate * duration);
  const impulse = ctx.createBuffer(2, length, rate);
  for (let ch = 0; ch < 2; ch++) {
    const channelData = impulse.getChannelData(ch);
    for (let i = 0; i < length; i++) {
      channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
    }
  }
  return impulse;
}

function stopCombinedMix() {
  state.activeMixSources.forEach(s => {
    try { s.stop(); } catch (_) {}
  });
  state.activeMixSources = [];
}

function playCombinedMix() {
  stopCombinedMix();
  if (!state.backingBuffer && !state.vocalBuffer) {
    showToast("Load or generate a Backing Track or Vocal Stem first!", "⚠️");
    return;
  }

  const ctx = getAudioContext();
  const now = ctx.currentTime + 0.05;

  const backingVol = Number(document.getElementById("backingVolumeSlider").value) / 100;
  const vocalVol = Number(document.getElementById("vocalVolumeSlider").value) / 100;
  const vocalOffset = Number(document.getElementById("vocalOffsetSlider").value) || 0;
  const reverbWet = Number(document.getElementById("vocalReverbSlider").value) / 100;
  const delayWet = Number(document.getElementById("vocalDelaySlider").value) / 100;
  const useDoubler = document.getElementById("vocalDoublerCheckbox")?.checked;

  if (state.backingBuffer) {
    const backSrc = ctx.createBufferSource();
    backSrc.buffer = state.backingBuffer;
    const backGain = ctx.createGain();
    backGain.gain.value = backingVol;
    backSrc.connect(backGain);
    backGain.connect(ctx.destination);
    const backStart = vocalOffset < 0 ? now + Math.abs(vocalOffset) : now;
    backSrc.start(backStart);
    state.activeMixSources.push(backSrc);
  }

  if (state.vocalBuffer) {
    const vocSrc = ctx.createBufferSource();
    vocSrc.buffer = state.vocalBuffer;

    const vocGain = ctx.createGain();
    vocGain.gain.value = vocalVol;

    vocSrc.connect(vocGain);
    vocGain.connect(ctx.destination);

    // Stereo Dream-Pop Vocal Doubler
    if (useDoubler) {
      [0.014, 0.022].forEach((dSec, idx) => {
        const dNode = ctx.createDelay(0.1);
        dNode.delayTime.value = dSec;
        const panNode = ctx.createStereoPanner();
        panNode.pan.value = idx === 0 ? -0.65 : 0.65;
        const dGain = ctx.createGain();
        dGain.gain.value = vocalVol * 0.32;
        vocSrc.connect(dNode);
        dNode.connect(dGain);
        dGain.connect(panNode);
        panNode.connect(ctx.destination);
      });
    }

    if (reverbWet > 0) {
      const convolver = ctx.createConvolver();
      convolver.buffer = createDreamPopImpulseResponse(ctx, 2.5, 2.2);
      const revGain = ctx.createGain();
      revGain.gain.value = reverbWet * 0.65;
      vocGain.connect(convolver);
      convolver.connect(revGain);
      revGain.connect(ctx.destination);
    }

    if (delayWet > 0) {
      const delay = ctx.createDelay(1.0);
      delay.delayTime.value = 0.28;
      const feedback = ctx.createGain();
      feedback.gain.value = 0.32;
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 2200;
      const delGain = ctx.createGain();
      delGain.gain.value = delayWet * 0.5;

      vocGain.connect(delay);
      delay.connect(filter);
      filter.connect(feedback);
      feedback.connect(delay);
      filter.connect(delGain);
      delGain.connect(ctx.destination);
    }

    const vocStart = vocalOffset > 0 ? now + vocalOffset : now;
    vocSrc.start(vocStart);
    state.activeMixSources.push(vocSrc);
  }

  showToast("Auditioning Combined Studio Mix!", "▶️");
}

async function bounceCombinedMasterWav() {
  if (!state.backingBuffer && !state.vocalBuffer) {
    showToast("Generate/load a Backing Track or Vocal Stem before bouncing!", "⚠️");
    return;
  }

  const backingVol = Number(document.getElementById("backingVolumeSlider").value) / 100;
  const vocalVol = Number(document.getElementById("vocalVolumeSlider").value) / 100;
  const vocalOffset = Number(document.getElementById("vocalOffsetSlider").value) || 0;
  const reverbWet = Number(document.getElementById("vocalReverbSlider").value) / 100;
  const delayWet = Number(document.getElementById("vocalDelaySlider").value) / 100;
  const useDoubler = document.getElementById("vocalDoublerCheckbox")?.checked;

  const backDur = state.backingBuffer
    ? state.backingBuffer.duration + (vocalOffset < 0 ? Math.abs(vocalOffset) : 0)
    : 0;
  const vocDur = state.vocalBuffer
    ? state.vocalBuffer.duration + (vocalOffset > 0 ? vocalOffset : 0) + 2.0
    : 0;
  const totalDur = Math.max(backDur, vocDur, 2);

  const sampleRate = 44100;
  const offline = new OfflineAudioContext(2, Math.ceil(totalDur * sampleRate), sampleRate);

  if (state.backingBuffer) {
    const backSrc = offline.createBufferSource();
    backSrc.buffer = state.backingBuffer;
    const backGain = offline.createGain();
    backGain.gain.value = backingVol;
    backSrc.connect(backGain);
    backGain.connect(offline.destination);
    backSrc.start(vocalOffset < 0 ? Math.abs(vocalOffset) : 0);
  }

  if (state.vocalBuffer) {
    const vocSrc = offline.createBufferSource();
    vocSrc.buffer = state.vocalBuffer;
    const vocGain = offline.createGain();
    vocGain.gain.value = vocalVol;
    vocSrc.connect(vocGain);
    vocGain.connect(offline.destination);

    if (useDoubler) {
      [0.014, 0.022].forEach((dSec, idx) => {
        const dNode = offline.createDelay(0.1);
        dNode.delayTime.value = dSec;
        const panNode = offline.createStereoPanner();
        panNode.pan.value = idx === 0 ? -0.65 : 0.65;
        const dGain = offline.createGain();
        dGain.gain.value = vocalVol * 0.32;
        vocSrc.connect(dNode);
        dNode.connect(dGain);
        dGain.connect(panNode);
        panNode.connect(offline.destination);
      });
    }

    if (reverbWet > 0) {
      const convolver = offline.createConvolver();
      convolver.buffer = createDreamPopImpulseResponse(offline, 2.5, 2.2);
      const revGain = offline.createGain();
      revGain.gain.value = reverbWet * 0.65;
      vocGain.connect(convolver);
      convolver.connect(revGain);
      revGain.connect(offline.destination);
    }

    if (delayWet > 0) {
      const delay = offline.createDelay(1.0);
      delay.delayTime.value = 0.28;
      const delGain = offline.createGain();
      delGain.gain.value = delayWet * 0.45;
      vocGain.connect(delay);
      delay.connect(delGain);
      delGain.connect(offline.destination);
    }

    vocSrc.start(vocalOffset > 0 ? vocalOffset : 0);
  }

  showToast("Bouncing stereo master .WAV...", "⏳");
  const renderedBuffer = await offline.startRendering();
  const wavArrayBuffer = audioBufferToWav(renderedBuffer);
  const blob = new Blob([wavArrayBuffer], { type: "audio/wav" });
  const url = URL.createObjectURL(blob);

  const box = document.getElementById("masterMixdownPreviewBox");
  const masterPlayer = document.getElementById("masterMixAudioPlayer");
  box.classList.remove("hidden");
  masterPlayer.src = url;

  const song = getActiveSong();
  const newCrateItem = {
    id: "crate-master-" + Date.now(),
    songId: song?.id,
    title: `${song?.title || "Track"} (Vocal Overdub Master)`,
    badge: "Vocal Master Mix",
    style: "Custom Vocal Stem + Dream-Pop Doubler & Reverb",
    bpm: song?.bpm || 108,
    musicalKey: song?.musicalKey || "F# Minor",
    durationSec: Math.round(renderedBuffer.duration),
    audioUrl: url,
    arrayBuffer: wavArrayBuffer,
    coverArt: song?.coverArtDataUrl || "",
    liked: true,
    createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  };
  state.trackCrate.unshift(newCrateItem);
  renderTrackCrate();
  playCrateTrackInDeck(newCrateItem.id);

  const slug = (song?.title || "virtual-wallflower")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");
  const a = document.createElement("a");
  a.href = url;
  a.download = `${slug}-vocal-master.wav`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  showToast(`Bounced "${slug}-vocal-master.wav" & added to Track Crate!`, "💾");
}

function audioBufferToWav(buffer) {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const format = 1;
  const bitDepth = 16;
  const numSamples = buffer.length;
  const blockAlign = (numChannels * bitDepth) / 8;
  const byteRate = sampleRate * blockAlign;
  const dataSize = numSamples * blockAlign;

  const arrayBuffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(arrayBuffer);

  function writeStr(offset, str) {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  }

  writeStr(0, "RIFF");
  view.setUint32(4, 36 + dataSize, true);
  writeStr(8, "WAVE");
  writeStr(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, format, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitDepth, true);
  writeStr(36, "data");
  view.setUint32(40, dataSize, true);

  const channels = [];
  for (let ch = 0; ch < numChannels; ch++) {
    channels.push(buffer.getChannelData(ch));
  }

  let offset = 44;
  for (let i = 0; i < numSamples; i++) {
    for (let ch = 0; ch < numChannels; ch++) {
      const sample = Math.max(-1, Math.min(1, channels[ch][i]));
      view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
      offset += 2;
    }
  }
  return arrayBuffer;
}

// ============================================================================
// UI RENDERING (CARDS, ENERGY ARC, RHYME BADGES, COMPARE, EP PLANNER)
// ============================================================================
function renderSongList() {
  const container = document.getElementById("songListContainer");
  const badge = document.getElementById("songCountBadge");
  const filter = (document.getElementById("songSearchInput")?.value || "").toLowerCase();
  if (!container) return;

  badge.textContent = String(state.songs.length);
  const filtered = state.songs.filter(s =>
    s.title.toLowerCase().includes(filter) ||
    (s.brief?.theme || "").toLowerCase().includes(filter) ||
    (s.epName || "").toLowerCase().includes(filter)
  );

  container.innerHTML = "";
  filtered.forEach(song => {
    const isActive = song.id === state.activeSongId;
    const item = document.createElement("button");
    item.type = "button";
    item.className = `w-full text-left p-2.5 rounded-xl border transition flex items-center justify-between gap-2 ${
      isActive
        ? "bg-purple-600/20 border-purple-400/50 text-white"
        : "bg-[#0e0c16]/80 border-[#2a2440] text-gray-300 hover:bg-[#181526]"
    }`;

    const statusColors = {
      "Draft": "bg-gray-500/20 text-gray-300",
      "Polishing": "bg-amber-500/20 text-amber-200",
      "Suno Ready": "bg-purple-500/25 text-purple-200",
      "Recorded": "bg-pink-500/25 text-pink-200",
      "Finalized": "bg-emerald-500/25 text-emerald-200"
    };

    item.innerHTML = `
      <div class="truncate">
        <div class="text-xs font-semibold truncate">${escapeHtml(song.title || "Untitled")}</div>
        <div class="text-xs text-[#9e96b8] truncate">${escapeHtml(song.epName || "Single")} • ${song.bpm || 108} BPM</div>
      </div>
      <span class="text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${statusColors[song.status] || statusColors["Draft"]}">
        ${escapeHtml(song.status || "Draft")}
      </span>
    `;
    item.addEventListener("click", () => {
      state.activeSongId = song.id;
      renderSongList();
      renderActiveSong();
    });
    container.appendChild(item);
  });
}

function renderActiveSong() {
  const song = getActiveSong();
  if (!song) return;

  // Brief inputs
  document.getElementById("briefTheme").value = song.brief?.theme || "";
  document.getElementById("briefMood").value = song.brief?.mood || "";
  document.getElementById("briefGenre").value = song.brief?.genre || "";
  document.getElementById("briefArtist").value = song.brief?.artist || "virtual wallflower";
  document.getElementById("briefStructure").value = song.brief?.structure || "";
  document.getElementById("briefTitleIdea").value = song.brief?.titleIdea || "";
  document.getElementById("briefIncludeLine").value = song.brief?.includeLine || "";
  document.getElementById("briefAvoid").value = song.brief?.avoid || "";

  // Header metadata
  document.getElementById("songTitleInput").value = song.title || "";
  document.getElementById("songStatusSelect").value = song.status || "Draft";
  document.getElementById("songBpmInput").value = song.bpm || 108;
  document.getElementById("songKeyInput").value = song.musicalKey || "F# Minor";
  document.getElementById("songEpInput").value = song.epName || "Porchlight Static EP";
  document.getElementById("songSunoUrlInput").value = song.sunoUrl || "";
  document.getElementById("writerNotesText").textContent =
    song.writerNotes || "Read it, cut what doesn't fit, keep what works.";

  const snapCount = (song.snapshots || []).length;
  document.getElementById("snapshotCountBadge").textContent = `${snapCount} snapshot${snapCount === 1 ? "" : "s"}`;

  // Sync Suno Custom Mode Box & Teleprompter
  const styleInput = document.getElementById("sunoStyleInput");
  if (styleInput && (!styleInput.value || styleInput.dataset.songId !== song.id)) {
    styleInput.value = (song.sunoStylePrompts && song.sunoStylePrompts[0]) || "dream pop, atmospheric synth-pop, warm analog Juno pads";
    styleInput.dataset.songId = song.id;
  }
  const timedToggle = document.getElementById("sunoTimedStructureToggle")?.checked;
  const sunoLyricsBox = document.getElementById("sunoLyricsPreviewBox");
  if (sunoLyricsBox) {
    sunoLyricsBox.value = buildTimedLyriaStructurePrompt(song, timedToggle);
  }
  const teleprompter = document.getElementById("vocalTeleprompterBox");
  if (teleprompter) {
    teleprompter.textContent = formatSongForSuno(song);
  }

  // Cover Art Preview
  const imgEl = document.getElementById("coverArtImg");
  const placeholderEl = document.getElementById("coverArtPlaceholder");
  if (song.coverArtDataUrl) {
    imgEl.src = song.coverArtDataUrl;
    imgEl.classList.remove("hidden");
    placeholderEl.classList.add("hidden");
  } else {
    imgEl.classList.add("hidden");
    placeholderEl.classList.remove("hidden");
  }

  // Alternative Titles
  const altTitlesEl = document.getElementById("altTitlesContainer");
  altTitlesEl.innerHTML = "";
  (song.alternativeTitles || []).forEach((altTitle, idx) => {
    const pill = document.createElement("button");
    pill.type = "button";
    pill.className = "pill-btn";
    pill.title = "Click to swap with active title";
    pill.innerHTML = `<span>⇄ ${escapeHtml(altTitle)}</span>`;
    pill.addEventListener("click", () => {
      const oldMain = song.title;
      song.title = altTitle;
      song.alternativeTitles[idx] = oldMain;
      saveSongsToStorage();
      renderActiveSong();
      showToast(`Swapped title to "${altTitle}"`, "🏷️");
    });
    altTitlesEl.appendChild(pill);
  });

  renderEnergyArcSvg();
  renderSectionCards(song);
  document.getElementById("rawSunoTextarea").value = formatSongForSuno(song);
  renderAltChorusLines(song);
  renderSunoStylePrompts(song);
  renderCompareView(song);
  renderEpPlannerView();
  renderSingabilityDiagnostics();
}

function renderEnergyArcSvg() {
  const song = getActiveSong();
  const container = document.getElementById("energyArcSvgContainer");
  if (!song || !container) return;

  const sections = song.sections || [];
  if (!sections.length) {
    container.innerHTML = `<span class="text-xs text-[#9e96b8]">Add sections to see dynamic arc</span>`;
    return;
  }

  const width = 620;
  const height = 64;
  const padX = 36;
  const padY = 12;
  const usableW = width - padX * 2;
  const usableH = height - padY * 2;

  const points = sections.map((sec, idx) => {
    const x = sections.length === 1 ? width / 2 : padX + (idx / (sections.length - 1)) * usableW;
    const e = Math.max(1, Math.min(10, Number(sec.energy) || 5));
    const y = padY + usableH - ((e - 1) / 9) * usableH;
    return { x, y, tag: sec.tag.replace(/[\[\]]/g, ""), e };
  });

  const polyPoints = points.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const areaPoints = `${points[0].x.toFixed(1)},${height - 4} ${polyPoints} ${points[points.length - 1].x.toFixed(1)},${height - 4}`;

  const circlesAndLabels = points
    .map(
      p => `
      <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="4" fill="#f472b6" stroke="#09080f" stroke-width="1.5" />
      <text x="${p.x.toFixed(1)}" y="${height - 1}" text-anchor="middle" fill="#9e96b8" font-size="9" font-family="monospace">${escapeHtml(p.tag.slice(0, 10))} (${p.e})</text>
    `
    )
    .join("");

  container.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" class="w-full h-full overflow-visible">
      <defs>
        <linearGradient id="energyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#a78bfa" stop-opacity="0.45"/>
          <stop offset="100%" stop-color="#a78bfa" stop-opacity="0.0"/>
        </linearGradient>
      </defs>
      <polygon points="${areaPoints}" fill="url(#energyGrad)" />
      <polyline fill="none" stroke="#a78bfa" stroke-width="2.2" points="${polyPoints}" />
      ${circlesAndLabels}
    </svg>
  `;
}

function renderSectionCards(song) {
  const container = document.getElementById("sectionsCardsView");
  if (!container) return;
  container.innerHTML = "";

  const rhymeColors = {
    A: "bg-purple-500/20 text-purple-200 border-purple-400/40",
    B: "bg-pink-500/20 text-pink-200 border-pink-400/40",
    C: "bg-emerald-500/20 text-emerald-200 border-emerald-400/40",
    D: "bg-amber-500/20 text-amber-200 border-amber-400/40",
    E: "bg-sky-500/20 text-sky-200 border-sky-400/40",
    F: "bg-rose-500/20 text-rose-200 border-rose-400/40"
  };

  song.sections.forEach((sec, secIdx) => {
    const card = document.createElement("div");
    card.className = "section-card p-4 flex flex-col gap-2.5";

    const isChorus = /chorus/i.test(sec.tag);
    const tagBadgeColor = isChorus
      ? "bg-pink-500/20 text-pink-200 border-pink-400/40"
      : /bridge/i.test(sec.tag)
      ? "bg-amber-500/20 text-amber-200 border-amber-400/40"
      : "bg-purple-500/20 text-purple-200 border-purple-400/40";

    const rhymeLetters = computeSectionRhymeLetters(sec.lines);

    const header = document.createElement("div");
    header.className = "flex flex-wrap items-center justify-between gap-2 border-b border-[#2a2440] pb-2";
    header.innerHTML = `
      <div class="flex items-center gap-2 flex-wrap">
        <input type="text" value="${escapeHtml(sec.tag)}" data-sec-tag="${secIdx}" class="px-2.5 py-1 rounded-lg border text-xs font-bold mono ${tagBadgeColor} bg-transparent focus:outline-none w-36" />
        <label class="flex items-center gap-1 text-xs text-[#9e96b8]" title="Dynamic energy level (1–10)">
          <span>⚡</span>
          <input type="range" min="1" max="10" value="${sec.energy || 5}" data-sec-energy="${secIdx}" class="w-16 accent-purple-400" />
          <span class="mono text-white">${sec.energy || 5}</span>
        </label>
      </div>
      <div class="flex items-center gap-1">
        <button type="button" data-sec-tts="${secIdx}" class="px-2 py-1 rounded bg-pink-500/15 hover:bg-pink-500/30 border border-pink-400/30 text-xs text-pink-200" title="Hear spoken vocal cadence with Gemini 3.8 TTS">🔊 Read</button>
        <button type="button" data-sec-up="${secIdx}" class="px-2 py-1 rounded bg-[#0e0c16] hover:bg-purple-500/20 text-xs text-[#9e96b8] hover:text-white" title="Move section up">↑</button>
        <button type="button" data-sec-down="${secIdx}" class="px-2 py-1 rounded bg-[#0e0c16] hover:bg-purple-500/20 text-xs text-[#9e96b8] hover:text-white" title="Move section down">↓</button>
        <button type="button" data-sec-add-line="${secIdx}" class="px-2 py-1 rounded bg-[#0e0c16] hover:bg-purple-500/20 text-xs text-purple-200" title="Add line">+ Line</button>
        <button type="button" data-sec-del="${secIdx}" class="px-2 py-1 rounded bg-[#0e0c16] hover:bg-rose-500/20 text-xs text-[#9e96b8] hover:text-rose-200" title="Delete section">✕</button>
      </div>
    `;
    card.appendChild(header);

    const linesWrap = document.createElement("div");
    linesWrap.className = "flex flex-col gap-1.5";

    sec.lines.forEach((lineText, lineIdx) => {
      const isCut = (sec.cutIndices || []).includes(lineIdx);
      const isMetatag = /^\[.+\]$/.test((lineText || "").trim());
      const syll = countLineSyllables(lineText);
      const lastWord = getLastWord(lineText);
      const rhymeLetter = rhymeLetters[lineIdx];
      const hasCliche = AI_CLICHE_PHRASES.find(p => (lineText || "").toLowerCase().includes(p));

      let syllBadgeClass = "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";
      if (syll > 12) syllBadgeClass = "bg-rose-500/20 text-rose-300 border-rose-500/30";
      else if (syll >= 10) syllBadgeClass = "bg-amber-500/20 text-amber-200 border-amber-500/30";

      const row = document.createElement("div");
      row.className = "flex items-center gap-1.5 group";
      row.innerHTML = `
        <button type="button" data-cut-toggle="${secIdx}:${lineIdx}" class="px-1.5 py-1 rounded text-xs ${
          isCut ? "bg-rose-500/30 text-rose-200" : "text-[#6b6385] hover:text-rose-300"
        }" title="Keep / Cut toggle">
          ✂️
        </button>
        <input type="text" value="${escapeHtml(lineText)}" data-line-input="${secIdx}:${lineIdx}" class="lyric-line-input flex-1 ${
          isCut ? "lyric-line-cut" : ""
        } ${isMetatag ? "text-pink-300 mono text-xs font-semibold" : ""}" placeholder="Write a short, singable line..." />
        ${
          hasCliche
            ? `<span class="px-1.5 py-0.5 rounded bg-amber-500/25 border border-amber-400/40 text-amber-200 text-xs" title="Cliché alert: '${escapeHtml(hasCliche)}'">⚠️ cliché</span>`
            : ""
        }
        ${
          rhymeLetter
            ? `<span class="px-1.5 py-0.5 rounded border text-xs font-bold mono ${rhymeColors[rhymeLetter] || rhymeColors.A}" title="Rhyme scheme group ${rhymeLetter}">${rhymeLetter}</span>`
            : ""
        }
        ${
          !isMetatag
            ? `<button type="button" data-rhyme-word="${escapeHtml(lastWord)}" class="px-2 py-0.5 rounded text-xs text-[#9e96b8] hover:text-pink-200 hover:bg-pink-500/15 border border-transparent hover:border-pink-400/30 transition mono" title="Find rhymes & near-rhymes for '${escapeHtml(lastWord)}'">
                ${lastWord ? `♪ ${escapeHtml(lastWord)}` : "♪"}
              </button>
              <span class="px-2 py-0.5 rounded-full border text-xs mono ${syllBadgeClass}" title="${syll} syllables">
                ${syll}s
              </span>`
            : `<span class="text-xs text-pink-300/70 mono px-2">TAG</span>`
        }
        <button type="button" data-del-line="${secIdx}:${lineIdx}" class="opacity-0 group-hover:opacity-100 px-1.5 py-0.5 text-xs text-[#6b6385] hover:text-rose-300 transition" title="Delete line">
          ✕
        </button>
      `;
      linesWrap.appendChild(row);
    });

    card.appendChild(linesWrap);

    const aiBar = document.createElement("div");
    aiBar.className = "flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#2a2440]/60 text-xs";
    aiBar.innerHTML = `
      <div class="flex flex-wrap items-center gap-1">
        <span class="text-[#9e96b8] mr-1">AI Rewrite:</span>
        <button type="button" data-sec-ai="${secIdx}" data-ai-prompt="Tighten syllable counts so every line is 6 to 9 syllables and easy to sing." class="pill-btn">Tighten syllables</button>
        <button type="button" data-sec-ai="${secIdx}" data-ai-prompt="Make the imagery a little darker and more atmospheric while keeping the warm emotional centre." class="pill-btn">Darker & warm</button>
        <button type="button" data-sec-ai="${secIdx}" data-ai-prompt="Replace any predictable phrases with concrete midwestern nocturnal sensory details." class="pill-btn">More sensory</button>
      </div>
      <button type="button" data-sec-custom-ai="${secIdx}" class="text-xs text-purple-300 hover:text-purple-100 underline">
        Custom prompt...
      </button>
    `;
    card.appendChild(aiBar);
    container.appendChild(card);
  });
}

function renderCompareView(song) {
  const select = document.getElementById("snapshotSelect");
  const snapPre = document.getElementById("compareSnapshotText");
  const currPre = document.getElementById("compareCurrentText");
  if (!select || !snapPre || !currPre || !song) return;

  currPre.textContent = formatSongForSuno(song);
  const snaps = song.snapshots || [];
  select.innerHTML = "";

  if (!snaps.length) {
    const opt = document.createElement("option");
    opt.value = "";
    opt.textContent = "No snapshots saved yet (click 📸 Snapshot above)";
    select.appendChild(opt);
    snapPre.textContent = "Click '📸 Snapshot' in the song header anytime to save a checkpoint before experimenting.";
    return;
  }

  snaps.forEach((s, idx) => {
    const opt = document.createElement("option");
    opt.value = String(idx);
    opt.textContent = s.label || `Snapshot #${idx + 1}`;
    select.appendChild(opt);
  });

  snapPre.textContent = snaps[0].lyricsText || "";
}

function renderEpPlannerView() {
  const container = document.getElementById("epPlannerContainer");
  if (!container) return;
  container.innerHTML = "";

  const groups = {};
  state.songs.forEach(s => {
    const ep = (s.epName || "Standalone Singles").trim();
    if (!groups[ep]) groups[ep] = [];
    groups[ep].push(s);
  });

  Object.entries(groups).forEach(([epTitle, tracks]) => {
    const box = document.createElement("div");
    box.className = "p-3.5 rounded-xl bg-[#0e0c16] border border-[#2a2440] flex flex-col gap-2.5";

    const rowsHtml = tracks
      .map(
        (t, i) => `
        <div class="flex flex-wrap items-center justify-between gap-2 p-2 rounded-lg bg-[#12101c] border border-[#2a2440]">
          <div class="flex items-center gap-2.5">
            <span class="text-xs font-bold text-purple-300 mono w-5">${i + 1}.</span>
            <div>
              <div class="text-xs font-semibold text-white">${escapeHtml(t.title)}</div>
              <div class="text-xs text-[#9e96b8]">${escapeHtml(t.brief?.mood || "")}</div>
            </div>
          </div>
          <div class="flex items-center gap-2 text-xs mono">
            <span class="px-2 py-0.5 rounded bg-purple-500/15 text-purple-200">${t.bpm || 108} BPM</span>
            <span class="px-2 py-0.5 rounded bg-pink-500/15 text-pink-200">${escapeHtml(t.musicalKey || "F# Minor")}</span>
            <span class="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-200">${escapeHtml(t.status || "Draft")}</span>
          </div>
        </div>
      `
      )
      .join("");

    box.innerHTML = `
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold uppercase tracking-wider text-purple-200">💿 ${escapeHtml(epTitle)}</span>
        <span class="text-xs text-[#9e96b8] mono">${tracks.length} track(s)</span>
      </div>
      <div class="flex flex-col gap-1.5">${rowsHtml}</div>
    `;
    container.appendChild(box);
  });
}

function renderAltChorusLines(song) {
  const container = document.getElementById("altChorusContainer");
  if (!container) return;
  container.innerHTML = "";

  (song.alternativeChorusLines || []).forEach((line, idx) => {
    const row = document.createElement("div");
    row.className = "flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-[#0e0c16] border border-[#2a2440]";
    row.innerHTML = `
      <input type="text" value="${escapeHtml(line)}" data-alt-chorus-input="${idx}" class="flex-1 bg-transparent text-xs text-pink-100 focus:outline-none" />
      <div class="flex items-center gap-1.5">
        <button type="button" data-swap-chorus="${idx}" class="px-2.5 py-1 rounded-lg bg-pink-500/20 hover:bg-pink-500/35 border border-pink-400/40 text-xs font-medium text-pink-100 transition">
          ⇄ Swap Last Chorus Line
        </button>
        <button type="button" data-copy-text="${escapeHtml(line)}" class="px-2 py-1 rounded-lg bg-[#181526] hover:bg-purple-500/20 border border-[#2a2440] text-xs text-[#9e96b8] hover:text-white">
          Copy
        </button>
      </div>
    `;
    container.appendChild(row);
  });
}

function renderSunoStylePrompts(song) {
  const container = document.getElementById("sunoPromptsContainer");
  if (!container) return;
  container.innerHTML = "";

  (song.sunoStylePrompts || []).forEach((promptText, idx) => {
    const card = document.createElement("div");
    card.className = "p-3 rounded-xl bg-[#0e0c16] border border-[#2a2440] flex items-start justify-between gap-3";
    card.innerHTML = `
      <div class="flex-1">
        <div class="text-xs font-semibold text-amber-300 mb-1">Style Option #${idx + 1}</div>
        <textarea rows="2" data-suno-prompt-input="${idx}" class="w-full bg-transparent text-xs text-gray-200 mono focus:outline-none resize-none">${escapeHtml(promptText)}</textarea>
      </div>
      <div class="flex flex-col gap-1">
        <button type="button" data-use-style="${escapeHtml(promptText)}" class="px-2.5 py-1 rounded-lg bg-pink-500/20 hover:bg-pink-500/35 border border-pink-400/40 text-xs font-semibold text-pink-100 whitespace-nowrap transition">
          🔥 Use in Create
        </button>
        <button type="button" data-copy-text="${escapeHtml(promptText)}" class="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/35 border border-amber-400/40 text-xs font-semibold text-amber-100 whitespace-nowrap transition">
          📋 Copy
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderSingabilityDiagnostics() {
  const song = getActiveSong();
  if (!song) return;

  let totalLines = 0;
  let totalSyllables = 0;
  let longLines = 0;
  let cutLinesCount = 0;

  song.sections.forEach(sec => {
    cutLinesCount += (sec.cutIndices || []).length;
    sec.lines.forEach((line, idx) => {
      if ((sec.cutIndices || []).includes(idx)) return;
      if (!line.trim() || /^\[.+\]$/.test(line.trim())) return;
      totalLines++;
      const s = countLineSyllables(line);
      totalSyllables += s;
      if (s > 11) longLines++;
    });
  });

  const avgSyll = totalLines ? (totalSyllables / totalLines).toFixed(1) : "0.0";
  const statsEl = document.getElementById("statsSummary");
  if (statsEl) {
    statsEl.textContent = `${song.sections.length} sec • ${totalLines} lines • ${avgSyll} syll/line`;
  }

  const diagEl = document.getElementById("singabilityDiagnostics");
  if (diagEl) {
    diagEl.innerHTML = `
      <div class="flex justify-between"><span>Active Lyric Lines:</span><span class="text-white font-semibold mono">${totalLines}</span></div>
      <div class="flex justify-between"><span>Avg Syllables / Line:</span><span class="text-emerald-300 font-semibold mono">${avgSyll} (Target: 6–10)</span></div>
      <div class="flex justify-between"><span>Lines Over 11 Syllables:</span><span class="${longLines > 0 ? "text-amber-300" : "text-emerald-300"} font-semibold mono">${longLines}</span></div>
      <div class="flex justify-between"><span>Lines Marked 'Cut' (✂️):</span><span class="text-rose-300 font-semibold mono">${cutLinesCount}</span></div>
    `;
  }

  const cliches = findClichesInSong(song);
  const clicheBadge = document.getElementById("clicheCountBadge");
  const clicheList = document.getElementById("clicheListContainer");
  if (clicheBadge && clicheList) {
    clicheBadge.textContent = `${cliches.length} found`;
    clicheBadge.className = `text-xs mono ${cliches.length > 0 ? "text-amber-300" : "text-emerald-300"}`;
    if (!cliches.length) {
      clicheList.innerHTML = `<span class="text-emerald-300/90">✨ Clean! Zero overused AI clichés detected.</span>`;
    } else {
      clicheList.innerHTML = cliches
        .map(
          c => `
          <div class="p-2 rounded bg-[#12101c] border border-amber-500/30 flex items-center justify-between gap-2">
            <span class="truncate"><strong>${escapeHtml(c.tag)}</strong>: "${escapeHtml(c.phrase)}"</span>
            <button type="button" data-fix-cliche="${c.secIdx}" class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-200 text-xs whitespace-nowrap">✨ Fix</button>
          </div>
        `
        )
        .join("");
    }
  }
}

function renderChatMessages() {
  const container = document.getElementById("chatMessagesContainer");
  if (!container) return;
  container.innerHTML = "";

  state.chatHistory.forEach(msg => {
    const bubble = document.createElement("div");
    if (msg.role === "user") {
      bubble.className = "self-end max-w-[88%] rounded-xl px-3 py-2 bg-purple-600/30 border border-purple-400/40 text-xs text-white";
    } else {
      bubble.className = "self-start max-w-[92%] rounded-xl px-3 py-2.5 bg-[#0e0c16] border border-[#2a2440] text-xs text-gray-200 leading-relaxed whitespace-pre-wrap";
    }
    bubble.textContent = msg.text;
    container.appendChild(bubble);
  });
  container.scrollTop = container.scrollHeight;
}

// ============================================================================
// RHYME & NEAR-RHYME FINDER
// ============================================================================
async function lookupRhymes(rawWord) {
  const word = (rawWord || "").trim().toLowerCase().replace(/[^a-z]/g, "");
  if (!word) return;

  document.getElementById("rhymeSearchInput").value = word;
  const nearEl = document.getElementById("nearRhymesList");
  const exactEl = document.getElementById("exactRhymesList");

  nearEl.textContent = "Searching rhymes...";
  exactEl.textContent = "Searching...";

  const localEntry = BUILTIN_NEAR_RHYMES[word];
  let exactList = localEntry ? [...localEntry.exact] : [];
  let nearList = localEntry ? [...localEntry.near] : [];

  try {
    const [rhymeRes, nearRes] = await Promise.all([
      fetch(`https://api.datamuse.com/words?rel_rhy=${encodeURIComponent(word)}&max=14`),
      fetch(`https://api.datamuse.com/words?rel_nry=${encodeURIComponent(word)}&max=18`)
    ]);
    if (rhymeRes.ok) {
      const rData = await rhymeRes.json();
      exactList = [...new Set([...exactList, ...rData.map(x => x.word)])].slice(0, 16);
    }
    if (nearRes.ok) {
      const nData = await nearRes.json();
      nearList = [...new Set([...nearList, ...nData.map(x => x.word)])].slice(0, 20);
    }
  } catch (_) {
    if (!nearList.length) {
      const tail = word.slice(-2);
      nearList = SENSORY_PALETTE.filter(w => w.endsWith(tail) || w.includes(tail[0] || "a"));
    }
  }

  renderRhymePills(nearEl, nearList.length ? nearList : ["static", "amber", "velvet", "quiet", "honest", "open"]);
  renderRhymePills(exactEl, exactList.length ? exactList : ["Use Near-Rhymes above or ask Co-Writer Chat"]);
}

function renderRhymePills(container, words) {
  container.innerHTML = "";
  words.forEach(w => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "pill-btn";
    btn.textContent = w;
    btn.addEventListener("click", () => {
      navigator.clipboard?.writeText(w);
      showToast(`Copied "${w}"`, "🎵");
    });
    container.appendChild(btn);
  });
}

function renderSensoryPalette() {
  const container = document.getElementById("sensoryPaletteContainer");
  if (!container) return;
  container.innerHTML = "";
  SENSORY_PALETTE.forEach(word => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "pill-btn";
    btn.textContent = word;
    btn.addEventListener("click", () => {
      navigator.clipboard?.writeText(word);
      lookupRhymes(word);
      showToast(`Copied "${word}" & loaded rhymes`, "🌸");
    });
    container.appendChild(btn);
  });
}

// ============================================================================
// EXPORT & SUNO CLIPBOARD HELPERS
// ============================================================================
function exportCurrentSong(format) {
  const song = getActiveSong();
  if (!song) return;

  const safeSlug = (song.title || "virtual-wallflower-song")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const sunoLyrics = formatSongForSuno(song);

  if (format === "txt") {
    const content = [
      `TITLE: ${song.title}`,
      `ALT TITLES: ${(song.alternativeTitles || []).join(" / ")}`,
      `ARTIST: ${song.brief?.artist || "virtual wallflower"}`,
      `BPM: ${song.bpm || 108} | KEY: ${song.musicalKey || "F# Minor"} | EP: ${song.epName || "Single"}`,
      `\n--- LYRICS ---\n`,
      sunoLyrics,
      `\n--- ALTERNATIVE CHORUS LINES ---`,
      ...(song.alternativeChorusLines || []).map((l, i) => `${i + 1}. ${l}`),
      `\n--- STYLE PROMPTS ---`,
      ...(song.sunoStylePrompts || []).map((p, i) => `${i + 1}. ${p}`)
    ].join("\n");
    downloadBlob(content, `${safeSlug}.txt`, "text/plain;charset=utf-8");
    showToast(`Exported ${safeSlug}.txt`, "⬇️");
  } else if (format === "md") {
    const content = [
      `# ${song.title}`,
      `**Artist:** ${song.brief?.artist || "virtual wallflower"} | **BPM:** ${song.bpm || 108} | **Key:** ${song.musicalKey || "F# Minor"} | **EP:** ${song.epName || "Single"}  `,
      `**Alternative Titles:** ${(song.alternativeTitles || []).join(" • ")}`,
      `\n## Brief`,
      "```text\n" + buildBriefString(song.brief) + "\n```",
      `\n## Lyrics`,
      "```text\n" + sunoLyrics + "\n```",
      `\n## Alternative Chorus Lines to Swap In`,
      ...(song.alternativeChorusLines || []).map(l => `- ${l}`),
      `\n## Style-Prompt Suggestions`,
      ...(song.sunoStylePrompts || []).map(p => `- \`${p}\``)
    ].join("\n");
    downloadBlob(content, `${safeSlug}.md`, "text/markdown;charset=utf-8");
    showToast(`Exported ${safeSlug}.md`, "⬇️");
  } else if (format === "ep-md") {
    const booklet = state.songs
      .map(
        (s, idx) =>
          `# Track ${idx + 1}: ${s.title}\n**EP:** ${s.epName || "Single"} | **BPM:** ${s.bpm || 108} | **Key:** ${s.musicalKey || "F# Minor"}\n\n\`\`\`text\n${formatSongForSuno(s)}\n\`\`\`\n\n**Style:** \`${(s.sunoStylePrompts || [])[0] || ""}\`\n`
      )
      .join("\n---\n\n");
    downloadBlob(booklet, `virtual-wallflower-ep-booklet.md`, "text/markdown;charset=utf-8");
    showToast("Exported full EP Booklet (.md)!", "💿");
  } else if (format === "json") {
    const content = JSON.stringify(state.songs, null, 2);
    downloadBlob(content, `virtual-wallflower-library.json`, "application/json;charset=utf-8");
    showToast("Exported full song library JSON", "💾");
  } else if (format === "print") {
    document.getElementById("printTitle").textContent = song.title;
    document.getElementById("printSubtitle").textContent = `${song.brief?.artist || "virtual wallflower"} • ${song.bpm || 108} BPM • ${song.musicalKey || "F# Minor"}`;
    document.getElementById("printLyrics").textContent = sunoLyrics;
    document.getElementById("printExtras").textContent =
      `Alternative Chorus Lines:\n- ${(song.alternativeChorusLines || []).join("\n- ")}\n\nStyle Prompts:\n- ${(song.sunoStylePrompts || []).join("\n- ")}`;
    window.print();
  }
}

function downloadBlob(text, filename, mimeType) {
  const blob = new Blob([text], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function syncBriefInputsToSong() {
  const song = getActiveSong();
  if (!song) return;
  song.brief = {
    theme: document.getElementById("briefTheme").value,
    mood: document.getElementById("briefMood").value,
    genre: document.getElementById("briefGenre").value,
    artist: document.getElementById("briefArtist").value,
    structure: document.getElementById("briefStructure").value,
    titleIdea: document.getElementById("briefTitleIdea").value,
    includeLine: document.getElementById("briefIncludeLine").value,
    avoid: document.getElementById("briefAvoid").value
  };
  saveSongsToStorage();
}

function escapeHtml(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function switchCenterView(viewName) {
  state.centerView = viewName;
  const views = {
    suno: document.getElementById("centerViewSuno"),
    cards: document.getElementById("centerViewCards"),
    audio: document.getElementById("centerViewAudio"),
    hum: document.getElementById("centerViewHum"),
    video: document.getElementById("centerViewVideo"),
    raw: document.getElementById("centerViewRaw"),
    compare: document.getElementById("centerViewCompare"),
    ep: document.getElementById("centerViewEp")
  };
  Object.entries(views).forEach(([k, el]) => {
    if (!el) return;
    if (k === viewName) el.classList.remove("hidden");
    else el.classList.add("hidden");
  });

  document.querySelectorAll("[data-center-view]").forEach(btn => {
    if (btn.getAttribute("data-center-view") === viewName) {
      btn.className = "center-view-btn px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-purple-600/40 to-pink-600/40 text-white border border-pink-400/50 transition";
    } else {
      btn.className = "center-view-btn px-3 py-1.5 rounded-lg text-xs font-semibold text-[#9e96b8] hover:text-white transition";
    }
  });

  const song = getActiveSong();
  if (viewName === "raw" && song) {
    document.getElementById("rawSunoTextarea").value = formatSongForSuno(song);
  } else if (viewName === "compare" && song) {
    renderCompareView(song);
  } else if (viewName === "ep") {
    renderEpPlannerView();
  } else if (viewName === "hum") {
    renderHumStudio();
  } else if (viewName === "video") {
    initLyricVideoStage();
  }
}

function switchRightTab(tabName) {
  const tabs = {
    chat: document.getElementById("rightTabChat"),
    rhyme: document.getElementById("rightTabRhyme"),
    finalize: document.getElementById("rightTabFinalize")
  };
  Object.entries(tabs).forEach(([key, el]) => {
    if (key === tabName) el.classList.remove("hidden");
    else el.classList.add("hidden");
  });

  document.querySelectorAll("[data-right-tab]").forEach(btn => {
    if (btn.getAttribute("data-right-tab") === tabName) {
      btn.className = "right-tab-btn py-2 px-2 rounded-lg text-xs font-semibold bg-purple-600/30 text-white border border-purple-400/40 transition";
    } else {
      btn.className = "right-tab-btn py-2 px-2 rounded-lg text-xs font-semibold text-[#9e96b8] hover:text-white transition";
    }
  });
}

// ============================================================================
// EVENT LISTENERS & INITIALIZATION
// ============================================================================
function attachEventListeners() {
  const modelSelect = document.getElementById("modelSelect");
  modelSelect.value = state.model;
  modelSelect.addEventListener("change", () => {
    state.model = modelSelect.value;
    localStorage.setItem("vw_model", state.model);
    showToast(`Switched model to ${state.model}`, "🤖");
  });

  document.getElementById("copySunoLyricsBtn").addEventListener("click", () => {
    const song = getActiveSong();
    const formatted = formatSongForSuno(song);
    navigator.clipboard?.writeText(formatted);
    showToast("Copied lyrics to clipboard!", "📋");
  });

  document.querySelectorAll("[data-export]").forEach(btn => {
    btn.addEventListener("click", () => {
      exportCurrentSong(btn.getAttribute("data-export"));
    });
  });

  // Settings Modal
  document.getElementById("openSettingsBtn").addEventListener("click", () => {
    document.getElementById("apiKeyInput").value = state.apiKey;
    document.getElementById("ttsVoiceInput").value = state.ttsVoice;
    document.getElementById("ttsStyleInput").value = state.ttsStyle;
    document.getElementById("rolePromptTextarea").value = state.rolePrompt;
    document.getElementById("settingsModal").classList.remove("hidden");
  });
  document.getElementById("closeSettingsBtn").addEventListener("click", () => {
    document.getElementById("settingsModal").classList.add("hidden");
  });
  document.getElementById("toggleApiKeyVisBtn").addEventListener("click", () => {
    const inp = document.getElementById("apiKeyInput");
    inp.type = inp.type === "password" ? "text" : "password";
  });
  document.getElementById("resetRolePromptBtn").addEventListener("click", () => {
    document.getElementById("rolePromptTextarea").value = DEFAULT_ROLE_PROMPT;
  });
  document.getElementById("createReplicatedVoiceBtn").addEventListener("click", handleCreateReplicatedVoice);
  document.getElementById("saveSettingsBtn").addEventListener("click", () => {
    state.apiKey = document.getElementById("apiKeyInput").value.trim();
    state.ttsVoice = document.getElementById("ttsVoiceInput").value.trim() || "Kore";
    state.ttsStyle = document.getElementById("ttsStyleInput").value.trim() || "intimate, honest, warm dream-pop vocal cadence";
    state.rolePrompt = document.getElementById("rolePromptTextarea").value.trim() || DEFAULT_ROLE_PROMPT;
    localStorage.setItem("vw_gemini_api_key", state.apiKey);
    localStorage.setItem("vw_tts_voice", state.ttsVoice);
    localStorage.setItem("vw_tts_style", state.ttsStyle);
    localStorage.setItem("vw_role_prompt", state.rolePrompt);
    document.getElementById("settingsModal").classList.add("hidden");
    updateConnectionBadge();
    showToast("Settings, Voice ID & Role Prompt saved!", "✅");
  });

  // Multimodal Inspiration Uploader
  document.getElementById("inspirationFileInput").addEventListener("change", e => {
    const file = e.target.files?.[0];
    if (file) handleInspirationMediaUpload(file);
  });

  // Cover Art Generator
  document.getElementById("generateCoverArtBtn").addEventListener("click", handleGenerateCoverArt);

  // Suno Custom Mode Controls
  document.getElementById("sunoCreateDualTakesBtn").addEventListener("click", handleSunoCreateDualTakes);
  document.getElementById("sunoTimedStructureToggle").addEventListener("change", e => {
    const song = getActiveSong();
    document.getElementById("sunoLyricsPreviewBox").value = buildTimedLyriaStructurePrompt(song, e.target.checked);
  });
  document.getElementById("injectTimedCuesBtn").addEventListener("click", () => {
    const song = getActiveSong();
    document.getElementById("sunoTimedStructureToggle").checked = true;
    document.getElementById("sunoLyricsPreviewBox").value = buildTimedLyriaStructurePrompt(song, true);
    showToast("Formatted with Lyria 3.5 [0:00 - 0:18] section timestamps!", "⏱️");
  });
  document.getElementById("cycleStylePromptBtn").addEventListener("click", () => {
    const song = getActiveSong();
    const list = song?.sunoStylePrompts || [];
    if (!list.length) return;
    state.styleSuggestionIndex = (state.styleSuggestionIndex + 1) % list.length;
    document.getElementById("sunoStyleInput").value = list[state.styleSuggestionIndex];
  });
  document.querySelectorAll("[data-style-pill]").forEach(btn => {
    btn.addEventListener("click", () => {
      const box = document.getElementById("sunoStyleInput");
      const add = btn.getAttribute("data-style-pill");
      if (!box.value.includes(add)) {
        box.value = box.value.trim() ? `${box.value.trim()}, ${add}` : add;
      }
    });
  });

  // Track Crate Delegated Actions
  document.getElementById("trackCrateContainer").addEventListener("click", async e => {
    const playBtn = e.target.closest("[data-crate-play]");
    if (playBtn) {
      playCrateTrackInDeck(playBtn.getAttribute("data-crate-play"));
      return;
    }

    const overdubBtn = e.target.closest("[data-crate-overdub]");
    if (overdubBtn) {
      const id = overdubBtn.getAttribute("data-crate-overdub");
      const item = state.trackCrate.find(t => t.id === id);
      if (item && item.arrayBuffer) {
        await loadBackingArrayBuffer(item.arrayBuffer, "audio/wav", item.title);
        switchCenterView("audio");
        showToast(`Loaded "${item.title}" into Channel 1 of Vocal Overdub Studio!`, "🎙️");
      }
      return;
    }

    const likeBtn = e.target.closest("[data-crate-like]");
    if (likeBtn) {
      const id = likeBtn.getAttribute("data-crate-like");
      const item = state.trackCrate.find(t => t.id === id);
      if (item) {
        item.liked = !item.liked;
        renderTrackCrate();
      }
    }
  });

  // Bottom Now-Playing Deck Controls
  const deckAudio = document.getElementById("deckMasterAudio");
  const deckPlayBtn = document.getElementById("deckPlayPauseBtn");
  const deckScrubber = document.getElementById("deckScrubber");
  const deckDisc = document.getElementById("deckDiscBox");

  deckPlayBtn.addEventListener("click", () => {
    if (!deckAudio.src && state.trackCrate.length) {
      playCrateTrackInDeck(state.trackCrate[0].id);
      return;
    }
    setupDeckVisualizer();
    if (deckAudio.paused) deckAudio.play().catch(() => {});
    else deckAudio.pause();
  });

  deckAudio.addEventListener("play", () => {
    deckPlayBtn.textContent = "⏸";
    deckDisc.classList.add("spin-disc");
  });
  deckAudio.addEventListener("pause", () => {
    deckPlayBtn.textContent = "▶";
    deckDisc.classList.remove("spin-disc");
  });
  deckAudio.addEventListener("timeupdate", () => {
    const cur = deckAudio.currentTime || 0;
    const dur = deckAudio.duration || 1;
    document.getElementById("deckCurrentTime").textContent = formatTimeSec(cur);
    document.getElementById("deckDuration").textContent = formatTimeSec(dur);
    deckScrubber.value = String(Math.min(100, (cur / dur) * 100));

    // Synchronized Karaoke Lyric Line Ticker
    const song = getActiveSong();
    if (song) {
      const allLines = song.sections.flatMap(s =>
        s.lines.filter((_, idx) => !(s.cutIndices || []).includes(idx)).map(l => `${s.tag} ${l}`)
      );
      if (allLines.length) {
        const lineIdx = Math.min(allLines.length - 1, Math.floor((cur / dur) * allLines.length));
        document.getElementById("deckKaraokeLine").textContent = `♪ ${allLines[lineIdx]}`;
      }
    }
  });
  deckScrubber.addEventListener("input", e => {
    if (deckAudio.duration) {
      deckAudio.currentTime = (Number(e.target.value) / 100) * deckAudio.duration;
    }
  });

  document.getElementById("deckOverdubBtn").addEventListener("click", async () => {
    const activeItem = state.trackCrate.find(t => t.id === state.activeCrateTrackId) || state.trackCrate[0];
    if (activeItem && activeItem.arrayBuffer) {
      await loadBackingArrayBuffer(activeItem.arrayBuffer, "audio/wav", activeItem.title);
    }
    switchCenterView("audio");
    showToast("Opened Vocal Overdub Studio with current track in Channel 1!", "🎙️");
  });

  // Snapshot Saver & Compare
  document.getElementById("saveSnapshotBtn").addEventListener("click", () => {
    const song = getActiveSong();
    if (!song) return;
    const label = prompt(
      "Name this version snapshot:",
      `v${(song.snapshots?.length || 0) + 1} — ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
    );
    if (!label) return;
    song.snapshots = song.snapshots || [];
    song.snapshots.unshift({
      id: "snap-" + Date.now(),
      label,
      createdAt: new Date().toISOString(),
      lyricsText: formatSongForSuno(song)
    });
    saveSongsToStorage();
    renderActiveSong();
    showToast(`Saved snapshot "${label}"`, "📸");
  });

  document.getElementById("snapshotSelect").addEventListener("change", e => {
    const song = getActiveSong();
    const idx = Number(e.target.value);
    if (song && song.snapshots && song.snapshots[idx]) {
      document.getElementById("compareSnapshotText").textContent = song.snapshots[idx].lyricsText;
    }
  });

  document.getElementById("restoreSnapshotBtn").addEventListener("click", () => {
    const song = getActiveSong();
    const idx = Number(document.getElementById("snapshotSelect").value);
    if (!song || !song.snapshots || !song.snapshots[idx]) return;
    song.sections = parseRawSunoText(song.snapshots[idx].lyricsText);
    saveSongsToStorage();
    renderActiveSong();
    switchCenterView("cards");
    showToast(`Restored "${song.snapshots[idx].label}"!`, "⏪");
  });

  // Song Library Actions
  document.getElementById("songSearchInput").addEventListener("input", renderSongList);
  document.getElementById("newSongBtn").addEventListener("click", () => {
    const newSong = {
      id: "song-" + Date.now(),
      title: "Untitled Dream-Pop Draft",
      alternativeTitles: ["Alt Title 1", "Alt Title 2"],
      status: "Draft",
      bpm: 108,
      musicalKey: "F# Minor",
      epName: "Porchlight Static EP",
      sunoUrl: "",
      coverArtDataUrl: "",
      updatedAt: new Date().toISOString(),
      brief: { ...PRESET_BRIEFS[0] },
      sections: [
        { tag: "[Verse 1]", energy: 4, lines: [""], cutIndices: [] },
        { tag: "[Chorus]", energy: 8, lines: [""], cutIndices: [] },
        { tag: "[Verse 2]", energy: 5, lines: [""], cutIndices: [] },
        { tag: "[Chorus]", energy: 8, lines: [""], cutIndices: [] },
        { tag: "[Bridge]", energy: 6, lines: [""], cutIndices: [] },
        { tag: "[Final Chorus]", energy: 9, lines: [""], cutIndices: [] }
      ],
      alternativeChorusLines: ["", ""],
      sunoStylePrompts: [
        "dream pop, synth-pop, warm analog pads, honest female indie vocals, 108 bpm"
      ],
      snapshots: [],
      writerNotes: "Set your Brief on the left and click Write Song Lyrics with Gemini, or start writing directly."
    };
    state.songs.unshift(newSong);
    state.activeSongId = newSong.id;
    saveSongsToStorage();
    renderActiveSong();
    showToast("Created new song project", "🌸");
  });

  document.getElementById("duplicateSongBtn").addEventListener("click", () => {
    const current = getActiveSong();
    if (!current) return;
    const copy = JSON.parse(JSON.stringify(current));
    copy.id = "song-" + Date.now();
    copy.title = `${current.title} (v2)`;
    copy.updatedAt = new Date().toISOString();
    state.songs.unshift(copy);
    state.activeSongId = copy.id;
    saveSongsToStorage();
    renderActiveSong();
    showToast("Duplicated draft for safe experimenting", "📑");
  });

  document.getElementById("deleteSongBtn").addEventListener("click", () => {
    if (state.songs.length <= 1) {
      showToast("Cannot delete the last song in library", "⚠️");
      return;
    }
    state.songs = state.songs.filter(s => s.id !== state.activeSongId);
    state.activeSongId = state.songs[0].id;
    saveSongsToStorage();
    renderActiveSong();
    showToast("Removed song from library", "🗑️");
  });

  // Brief Inputs Live Sync
  ["briefTheme", "briefMood", "briefGenre", "briefArtist", "briefStructure", "briefTitleIdea", "briefIncludeLine", "briefAvoid"].forEach(id => {
    document.getElementById(id).addEventListener("input", syncBriefInputsToSong);
  });

  // Song Header Metadata Live Sync
  document.getElementById("songTitleInput").addEventListener("input", e => {
    const song = getActiveSong();
    if (!song) return;
    song.title = e.target.value;
    saveSongsToStorage();
  });
  document.getElementById("songStatusSelect").addEventListener("change", e => {
    const song = getActiveSong();
    if (!song) return;
    song.status = e.target.value;
    saveSongsToStorage();
  });
  document.getElementById("songBpmInput").addEventListener("input", e => {
    const song = getActiveSong();
    if (!song) return;
    song.bpm = Number(e.target.value) || 108;
    saveSongsToStorage();
  });
  document.getElementById("songKeyInput").addEventListener("input", e => {
    const song = getActiveSong();
    if (!song) return;
    song.musicalKey = e.target.value;
    saveSongsToStorage();
  });
  document.getElementById("songEpInput").addEventListener("input", e => {
    const song = getActiveSong();
    if (!song) return;
    song.epName = e.target.value;
    saveSongsToStorage();
  });
  document.getElementById("songSunoUrlInput").addEventListener("input", e => {
    const song = getActiveSong();
    if (!song) return;
    song.sunoUrl = e.target.value;
    saveSongsToStorage();
  });

  document.getElementById("loadPresetBriefBtn").addEventListener("click", () => {
    state.presetIndex = (state.presetIndex + 1) % PRESET_BRIEFS.length;
    const preset = PRESET_BRIEFS[state.presetIndex];
    const song = getActiveSong();
    if (!song) return;
    song.brief = { ...preset };
    saveSongsToStorage();
    renderActiveSong();
    showToast(`Loaded preset: ${preset.name}`, "💡");
  });

  document.querySelectorAll("[data-mood-chip]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.getElementById("briefMood").value = btn.getAttribute("data-mood-chip");
      syncBriefInputsToSong();
    });
  });
  document.querySelectorAll("[data-genre-chip]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.getElementById("briefGenre").value = btn.getAttribute("data-genre-chip");
      syncBriefInputsToSong();
    });
  });
  document.querySelectorAll("[data-struct-add]").forEach(btn => {
    btn.addEventListener("click", () => {
      const structInput = document.getElementById("briefStructure");
      const toAdd = btn.getAttribute("data-struct-add");
      structInput.value = structInput.value.trim()
        ? `${structInput.value.trim()}, ${toAdd}`
        : toAdd;
      syncBriefInputsToSong();
    });
  });
  document.querySelectorAll("[data-insert-metatag]").forEach(btn => {
    btn.addEventListener("click", () => {
      const song = getActiveSong();
      if (!song || !song.sections.length) return;
      const tag = btn.getAttribute("data-insert-metatag");
      song.sections[0].lines.unshift(tag);
      saveSongsToStorage();
      renderActiveSong();
      showToast(`Inserted ${tag} into ${song.sections[0].tag}`, "🎙️");
    });
  });

  document.getElementById("generateDraftBtn").addEventListener("click", handleGenerateFullDraft);

  document.getElementById("addAltTitleBtn").addEventListener("click", () => {
    const song = getActiveSong();
    if (!song) return;
    const idea = prompt("Enter an alternative title idea:");
    if (idea && idea.trim()) {
      song.alternativeTitles = [...(song.alternativeTitles || []), idea.trim()];
      saveSongsToStorage();
      renderActiveSong();
    }
  });

  document.querySelectorAll("[data-center-view]").forEach(btn => {
    btn.addEventListener("click", () => {
      switchCenterView(btn.getAttribute("data-center-view"));
    });
  });

  document.getElementById("syncRawToCardsBtn").addEventListener("click", () => {
    const song = getActiveSong();
    if (!song) return;
    song.sections = parseRawSunoText(document.getElementById("rawSunoTextarea").value);
    saveSongsToStorage();
    renderActiveSong();
    switchCenterView("cards");
    showToast("Synced Raw edits to section cards!", "✅");
  });

  document.getElementById("addSectionBtn").addEventListener("click", () => {
    const song = getActiveSong();
    if (!song) return;
    song.sections.push({ tag: "[Verse]", energy: 5, lines: ["New lyric line..."], cutIndices: [] });
    saveSongsToStorage();
    renderActiveSong();
  });

  // Vocal Overdub DAW Controls
  document.getElementById("generateLyriaTrackBtn").addEventListener("click", handleGenerateLyriaTrack);
  document.getElementById("generateWebAudioSynthBtn").addEventListener("click", synthesizeFullMultiSectionBackingForDaw);
  document.getElementById("importBackingFileInput").addEventListener("change", async e => {
    const file = e.target.files?.[0];
    if (!file) return;
    const buf = await file.arrayBuffer();
    await loadBackingArrayBuffer(buf, file.type, `Imported: ${file.name}`);
    showToast(`Loaded backing audio "${file.name}"`, "📂");
  });
  document.getElementById("importVocalFileInput").addEventListener("change", async e => {
    const file = e.target.files?.[0];
    if (!file) return;
    const buf = await file.arrayBuffer();
    await loadVocalArrayBuffer(buf, file.type, `Imported Vocal: ${file.name}`);
    showToast(`Loaded your vocal stem "${file.name}" into Channel 2!`, "🎙️");
  });
  document.getElementById("recordMicVocalBtn").addEventListener("click", toggleRecordMicVocal);
  document.getElementById("generateTtsVocalStemBtn").addEventListener("click", () => {
    const song = getActiveSong();
    if (!song) return;
    handleGenerateTtsReadback(formatSongForSuno(song), song.title);
  });

  document.getElementById("backingVolumeSlider").addEventListener("input", e => {
    document.getElementById("backingVolumeVal").textContent = `${e.target.value}%`;
  });
  document.getElementById("vocalVolumeSlider").addEventListener("input", e => {
    document.getElementById("vocalVolumeVal").textContent = `${e.target.value}%`;
  });
  document.getElementById("vocalOffsetSlider").addEventListener("input", e => {
    document.getElementById("vocalOffsetVal").textContent = `${Number(e.target.value).toFixed(1)}s`;
  });
  document.getElementById("vocalReverbSlider").addEventListener("input", e => {
    document.getElementById("vocalReverbVal").textContent = `${e.target.value}%`;
  });
  document.getElementById("vocalDelaySlider").addEventListener("input", e => {
    document.getElementById("vocalDelayVal").textContent = `${e.target.value}%`;
  });

  document.getElementById("playBothStemsBtn").addEventListener("click", playCombinedMix);
  document.getElementById("stopBothStemsBtn").addEventListener("click", stopCombinedMix);
  document.getElementById("bounceCombinedWavBtn").addEventListener("click", bounceCombinedMasterWav);

  // Section Cards Delegated Events
  document.getElementById("sectionsCardsView").addEventListener("input", e => {
    const song = getActiveSong();
    if (!song) return;

    if (e.target.hasAttribute("data-sec-tag")) {
      const secIdx = Number(e.target.getAttribute("data-sec-tag"));
      song.sections[secIdx].tag = e.target.value;
      saveSongsToStorage();
      return;
    }

    if (e.target.hasAttribute("data-sec-energy")) {
      const secIdx = Number(e.target.getAttribute("data-sec-energy"));
      song.sections[secIdx].energy = Number(e.target.value);
      e.target.nextElementSibling.textContent = e.target.value;
      saveSongsToStorage();
      return;
    }

    if (e.target.hasAttribute("data-line-input")) {
      const [secIdx, lineIdx] = e.target.getAttribute("data-line-input").split(":").map(Number);
      song.sections[secIdx].lines[lineIdx] = e.target.value;
      saveSongsToStorage();
      const row = e.target.parentElement;
      const syll = countLineSyllables(e.target.value);
      const lastWord = getLastWord(e.target.value);
      const syllSpan = row.querySelector("span.rounded-full");
      const rhymeBtn = row.querySelector("[data-rhyme-word]");
      if (syllSpan) syllSpan.textContent = `${syll}s`;
      if (rhymeBtn) {
        rhymeBtn.setAttribute("data-rhyme-word", lastWord);
        rhymeBtn.textContent = lastWord ? `♪ ${lastWord}` : "♪";
      }
    }
  });

  document.getElementById("sectionsCardsView").addEventListener("click", e => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const song = getActiveSong();
    if (!song) return;

    if (btn.hasAttribute("data-sec-tts")) {
      const secIdx = Number(btn.getAttribute("data-sec-tts"));
      const sec = song.sections[secIdx];
      handleGenerateTtsReadback(sec.lines.join("\n"), sec.tag);
      return;
    }

    if (btn.hasAttribute("data-cut-toggle")) {
      const [secIdx, lineIdx] = btn.getAttribute("data-cut-toggle").split(":").map(Number);
      const sec = song.sections[secIdx];
      sec.cutIndices = sec.cutIndices || [];
      if (sec.cutIndices.includes(lineIdx)) {
        sec.cutIndices = sec.cutIndices.filter(i => i !== lineIdx);
      } else {
        sec.cutIndices.push(lineIdx);
      }
      saveSongsToStorage();
      renderActiveSong();
      return;
    }

    if (btn.hasAttribute("data-rhyme-word")) {
      const w = btn.getAttribute("data-rhyme-word");
      switchRightTab("rhyme");
      if (w) lookupRhymes(w);
      return;
    }

    if (btn.hasAttribute("data-del-line")) {
      const [secIdx, lineIdx] = btn.getAttribute("data-del-line").split(":").map(Number);
      song.sections[secIdx].lines.splice(lineIdx, 1);
      saveSongsToStorage();
      renderActiveSong();
      return;
    }

    if (btn.hasAttribute("data-sec-add-line")) {
      const secIdx = Number(btn.getAttribute("data-sec-add-line"));
      song.sections[secIdx].lines.push("");
      saveSongsToStorage();
      renderActiveSong();
      return;
    }

    if (btn.hasAttribute("data-sec-up")) {
      const idx = Number(btn.getAttribute("data-sec-up"));
      if (idx > 0) {
        const tmp = song.sections[idx - 1];
        song.sections[idx - 1] = song.sections[idx];
        song.sections[idx] = tmp;
        saveSongsToStorage();
        renderActiveSong();
      }
      return;
    }

    if (btn.hasAttribute("data-sec-down")) {
      const idx = Number(btn.getAttribute("data-sec-down"));
      if (idx < song.sections.length - 1) {
        const tmp = song.sections[idx + 1];
        song.sections[idx + 1] = song.sections[idx];
        song.sections[idx] = tmp;
        saveSongsToStorage();
        renderActiveSong();
      }
      return;
    }

    if (btn.hasAttribute("data-sec-del")) {
      const idx = Number(btn.getAttribute("data-sec-del"));
      song.sections.splice(idx, 1);
      saveSongsToStorage();
      renderActiveSong();
      return;
    }

    if (btn.hasAttribute("data-sec-ai")) {
      const secIdx = Number(btn.getAttribute("data-sec-ai"));
      const instruction = btn.getAttribute("data-ai-prompt");
      handleRewriteSection(secIdx, instruction);
      return;
    }

    if (btn.hasAttribute("data-sec-custom-ai")) {
      const secIdx = Number(btn.getAttribute("data-sec-custom-ai"));
      const custom = prompt("How should the Virtual Wallflower agent rewrite this section?", "Keep the melody rhythm, but make the imagery more personal and less predictable.");
      if (custom && custom.trim()) {
        handleRewriteSection(secIdx, custom.trim());
      }
    }
  });

  document.getElementById("clicheListContainer").addEventListener("click", e => {
    const btn = e.target.closest("button[data-fix-cliche]");
    if (!btn) return;
    const secIdx = Number(btn.getAttribute("data-fix-cliche"));
    handleRewriteSection(secIdx, "Remove all AI clichés and replace them with grounded, honest midwestern dream-pop sensory details.");
  });

  // Alternative Chorus Lines
  document.getElementById("addAltChorusBtn").addEventListener("click", () => {
    const song = getActiveSong();
    if (!song) return;
    song.alternativeChorusLines.push("New alternative chorus line...");
    saveSongsToStorage();
    renderActiveSong();
  });

  document.getElementById("altChorusContainer").addEventListener("input", e => {
    if (e.target.hasAttribute("data-alt-chorus-input")) {
      const idx = Number(e.target.getAttribute("data-alt-chorus-input"));
      const song = getActiveSong();
      song.alternativeChorusLines[idx] = e.target.value;
      saveSongsToStorage();
    }
  });

  document.getElementById("altChorusContainer").addEventListener("click", e => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const song = getActiveSong();
    if (!song) return;

    if (btn.hasAttribute("data-swap-chorus")) {
      const altIdx = Number(btn.getAttribute("data-swap-chorus"));
      const newHook = song.alternativeChorusLines[altIdx];
      let previousHook = null;
      let swappedCount = 0;

      song.sections.forEach(sec => {
        if (/chorus/i.test(sec.tag) && sec.lines.length > 0) {
          const lastIdx = sec.lines.length - 1;
          if (!previousHook) previousHook = sec.lines[lastIdx];
          sec.lines[lastIdx] = newHook;
          swappedCount++;
        }
      });

      if (swappedCount > 0) {
        if (previousHook) song.alternativeChorusLines[altIdx] = previousHook;
        saveSongsToStorage();
        renderActiveSong();
        showToast(`Swapped hook into ${swappedCount} chorus section(s)!`, "⇄");
      } else {
        showToast("No [Chorus] section found to swap into", "⚠️");
      }
    }

    if (btn.hasAttribute("data-copy-text")) {
      const txt = btn.getAttribute("data-copy-text");
      navigator.clipboard?.writeText(txt);
      showToast("Copied line to clipboard!", "📋");
    }
  });

  // Style Prompts
  document.getElementById("addSunoPromptBtn").addEventListener("click", () => {
    const song = getActiveSong();
    if (!song) return;
    song.sunoStylePrompts.push("dream pop, synth-pop, shimmering pads, intimate vocals");
    saveSongsToStorage();
    renderActiveSong();
  });

  document.getElementById("sunoPromptsContainer").addEventListener("input", e => {
    if (e.target.hasAttribute("data-suno-prompt-input")) {
      const idx = Number(e.target.getAttribute("data-suno-prompt-input"));
      const song = getActiveSong();
      song.sunoStylePrompts[idx] = e.target.value;
      saveSongsToStorage();
    }
  });

  document.getElementById("sunoPromptsContainer").addEventListener("click", e => {
    const useBtn = e.target.closest("button[data-use-style]");
    if (useBtn) {
      document.getElementById("sunoStyleInput").value = useBtn.getAttribute("data-use-style");
      switchCenterView("suno");
      showToast("Loaded style prompt into Create Console!", "🔥");
      return;
    }
    const copyBtn = e.target.closest("button[data-copy-text]");
    if (copyBtn) {
      const txt = copyBtn.getAttribute("data-copy-text");
      navigator.clipboard?.writeText(txt);
      showToast("Copied Style Prompt!", "🎛️");
    }
  });

  // Right Column Tabs
  document.querySelectorAll("[data-right-tab]").forEach(btn => {
    btn.addEventListener("click", () => {
      switchRightTab(btn.getAttribute("data-right-tab"));
    });
  });

  // Co-Writer Chat
  document.getElementById("sendChatBtn").addEventListener("click", () => handleSendChat());
  document.getElementById("chatInput").addEventListener("keydown", e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendChat();
    }
  });
  document.getElementById("resetChatBtn").addEventListener("click", () => {
    state.previousInteractionId = null;
    state.chatHistory = [
      {
        role: "agent",
        text: "Context reset 🌸 Ready for a fresh co-writing session on your current song."
      }
    ];
    renderChatMessages();
    showToast("Co-writer conversation context reset", "🔄");
  });
  document.querySelectorAll("[data-chat-quick]").forEach(btn => {
    btn.addEventListener("click", () => {
      handleSendChat(btn.getAttribute("data-chat-quick"));
    });
  });

  document.getElementById("rhymeSearchBtn").addEventListener("click", () => {
    lookupRhymes(document.getElementById("rhymeSearchInput").value);
  });
  document.getElementById("rhymeSearchInput").addEventListener("keydown", e => {
    if (e.key === "Enter") lookupRhymes(e.target.value);
  });

  document.getElementById("cleanCutLinesBtn").addEventListener("click", () => {
    const song = getActiveSong();
    if (!song) return;
    let removed = 0;
    song.sections.forEach(sec => {
      const cuts = sec.cutIndices || [];
      if (cuts.length) {
        removed += cuts.length;
        sec.lines = sec.lines.filter((_, idx) => !cuts.includes(idx));
        sec.cutIndices = [];
      }
    });
    saveSongsToStorage();
    renderActiveSong();
    showToast(`Removed ${removed} cut line(s)`, "✂️");
  });
}

async function seedStarterTrackCrate() {
  const song = getActiveSong();
  if (!song) return;
  try {
    const [bufA, bufB] = await Promise.all([
      synthesizeMultiSectionTrackBuffer({ song, variant: "A", includeVocalStem: false }),
      synthesizeMultiSectionTrackBuffer({ song, variant: "B", includeVocalStem: false })
    ]);
    const wavA = audioBufferToWav(bufA);
    const wavB = audioBufferToWav(bufB);

    state.trackCrate = [
      {
        id: "starter-take-a",
        songId: song.id,
        title: `${song.title} — Take A`,
        badge: "v1 Warm Juno Analog Mix",
        style: song.sunoStylePrompts[0],
        bpm: song.bpm || 108,
        musicalKey: song.musicalKey || "F# Minor",
        durationSec: Math.round(bufA.duration),
        audioUrl: URL.createObjectURL(new Blob([wavA], { type: "audio/wav" })),
        arrayBuffer: wavA,
        coverArt: "",
        liked: true,
        createdAt: "Starter Take"
      },
      {
        id: "starter-take-b",
        songId: song.id,
        title: `${song.title} — Take B`,
        badge: "v2 Nocturnal Shimmer Mix",
        style: song.sunoStylePrompts[1] || song.sunoStylePrompts[0],
        bpm: song.bpm || 108,
        musicalKey: song.musicalKey || "F# Minor",
        durationSec: Math.round(bufB.duration),
        audioUrl: URL.createObjectURL(new Blob([wavB], { type: "audio/wav" })),
        arrayBuffer: wavB,
        coverArt: "",
        liked: false,
        createdAt: "Starter Take"
      }
    ];
    renderTrackCrate();
    // Preload Take A into Channel 1 of the Vocal Overdub DAW too
    await loadBackingArrayBuffer(wavA, "audio/wav", `${song.title} — Take A`);
  } catch (_) {}
}

// ============================================================================
// VIEW 6: HUM-TO-SYNTH HOOK CONVERTER, 16-STEP SEQUENCER & MIDI EXPORTER
// ============================================================================
state.humSteps = [7, -1, 5, 4, 2, -1, 4, 5, 3, -1, 2, 0, 1, 2, 4, -1];
state.humPitchHistory = [66, 68, 69, 73, 71, 69, 66, 69, 71, 73, 69, 68, 66, 68, 69, 66];
state.isRecordingHum = false;
state.humActivePlaySource = null;
state.humStepTimer = null;
state.humPlayingStep = -1;

const NOTE_NAMES_SHARP = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

function parseSongKeyRootAndMode(keyStr) {
  const raw = String(keyStr || "F# Minor").trim();
  const isMajor = /maj/i.test(raw) && !/min/i.test(raw);
  const match = raw.match(/^([A-G][#b]?)/i);
  const rootMap = {
    C: 60, "C#": 61, DB: 61, D: 62, "D#": 63, EB: 63, E: 64,
    F: 65, "F#": 66, GB: 66, G: 67, "G#": 68, AB: 68, A: 69, "A#": 70, BB: 70, B: 71
  };
  const token = match ? match[1].toUpperCase() : "F#";
  const rootMidi = rootMap[token] || 66;
  const intervals = isMajor ? [0, 2, 4, 5, 7, 9, 11, 12] : [0, 2, 3, 5, 7, 8, 10, 12];
  const degreeLabels = isMajor
    ? ["1 (Root)", "2", "3", "4", "5", "6", "7", "8 (Oct)"]
    : ["1 (Root)", "2", "b3", "4", "5", "b6", "b7", "8 (Oct)"];
  return { rootMidi, intervals, degreeLabels, label: `${token} ${isMajor ? "Major" : "Minor"}` };
}

function getScaleMidiNotesForActiveSong() {
  const song = getActiveSong();
  const octShift = Number(document.getElementById("humOctaveSelect")?.value || 0);
  const parsed = parseSongKeyRootAndMode(song?.musicalKey || "F# Minor");
  const notes = parsed.intervals.map((semi, idx) => {
    const midi = parsed.rootMidi + semi + octShift * 12;
    const name = `${NOTE_NAMES_SHARP[midi % 12]}${Math.floor(midi / 12) - 1}`;
    return { degree: idx, midi, name, role: parsed.degreeLabels[idx] };
  });
  return { scaleLabel: parsed.label, notes };
}

function midiToFreq(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

function freqToMidi(freq) {
  return 69 + 12 * Math.log2(freq / 440);
}

function renderHumStudio() {
  const gridEl = document.getElementById("humPianoRollGrid");
  if (!gridEl) return;
  const { scaleLabel, notes } = getScaleMidiNotesForActiveSong();
  const badge = document.getElementById("humKeyScaleBadge");
  if (badge) badge.textContent = `${scaleLabel} Scale`;

  // Render rows from top (degree 7 = Octave) down to bottom (degree 0 = Root)
  const rowsHtml = [...notes]
    .reverse()
    .map(noteInfo => {
      const cells = Array.from({ length: 16 }, (_, stepIdx) => {
        const isActive = state.humSteps[stepIdx] === noteInfo.degree;
        const isBeatStart = stepIdx % 4 === 0;
        const isPlaying = state.humPlayingStep === stepIdx;
        return `<button type="button" data-hum-step="${stepIdx}" data-hum-deg="${noteInfo.degree}" class="h-6 min-w-[28px] flex-1 rounded transition border ${
          isActive
            ? "bg-gradient-to-r from-purple-500 to-pink-500 border-pink-300 shadow-md shadow-pink-500/30"
            : isPlaying
              ? "bg-purple-500/25 border-purple-400/50"
              : isBeatStart
                ? "bg-[#151224] hover:bg-purple-500/20 border-[#2f2848]"
                : "bg-[#0e0c16] hover:bg-purple-500/20 border-[#221d35]"
        }" title="Step ${stepIdx + 1}: ${noteInfo.name}"></button>`;
      }).join("");

      return `
        <div class="flex items-center gap-1.5">
          <div class="w-20 text-[11px] mono text-[#9e96b8] flex items-center justify-between pr-1 shrink-0">
            <span class="text-purple-200 font-bold">${noteInfo.name}</span>
            <span class="text-[10px] opacity-75">${noteInfo.role.split(" ")[0]}</span>
          </div>
          <div class="flex-1 flex items-center gap-1">${cells}</div>
        </div>
      `;
    })
    .join("");

  const stepNumbersHtml = `
    <div class="flex items-center gap-1.5 pt-1">
      <div class="w-20 text-[10px] mono text-[#6b6385] shrink-0">STEP</div>
      <div class="flex-1 flex items-center gap-1">
        ${Array.from({ length: 16 }, (_, i) => `<div class="min-w-[28px] flex-1 text-center text-[10px] mono ${i % 4 === 0 ? "text-pink-300 font-bold" : "text-[#6b6385]"}">${i + 1}</div>`).join("")}
      </div>
    </div>
  `;

  gridEl.innerHTML = rowsHtml + stepNumbersHtml;
  drawHumPitchContourCanvas();
}

function drawHumPitchContourCanvas() {
  const canvas = document.getElementById("humPitchCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  // Subtle horizontal scale guides
  ctx.strokeStyle = "rgba(168, 85, 247, 0.14)";
  ctx.lineWidth = 1;
  for (let i = 1; i < 6; i++) {
    const y = (h / 6) * i;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  const { notes } = getScaleMidiNotesForActiveSong();
  // Draw quantized step blocks + smooth contour curve
  ctx.strokeStyle = "#f472b6";
  ctx.lineWidth = 2.5;
  ctx.beginPath();

  let started = false;
  for (let i = 0; i < 16; i++) {
    const deg = state.humSteps[i];
    const x = (i + 0.5) * (w / 16);
    if (deg >= 0) {
      const y = h - 14 - (deg / 7) * (h - 28);
      if (!started) {
        ctx.moveTo(x, y);
        started = true;
      } else {
        ctx.lineTo(x, y);
      }
      ctx.fillStyle = "#c084fc";
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#f5f3ff";
      ctx.font = "10px monospace";
      ctx.fillText(notes[deg]?.name || "", x - 10, y - 7);
    }
  }
  ctx.stroke();
}

function playSinglePreviewSynthNote(midiNote, durationSec = 0.28) {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const patch = document.getElementById("humSynthPatchSelect")?.value || "juno-lead";
    const freq = midiToFreq(midiNote);

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    if (patch === "glass-arp") {
      osc1.type = "sine";
      osc2.type = "triangle";
      osc1.frequency.setValueAtTime(freq, now);
      osc2.frequency.setValueAtTime(freq * 2, now);
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(4800, now);
    } else if (patch === "darkwave-bass") {
      osc1.type = "sawtooth";
      osc2.type = "square";
      osc1.frequency.setValueAtTime(freq * 0.5, now);
      osc2.frequency.setValueAtTime(freq, now);
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1600, now);
      filter.frequency.exponentialRampToValueAtTime(280, now + durationSec);
    } else if (patch === "cocteau-pad") {
      osc1.type = "triangle";
      osc2.type = "sawtooth";
      osc1.frequency.setValueAtTime(freq * 0.996, now);
      osc2.frequency.setValueAtTime(freq * 1.004, now);
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(2400, now);
    } else {
      // juno-lead
      osc1.type = "sawtooth";
      osc2.type = "sawtooth";
      osc1.frequency.setValueAtTime(freq * 0.997, now);
      osc2.frequency.setValueAtTime(freq * 1.003, now);
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(3200, now);
    }

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + durationSec);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + durationSec + 0.02);
    osc2.stop(now + durationSec + 0.02);
  } catch (_) {}
}

async function synthesizeHumHookBuffer(numBars = 2) {
  const song = getActiveSong();
  const bpm = Number(song?.bpm) || 108;
  const stepDur = 60 / bpm / 4; // 16th note
  const totalSteps = 16 * numBars;
  const durationSec = totalSteps * stepDur + 1.0;
  const sampleRate = 44100;
  const offline = new OfflineAudioContext(2, Math.ceil(durationSec * sampleRate), sampleRate);

  const { notes } = getScaleMidiNotesForActiveSong();
  const patch = document.getElementById("humSynthPatchSelect")?.value || "juno-lead";
  const shimmerMix = Number(document.getElementById("humShimmerSlider")?.value || 65) / 100;
  const gateRatio = Number(document.getElementById("humGateSlider")?.value || 80) / 100;

  // Stereo Chorus / Echo Delay Bus
  const dryBus = offline.createGain();
  dryBus.gain.value = 0.8;
  dryBus.connect(offline.destination);

  const delayL = offline.createDelay(1.0);
  const delayR = offline.createDelay(1.0);
  delayL.delayTime.value = stepDur * 3; // Dotted 8th
  delayR.delayTime.value = stepDur * 4;
  const fb = offline.createGain();
  fb.gain.value = 0.35 * shimmerMix;
  delayL.connect(delayR);
  delayR.connect(fb);
  fb.connect(delayL);

  const wetGain = offline.createGain();
  wetGain.gain.value = 0.45 * shimmerMix;
  delayL.connect(wetGain);
  delayR.connect(wetGain);
  wetGain.connect(offline.destination);

  for (let s = 0; s < totalSteps; s++) {
    const deg = state.humSteps[s % 16];
    if (deg < 0 || !notes[deg]) continue;
    const t0 = s * stepDur;
    const noteLen = Math.max(0.08, stepDur * gateRatio * 1.35);
    const freq = midiToFreq(notes[deg].midi);

    const oscA = offline.createOscillator();
    const oscB = offline.createOscillator();
    const filt = offline.createBiquadFilter();
    const env = offline.createGain();
    const panner = offline.createStereoPanner();
    panner.pan.setValueAtTime(Math.sin(s * 0.7) * 0.25, t0);

    if (patch === "glass-arp") {
      oscA.type = "sine";
      oscB.type = "triangle";
      oscA.frequency.setValueAtTime(freq, t0);
      oscB.frequency.setValueAtTime(freq * 2, t0);
      filt.type = "lowpass";
      filt.frequency.setValueAtTime(5200, t0);
    } else if (patch === "darkwave-bass") {
      oscA.type = "sawtooth";
      oscB.type = "square";
      oscA.frequency.setValueAtTime(freq * 0.5, t0);
      oscB.frequency.setValueAtTime(freq, t0);
      filt.type = "lowpass";
      filt.Q.value = 4.5;
      filt.frequency.setValueAtTime(2200, t0);
      filt.frequency.exponentialRampToValueAtTime(260, t0 + noteLen);
    } else if (patch === "cocteau-pad") {
      oscA.type = "triangle";
      oscB.type = "sawtooth";
      oscA.frequency.setValueAtTime(freq * 0.995, t0);
      oscB.frequency.setValueAtTime(freq * 1.005, t0);
      filt.type = "lowpass";
      filt.frequency.setValueAtTime(2600, t0);
    } else {
      oscA.type = "sawtooth";
      oscB.type = "sawtooth";
      oscA.frequency.setValueAtTime(freq * 0.996, t0);
      oscB.frequency.setValueAtTime(freq * 1.004, t0);
      filt.type = "lowpass";
      filt.Q.value = 2.2;
      filt.frequency.setValueAtTime(3400, t0);
      filt.frequency.exponentialRampToValueAtTime(900, t0 + noteLen);
    }

    const attack = patch === "cocteau-pad" ? 0.045 : 0.012;
    env.gain.setValueAtTime(0.0001, t0);
    env.gain.linearRampToValueAtTime(0.24, t0 + attack);
    env.gain.exponentialRampToValueAtTime(0.0001, t0 + noteLen);

    oscA.connect(filt);
    oscB.connect(filt);
    filt.connect(env);
    env.connect(panner);
    panner.connect(dryBus);
    panner.connect(delayL);

    oscA.start(t0);
    oscB.start(t0);
    oscA.stop(t0 + noteLen + 0.03);
    oscB.stop(t0 + noteLen + 0.03);
  }

  return await offline.startRendering();
}

// Autocorrelation Pitch Detection (Hz) from Float32 PCM slice
function detectPitchAutocorrelation(buf, sampleRate) {
  let rms = 0;
  for (let i = 0; i < buf.length; i++) rms += buf[i] * buf[i];
  rms = Math.sqrt(rms / buf.length);
  if (rms < 0.012) return -1; // Silence

  const minLag = Math.floor(sampleRate / 880); // Max ~880 Hz
  const maxLag = Math.floor(sampleRate / 85);  // Min ~85 Hz
  let bestLag = -1;
  let bestCorr = 0;

  for (let lag = minLag; lag <= Math.min(maxLag, buf.length - 1); lag++) {
    let corr = 0;
    for (let i = 0; i < buf.length - lag; i++) {
      corr += buf[i] * buf[i + lag];
    }
    if (corr > bestCorr) {
      bestCorr = corr;
      bestLag = lag;
    }
  }
  if (bestLag <= 0) return -1;
  return sampleRate / bestLag;
}

function quantizeFreqToScaleDegree(freqHz) {
  if (freqHz <= 0) return -1;
  const { notes } = getScaleMidiNotesForActiveSong();
  const rawMidi = freqToMidi(freqHz);
  // Fold rawMidi into the octave range of notes[0]..notes[7]
  const minMidi = notes[0].midi;
  const maxMidi = notes[notes.length - 1].midi;
  let folded = rawMidi;
  while (folded < minMidi - 2) folded += 12;
  while (folded > maxMidi + 2) folded -= 12;

  let bestDeg = 0;
  let bestDist = 999;
  notes.forEach(n => {
    const d = Math.abs(n.midi - folded);
    if (d < bestDist) {
      bestDist = d;
      bestDeg = n.degree;
    }
  });
  return bestDeg;
}

async function extractHumStepsFromAudioBuffer(audioBuf) {
  const chan = audioBuf.getChannelData(0);
  const sr = audioBuf.sampleRate;
  const sliceLen = Math.floor(chan.length / 16);
  const { notes } = getScaleMidiNotesForActiveSong();
  let detectedCount = 0;

  for (let s = 0; s < 16; s++) {
    const start = s * sliceLen;
    const windowSize = Math.min(2048, sliceLen);
    const sub = chan.subarray(start, start + windowSize);
    const hz = detectPitchAutocorrelation(sub, sr);
    if (hz > 0) {
      const deg = quantizeFreqToScaleDegree(hz);
      state.humSteps[s] = deg;
      detectedCount++;
      const badge = document.getElementById("humDetectedNoteBadge");
      if (badge && notes[deg]) badge.textContent = `Detected: ${notes[deg].name} (${Math.round(hz)} Hz)`;
    } else {
      state.humSteps[s] = -1;
    }
  }

  // If the clip was very quiet or percussive, ensure at least a musical contour
  if (detectedCount < 3) {
    generateRandomDreamPopHook();
  } else {
    renderHumStudio();
  }
}

function generateRandomDreamPopHook() {
  const motifs = [
    [7, -1, 5, 4, 2, -1, 4, 5, 3, -1, 2, 0, 1, 2, 4, -1],
    [0, 2, 4, -1, 7, 6, 4, -1, 5, 4, 2, -1, 3, 2, 0, -1],
    [4, -1, 4, 5, 7, -1, 6, 4, 2, -1, 2, 3, 4, 2, 0, -1],
    [7, 6, 4, 2, 4, -1, 5, 4, 2, 0, 2, -1, 3, 4, 2, -1]
  ];
  const pick = motifs[Math.floor(Math.random() * motifs.length)];
  state.humSteps = pick.map(v => (v >= 0 && Math.random() < 0.25 ? Math.max(0, Math.min(7, v + (Math.random() < 0.5 ? 1 : -1))) : v));
  renderHumStudio();
}

// Build binary Standard MIDI File (.mid) Format 0 from the 16-step sequence
function buildMidiFileBytesFromHumSteps() {
  const song = getActiveSong();
  const bpm = Number(song?.bpm) || 108;
  const mpqn = Math.round(60000000 / bpm);
  const { notes } = getScaleMidiNotesForActiveSong();
  const ticksPerStep = 120; // 480 ticks per quarter note -> 16th note = 120 ticks

  function writeVarLen(val) {
    const bytes = [val & 0x7f];
    while ((val >>= 7)) {
      bytes.unshift((val & 0x7f) | 0x80);
    }
    return bytes;
  }

  const trackEvents = [];
  // Tempo Meta Event: 00 FF 51 03 tt tt tt
  trackEvents.push(0x00, 0xff, 0x51, 0x03, (mpqn >> 16) & 0xff, (mpqn >> 8) & 0xff, mpqn & 0xff);
  // Program Change: Juno Pad/Lead (Program 81 = Lead 2 sawtooth)
  trackEvents.push(0x00, 0xc0, 81);

  let pendingDelta = 0;
  // Write 2 bars (32 steps) of MIDI notes
  for (let s = 0; s < 32; s++) {
    const deg = state.humSteps[s % 16];
    if (deg >= 0 && notes[deg]) {
      const midiNote = notes[deg].midi;
      // Note On
      trackEvents.push(...writeVarLen(pendingDelta), 0x90, midiNote, 100);
      // Note Off after 100 ticks
      trackEvents.push(...writeVarLen(100), 0x80, midiNote, 0);
      pendingDelta = ticksPerStep - 100;
    } else {
      pendingDelta += ticksPerStep;
    }
  }
  // End of Track Meta Event
  trackEvents.push(...writeVarLen(pendingDelta), 0xff, 0x2f, 0x00);

  const tLen = trackEvents.length;
  const header = [
    0x4d, 0x54, 0x68, 0x64, // "MThd"
    0x00, 0x00, 0x00, 0x06, // Header length 6
    0x00, 0x00,             // Format 0
    0x00, 0x01,             // 1 track
    0x01, 0xe0,             // 480 ticks/quarter
    0x4d, 0x54, 0x72, 0x6b, // "MTrk"
    (tLen >> 24) & 0xff,
    (tLen >> 16) & 0xff,
    (tLen >> 8) & 0xff,
    tLen & 0xff
  ];

  return new Uint8Array([...header, ...trackEvents]);
}

// ============================================================================
// VIEW 7: LYRIC VIDEO & VISUALIZER RECORDER + SYNCED .LRC EXPORTER
// ============================================================================
state.videoAnimFrame = null;
state.lrcLines = [];
state.tapSyncIndex = 0;
state.videoParticles = Array.from({ length: 28 }, () => ({
  x: Math.random(),
  y: Math.random(),
  r: 1.5 + Math.random() * 2.5,
  vy: 0.0005 + Math.random() * 0.0012,
  alpha: 0.25 + Math.random() * 0.55
}));

function formatLrcTimestamp(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `[${String(m).padStart(2, "0")}:${s.toFixed(2).padStart(5, "0")}]`;
}

function generateLrcForSong(song) {
  if (!song) return "";
  const bpm = Number(song.bpm) || 108;
  const secPerBar = (60 / bpm) * 4;
  let elapsed = 0;
  const parsedLines = [];

  (song.sections || []).forEach(sec => {
    const activeLines = (sec.lines || []).filter((_, idx) => !(sec.cutIndices || []).includes(idx));
    const bars = Math.max(4, Math.ceil(activeLines.length * 1.5));
    const sectionDuration = bars * secPerBar;
    const lineDur = activeLines.length ? sectionDuration / activeLines.length : sectionDuration;

    activeLines.forEach((lineText, idx) => {
      const timeSec = elapsed + idx * lineDur;
      parsedLines.push({
        timeSec,
        tag: sec.tag,
        text: lineText
      });
    });
    elapsed += sectionDuration;
  });

  state.lrcLines = parsedLines;
  state.tapSyncIndex = 0;
  return serializeLrcFromState(song);
}

function serializeLrcFromState(song) {
  const header = [
    `[ti:${song?.title || "Untitled"}]`,
    `[ar:${song?.brief?.artist || "virtual wallflower"}]`,
    `[al:${song?.epName || "Porchlight Static EP"}]`,
    `[by:virtual wallflower WAVEFORM Studio]`,
    ""
  ];
  const body = state.lrcLines.map(item => `${formatLrcTimestamp(item.timeSec)}${item.text}`);
  return [...header, ...body].join("\n");
}

function updateVideoCanvasAspectRatio() {
  const canvas = document.getElementById("lyricVideoCanvas");
  const aspect = document.getElementById("videoAspectSelect")?.value || "9:16";
  if (!canvas) return;
  if (aspect === "9:16") {
    canvas.width = 540;
    canvas.height = 960;
  } else if (aspect === "1:1") {
    canvas.width = 720;
    canvas.height = 720;
  } else {
    canvas.width = 960;
    canvas.height = 540;
  }
}

function initLyricVideoStage() {
  const song = getActiveSong();
  const lrcBox = document.getElementById("lrcOutputTextarea");
  if (lrcBox && song) {
    lrcBox.value = generateLrcForSong(song);
  }
  updateVideoCanvasAspectRatio();
  if (!state.videoAnimFrame) {
    const renderLoop = () => {
      drawLyricVideoCanvasFrame();
      state.videoAnimFrame = requestAnimationFrame(renderLoop);
    };
    state.videoAnimFrame = requestAnimationFrame(renderLoop);
  }
}

function drawWrappedCenteredText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = String(text || "").split(" ");
  let line = "";
  const lines = [];
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    if (ctx.measureText(testLine).width > maxWidth && n > 0) {
      lines.push(line.trim());
      line = words[n] + " ";
    } else {
      line = testLine;
    }
  }
  if (line.trim()) lines.push(line.trim());
  const startY = y - ((lines.length - 1) * lineHeight) / 2;
  lines.forEach((l, i) => {
    ctx.fillText(l, x, startY + i * lineHeight);
  });
}

function drawLyricVideoCanvasFrame() {
  const canvas = document.getElementById("lyricVideoCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  const song = getActiveSong();
  const theme = document.getElementById("videoThemeSelect")?.value || "porchlight";
  const showCrt = document.getElementById("videoCrtToggle")?.checked ?? true;
  const deckAudio = document.getElementById("deckMasterAudio");
  const curTime = deckAudio && !deckAudio.paused ? deckAudio.currentTime : performance.now() / 1000;
  const dur = deckAudio && deckAudio.duration ? deckAudio.duration : 45;

  // 1. Background Gradient by Theme
  const grad = ctx.createLinearGradient(0, 0, w, h);
  if (theme === "neon") {
    grad.addColorStop(0, "#140726");
    grad.addColorStop(0.5, "#1f0b3a");
    grad.addColorStop(1, "#3b0a37");
  } else if (theme === "vhs") {
    grad.addColorStop(0, "#0b0c18");
    grad.addColorStop(0.6, "#1a132b");
    grad.addColorStop(1, "#291826");
  } else {
    grad.addColorStop(0, "#08070f");
    grad.addColorStop(0.5, "#151129");
    grad.addColorStop(1, "#1e1233");
  }
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // 2. Floating Nocturnal Dust Particles
  state.videoParticles.forEach(p => {
    p.y -= p.vy;
    if (p.y < 0) p.y = 1;
    ctx.fillStyle = `rgba(216, 180, 254, ${p.alpha})`;
    ctx.beginPath();
    ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
    ctx.fill();
  });

  // 3. Extract Live Spectrum Bars (or musical idle shimmer)
  const bins = new Uint8Array(32);
  if (state.deckAnalyser && deckAudio && !deckAudio.paused) {
    state.deckAnalyser.getByteFrequencyData(bins);
  } else {
    for (let i = 0; i < 32; i++) {
      bins[i] = Math.floor(85 + 65 * Math.sin(curTime * 3.2 + i * 0.45));
    }
  }

  // 4. Center Vinyl / Cover Disc + Radial or Linear Spectrum
  const cx = w / 2;
  const discY = h * 0.27;
  const radius = Math.min(w, h) * 0.14;

  if (theme === "neon") {
    // Radial 360 spectrum around vinyl disc
    for (let i = 0; i < 32; i++) {
      const angle = (i / 32) * Math.PI * 2 + curTime * 0.4;
      const barLen = (bins[i] / 255) * (radius * 0.85);
      const x1 = cx + Math.cos(angle) * (radius + 8);
      const y1 = discY + Math.sin(angle) * (radius + 8);
      const x2 = cx + Math.cos(angle) * (radius + 12 + barLen);
      const y2 = discY + Math.sin(angle) * (radius + 12 + barLen);
      ctx.strokeStyle = i % 2 === 0 ? "#f472b6" : "#a855f7";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
  }

  // Spinning Vinyl Disc
  ctx.save();
  ctx.translate(cx, discY);
  ctx.rotate(curTime * 0.85);
  ctx.fillStyle = "#120f1d";
  ctx.strokeStyle = "#c084fc";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  const coverImg = document.getElementById("coverArtImg");
  if (coverImg && coverImg.src && !coverImg.classList.contains("hidden")) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(0, 0, radius - 4, 0, Math.PI * 2);
    ctx.clip();
    try {
      ctx.drawImage(coverImg, -radius, -radius, radius * 2, radius * 2);
    } catch (_) {}
    ctx.restore();
  } else {
    ctx.fillStyle = "#a855f7";
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.34, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#09080f";
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  // 5. Artist & Song Title Header
  ctx.textAlign = "center";
  ctx.fillStyle = "#f472b6";
  ctx.font = `bold ${Math.round(w * 0.026)}px sans-serif`;
  ctx.fillText((song?.brief?.artist || "VIRTUAL WALLFLOWER").toUpperCase(), cx, h * 0.08);

  ctx.fillStyle = "#ffffff";
  ctx.font = `bold ${Math.round(w * 0.046)}px sans-serif`;
  ctx.fillText(song?.title || "Untitled Song", cx, h * 0.13);

  // 6. Active Synchronized Karaoke Lyric Lines (Previous, Active, Next)
  const allLines = state.lrcLines.length
    ? state.lrcLines
    : (song?.sections || []).flatMap(s => s.lines.map(l => ({ tag: s.tag, text: l, timeSec: 0 })));

  if (allLines.length) {
    const progress = deckAudio && !deckAudio.paused && dur > 0 ? (curTime % dur) / dur : (curTime % 32) / 32;
    const activeIdx = Math.min(allLines.length - 1, Math.floor(progress * allLines.length));
    const prevLine = activeIdx > 0 ? allLines[activeIdx - 1] : null;
    const curLine = allLines[activeIdx];
    const nextLine = activeIdx < allLines.length - 1 ? allLines[activeIdx + 1] : null;

    // Section Pill
    ctx.fillStyle = "rgba(168, 85, 247, 0.28)";
    const tagText = curLine?.tag || "[Verse]";
    ctx.font = `bold ${Math.round(w * 0.024)}px monospace`;
    ctx.fillStyle = "#d8b4fe";
    ctx.fillText(tagText, cx, h * 0.49);

    // Previous Line (faded above)
    if (prevLine) {
      ctx.fillStyle = "rgba(158, 150, 184, 0.42)";
      ctx.font = `${Math.round(w * 0.032)}px sans-serif`;
      drawWrappedCenteredText(ctx, prevLine.text, cx, h * 0.56, w * 0.82, Math.round(w * 0.04));
    }

    // Current Active Lyric Line (glowing center)
    ctx.save();
    ctx.shadowColor = "#f472b6";
    ctx.shadowBlur = 18;
    ctx.fillStyle = "#ffffff";
    ctx.font = `bold ${Math.round(w * 0.045)}px sans-serif`;
    drawWrappedCenteredText(ctx, `♪ ${curLine.text}`, cx, h * 0.66, w * 0.84, Math.round(w * 0.056));
    ctx.restore();

    // Next Line (upcoming preview below)
    if (nextLine) {
      ctx.fillStyle = "rgba(216, 180, 254, 0.52)";
      ctx.font = `${Math.round(w * 0.032)}px sans-serif`;
      drawWrappedCenteredText(ctx, nextLine.text, cx, h * 0.77, w * 0.82, Math.round(w * 0.04));
    }
  }

  // 7. Bottom Frequency Spectrum Ribbon
  const barAreaW = w * 0.78;
  const startX = (w - barAreaW) / 2;
  const barW = barAreaW / 32 - 3;
  const baseLineY = h * 0.91;

  for (let i = 0; i < 32; i++) {
    const val = (bins[i] / 255) * (h * 0.075);
    ctx.fillStyle = i % 2 === 0 ? "#a855f7" : "#ec4899";
    ctx.fillRect(startX + i * (barW + 3), baseLineY - val, barW, val);
  }

  // 8. Optional VHS Timecode & CRT Scanline Overlay
  if (theme === "vhs" || showCrt) {
    ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
    for (let y = 0; y < h; y += 4) {
      ctx.fillRect(0, y, w, 1.5);
    }
  }
  if (theme === "vhs") {
    ctx.textAlign = "left";
    ctx.fillStyle = "#fde047";
    ctx.font = `bold ${Math.round(w * 0.026)}px monospace`;
    ctx.fillText(`PLAY ▶  ${formatTimeSec(curTime)}`, w * 0.06, h * 0.96);
    ctx.textAlign = "right";
    ctx.fillText(`${song?.bpm || 108} BPM • ${song?.musicalKey || "F#m"}`, w * 0.94, h * 0.96);
  }
}

async function handleRecordLyricVideoClip() {
  const btn = document.getElementById("videoRecordExportBtn");
  const iconEl = document.getElementById("videoRecordBtnIcon");
  const textEl = document.getElementById("videoRecordBtnText");
  const canvas = document.getElementById("lyricVideoCanvas");
  const deckAudio = document.getElementById("deckMasterAudio");

  if (!deckAudio.src && state.trackCrate.length) {
    await playCrateTrackInDeck(state.trackCrate[0].id);
  } else if (deckAudio.paused) {
    setupDeckVisualizer();
    await deckAudio.play().catch(() => {});
  }

  const durChoice = document.getElementById("videoRecordDurationSelect")?.value || "15";
  const recordSeconds = durChoice === "full" ? Math.min(180, Math.ceil(deckAudio.duration || 30)) : Number(durChoice);

  btn.disabled = true;
  iconEl.textContent = "⏳";
  textEl.textContent = `Recording ${recordSeconds}s Video...`;

  try {
    const canvasStream = canvas.captureStream(30);
    // Attach audio stream from WebAudio graph if available
    const ctx = getAudioContext();
    if (!state.videoAudioDest) {
      state.videoAudioDest = ctx.createMediaStreamDestination();
      if (state.deckSourceNode) {
        state.deckSourceNode.connect(state.videoAudioDest);
      }
    }
    const combinedTracks = [
      ...canvasStream.getVideoTracks(),
      ...(state.videoAudioDest ? state.videoAudioDest.stream.getAudioTracks() : [])
    ];
    const combinedStream = new MediaStream(combinedTracks);

    const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9,opus")
      ? "video/webm;codecs=vp9,opus"
      : "video/webm";
    const recorder = new MediaRecorder(combinedStream, { mimeType });
    const chunks = [];
    recorder.ondataavailable = e => {
      if (e.data && e.data.size > 0) chunks.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      const song = getActiveSong();
      const slug = (song?.title || "virtual-wallflower").toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const filename = `${slug}-lyric-video.webm`;

      const dlBox = document.getElementById("recordedVideoDownloadBox");
      const dlLink = document.getElementById("recordedVideoDownloadLink");
      if (dlBox && dlLink) {
        dlLink.href = url;
        dlLink.download = filename;
        dlBox.classList.remove("hidden");
      }

      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      btn.disabled = false;
      iconEl.textContent = "🔴";
      textEl.textContent = `Record ${durChoice === "full" ? "Full" : durChoice + "s"} Clip (.WEBM)`;
      showToast("Lyric Video rendered & downloaded!", "🎬");
    };

    recorder.start();
    setTimeout(() => {
      if (recorder.state === "recording") recorder.stop();
    }, recordSeconds * 1000);
  } catch (err) {
    btn.disabled = false;
    iconEl.textContent = "🔴";
    textEl.textContent = "Record 15s Clip (.WEBM)";
    showToast(`Video capture error: ${err.message}`, "⚠️");
  }
}

function attachHumAndVideoListeners() {
  const gridEl = document.getElementById("humPianoRollGrid");
  if (gridEl) {
    gridEl.addEventListener("click", e => {
      const btn = e.target.closest("button[data-hum-step]");
      if (!btn) return;
      const step = Number(btn.getAttribute("data-hum-step"));
      const deg = Number(btn.getAttribute("data-hum-deg"));
      if (state.humSteps[step] === deg) {
        state.humSteps[step] = -1; // toggle to rest
      } else {
        state.humSteps[step] = deg;
        const { notes } = getScaleMidiNotesForActiveSong();
        if (notes[deg]) playSinglePreviewSynthNote(notes[deg].midi);
      }
      renderHumStudio();
    });
  }

  document.getElementById("humRandomMelodyBtn")?.addEventListener("click", () => {
    generateRandomDreamPopHook();
    showToast("Generated new Dream-Pop synth hook motif!", "🎲");
  });

  document.getElementById("humClearGridBtn")?.addEventListener("click", () => {
    state.humSteps = new Array(16).fill(-1);
    renderHumStudio();
  });

  document.getElementById("humOctaveSelect")?.addEventListener("change", renderHumStudio);
  document.getElementById("humShimmerSlider")?.addEventListener("input", e => {
    document.getElementById("humShimmerVal").textContent = `${e.target.value}%`;
  });
  document.getElementById("humGateSlider")?.addEventListener("input", e => {
    document.getElementById("humGateVal").textContent = `${e.target.value}%`;
  });

  // Live Mic Humming Pitch Capture
  document.getElementById("humRecordBtn")?.addEventListener("click", async () => {
    const iconEl = document.getElementById("humRecordIcon");
    const textEl = document.getElementById("humRecordText");
    const badge = document.getElementById("humDetectedNoteBadge");

    if (state.isRecordingHum && state.humMediaRecorder) {
      state.humMediaRecorder.stop();
      state.isRecordingHum = false;
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const chunks = [];
      const rec = new MediaRecorder(stream);
      state.humMediaRecorder = rec;
      state.isRecordingHum = true;
      iconEl.textContent = "⏹️";
      textEl.textContent = "Stop Humming";
      if (badge) badge.textContent = "Listening to your melody...";

      rec.ondataavailable = e => {
        if (e.data && e.data.size > 0) chunks.push(e.data);
      };
      rec.onstop = async () => {
        stream.getTracks().forEach(t => t.stop());
        state.isRecordingHum = false;
        iconEl.textContent = "🎙️";
        textEl.textContent = "Hum 4 Bars into Mic";
        const blob = new Blob(chunks, { type: rec.mimeType || "audio/webm" });
        const arrayBuf = await blob.arrayBuffer();
        const audioBuf = await getAudioContext().decodeAudioData(arrayBuf.slice(0));
        await extractHumStepsFromAudioBuffer(audioBuf);
        showToast("Converted your hummed melody into a quantized Synth Hook!", "🎶");
      };

      rec.start();
      const song = getActiveSong();
      const barMs = ((60 / (Number(song?.bpm) || 108)) * 16) * 1000;
      setTimeout(() => {
        if (rec.state === "recording") rec.stop();
      }, Math.min(10000, barMs));
    } catch (_) {
      generateRandomDreamPopHook();
      showToast("Mic unavailable in sandbox — generated a Dream-Pop Hook in your key to audition!", "🎹");
    }
  });

  // Upload Hum Audio File -> Extract Melody
  document.getElementById("humFileInput")?.addEventListener("change", async e => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const arrayBuf = await file.arrayBuffer();
      const audioBuf = await getAudioContext().decodeAudioData(arrayBuf.slice(0));
      await extractHumStepsFromAudioBuffer(audioBuf);
      showToast(`Extracted synth melody from "${file.name}"!`, "🎶");
    } catch (err) {
      showToast(`Could not decode audio: ${err.message}`, "⚠️");
    }
  });

  // Audition Synth Hook
  document.getElementById("humPlayHookBtn")?.addEventListener("click", async () => {
    if (state.humActivePlaySource) {
      try { state.humActivePlaySource.stop(); } catch (_) {}
      state.humActivePlaySource = null;
    }
    if (state.humStepTimer) clearInterval(state.humStepTimer);

    const buf = await synthesizeHumHookBuffer(2);
    const ctx = getAudioContext();
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.connect(ctx.destination);
    state.humActivePlaySource = src;

    const song = getActiveSong();
    const stepMs = (60 / (Number(song?.bpm) || 108) / 4) * 1000;
    let stepCounter = 0;
    state.humPlayingStep = 0;
    renderHumStudio();

    state.humStepTimer = setInterval(() => {
      stepCounter++;
      if (stepCounter >= 32) {
        clearInterval(state.humStepTimer);
        state.humPlayingStep = -1;
      } else {
        state.humPlayingStep = stepCounter % 16;
      }
      renderHumStudio();
    }, stepMs);

    src.onended = () => {
      clearInterval(state.humStepTimer);
      state.humPlayingStep = -1;
      renderHumStudio();
    };
    src.start();
  });

  // Layer Synth Hook Over Full Backing Arrangement & Add to Track Crate
  document.getElementById("humLayerToCrateBtn")?.addEventListener("click", async () => {
    const song = getActiveSong();
    if (!song) return;
    showToast("Layering your custom Synth Hook over full arrangement...", "⏳");
    const [backingBuf, hookBuf] = await Promise.all([
      synthesizeMultiSectionTrackBuffer({ song, variant: "A", includeVocalStem: Boolean(state.vocalBuffer) }),
      synthesizeHumHookBuffer(8)
    ]);

    const sr = backingBuf.sampleRate;
    const offline = new OfflineAudioContext(2, backingBuf.length, sr);
    const backSrc = offline.createBufferSource();
    backSrc.buffer = backingBuf;
    backSrc.connect(offline.destination);
    backSrc.start(0);

    // Loop the synth hook across the arrangement
    let offset = 0;
    const loopLen = hookBuf.duration - 1.0;
    while (offset < backingBuf.duration - 2) {
      const hSrc = offline.createBufferSource();
      hSrc.buffer = hookBuf;
      const g = offline.createGain();
      g.gain.value = 0.72;
      hSrc.connect(g);
      g.connect(offline.destination);
      hSrc.start(offset);
      offset += Math.max(2, loopLen);
    }

    const mixed = await offline.startRendering();
    const wavBytes = audioBufferToWav(mixed);
    const id = "hum-mix-" + Date.now();
    const patchName = document.getElementById("humSynthPatchSelect")?.selectedOptions?.[0]?.textContent || "Synth Hook";
    state.trackCrate.unshift({
      id,
      songId: song.id,
      title: `${song.title} (Custom Synth Hook Mix)`,
      badge: `🎶 ${patchName}`,
      style: `${song.sunoStylePrompts?.[0] || "dream-pop"}, custom hum-to-synth lead melody`,
      bpm: song.bpm || 108,
      musicalKey: song.musicalKey || "F# Minor",
      durationSec: Math.round(mixed.duration),
      audioUrl: URL.createObjectURL(new Blob([wavBytes], { type: "audio/wav" })),
      arrayBuffer: wavBytes,
      coverArt: document.getElementById("coverArtImg")?.src || "",
      liked: true,
      createdAt: "Hum-to-Synth Mix"
    });
    renderTrackCrate();
    await playCrateTrackInDeck(id);
    showToast("Added Custom Synth Hook Mix to your Track Crate & started playback!", "💿");
  });

  // Download Hook WAV
  document.getElementById("humDownloadWavBtn")?.addEventListener("click", async () => {
    const buf = await synthesizeHumHookBuffer(4);
    const wavBytes = audioBufferToWav(buf);
    const blob = new Blob([wavBytes], { type: "audio/wav" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "virtual-wallflower-synth-hook.wav";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast("Downloaded 4-bar Synth Hook (.WAV)!", "⬇️");
  });

  // Export Binary MIDI (.MID)
  document.getElementById("humDownloadMidiBtn")?.addEventListener("click", () => {
    const midiBytes = buildMidiFileBytesFromHumSteps();
    const blob = new Blob([midiBytes], { type: "audio/midi" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "virtual-wallflower-hook.mid";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast("Exported Standard MIDI File (.MID) ready for Ableton / Logic / FL Studio!", "🎹");
  });

  // Video & LRC Studio Listeners
  document.getElementById("videoAspectSelect")?.addEventListener("change", updateVideoCanvasAspectRatio);
  document.getElementById("videoPreviewPlayBtn")?.addEventListener("click", () => {
    const deckAudio = document.getElementById("deckMasterAudio");
    if (!deckAudio.src && state.trackCrate.length) {
      playCrateTrackInDeck(state.trackCrate[0].id);
      return;
    }
    setupDeckVisualizer();
    if (deckAudio.paused) {
      deckAudio.play().catch(() => {});
      document.getElementById("videoPreviewPlayBtn").textContent = "⏸ Pause Preview";
    } else {
      deckAudio.pause();
      document.getElementById("videoPreviewPlayBtn").textContent = "▶️ Preview Video + Audio";
    }
  });

  document.getElementById("videoRecordDurationSelect")?.addEventListener("change", e => {
    const v = e.target.value;
    document.getElementById("videoRecordBtnText").textContent =
      v === "full" ? "Record Full Track (.WEBM)" : `Record ${v}s Clip (.WEBM)`;
  });

  document.getElementById("videoRecordExportBtn")?.addEventListener("click", handleRecordLyricVideoClip);

  document.getElementById("regenerateLrcBtn")?.addEventListener("click", () => {
    const song = getActiveSong();
    document.getElementById("lrcOutputTextarea").value = generateLrcForSong(song);
    showToast("Recalculated .LRC timestamps from song BPM & bars!", "⏱️");
  });

  document.getElementById("tapSyncNextLineBtn")?.addEventListener("click", () => {
    const song = getActiveSong();
    if (!song || !state.lrcLines.length) return;
    const deckAudio = document.getElementById("deckMasterAudio");
    const curSec = deckAudio && !deckAudio.paused ? deckAudio.currentTime : 0;
    const idx = state.tapSyncIndex % state.lrcLines.length;
    state.lrcLines[idx].timeSec = curSec;
    state.tapSyncIndex = (idx + 1) % state.lrcLines.length;
    document.getElementById("lrcOutputTextarea").value = serializeLrcFromState(song);
    const nextLine = state.lrcLines[state.tapSyncIndex]?.text || "Done!";
    document.getElementById("tapSyncNextLineBtn").textContent = `👆 Stamped Line ${idx + 1}! Tap Next for: "${nextLine.slice(0, 34)}..."`;
  });

  document.getElementById("copyLrcBtn")?.addEventListener("click", () => {
    const txt = document.getElementById("lrcOutputTextarea")?.value || "";
    navigator.clipboard?.writeText(txt);
    showToast("Copied synced .LRC file to clipboard!", "📋");
  });

  document.getElementById("downloadLrcBtn")?.addEventListener("click", () => {
    const song = getActiveSong();
    const txt = document.getElementById("lrcOutputTextarea")?.value || generateLrcForSong(song);
    const slug = (song?.title || "virtual-wallflower").toLowerCase().replace(/[^a-z0-9]+/g, "-");
    downloadBlob(txt, `${slug}.lrc`, "text/plain;charset=utf-8");
    showToast("Downloaded synced .LRC lyric file!", "⬇️");
  });
}

async function initApp() {
  try {
    const saved = localStorage.getItem("vw_songs_library_v3");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length) {
        state.songs = parsed;
      }
    }
  } catch (_) {}

  if (!state.songs.length) {
    state.songs = JSON.parse(JSON.stringify(STARTER_SONGS));
  }
  state.activeSongId = state.songs[0].id;

  attachEventListeners();
  attachHumAndVideoListeners();
  renderSensoryPalette();
  renderSongList();
  renderActiveSong();
  renderChatMessages();
  lookupRhymes("static");
  await seedStarterTrackCrate();

  await checkBackendStatus();
  if (state.serverAvailable) {
    try {
      const res = await fetch("/api/songs");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.songs) && data.songs.length) {
          state.songs = data.songs;
          state.activeSongId = state.songs[0].id;
          renderSongList();
          renderActiveSong();
        }
      }
    } catch (_) {}
  }
}

document.addEventListener("DOMContentLoaded", initApp);
