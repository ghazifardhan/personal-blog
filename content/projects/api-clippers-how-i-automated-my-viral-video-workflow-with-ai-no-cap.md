---
title: "API-Clippers: How I Automated My Viral Video Workflow with AI (No Cap)"
cover: /Screenshot-2026-05-01-at-19.26.03.png
description: "POV: You're tired of spending hours cropping videos and adding subtitles. I built an AI engine that does it in seconds."
featured: true
github: https://github.com/ghazifardhan/api-clippers
live: https://ghazifadil.com
order: 1
stack:
  - Python
status: completed
tags:
  - api
  - backend
draft: false
---

POV: You're a content creator (or just a dev with too many ideas) and you're tired of spending hours in Premiere Pro just to crop a 16:9 video into a TikTok-friendly 9:16 format. Oh, and the subtitles? Total vibe killer to do manually.

I decided to fix that. Say hello to **API-Clippers** — the automated engine that turns long-form content into viral-ready clips while you sleep.

---

## The "Manual Edit" Struggle is Real

If you've ever tried to make a "viral" clip, you know the drill:

1. Find the good part.
2. Crop it to vertical.
3. Add subtitles (and make them look *actually* good).
4. Add a "Hook" caption at the top.
5. Export, wait, repeat.

It's tedious. It's slow. And it's exactly what AI should be doing for us.

---

## What Does API-Clippers Actually Do?

Basically, it's a **FastAPI** server that takes a video file and a few timestamps, then spits out a fully edited clip.

- **AI Subtitles**: Powered by **OpenAI Whisper**. It transcribes the audio and overlays subtitles with perfect timing.
- **Smart 9:16 Cropping**: No more black bars. It crops your video for mobile-first platforms like TikTok, Reels, and Shorts.
- **Hook Overlays**: You can specify a "Hook" (like *"Wait for it..."*) and the engine styles it and slaps it on top.
- **Bulk Mode**: Need 10 clips from one podcast? Send one bulk request and go grab a coffee.

---

## The Tech Under the Hood

I built this using:

- **FastAPI**: For the snappy, asynchronous backend.
- **MoviePy & FFmpeg**: The heavy hitters for video rendering.
- **OpenAI Whisper**: For the state-of-the-art speech-to-text.
- **Pydantic**: To keep the data clean and validated.

---

## Show Me the Code (The API Call)

Triggering a clip is literally one JSON request away:

```json
{
  "clip_title": "The Viral Moment",
  "start_timestamp": "02:15",
  "end_timestamp": "02:45",
  "hook_caption": "Mind-blowing 🤯",
  "source_video": "my_video.mp4"
}
```

The server handles everything else. No UI needed, just pure automation.

---

## What's Next?

This is just the start. I'm looking into adding **Face Tracking** (so the crop always stays on the speaker) and **Auto-Music Overlay**.

If you're tired of the manual grind, this is the way. Local AI, local processing, zero fees. Just vibes and viral clips.

---

Got questions? Or want to see the repo? Drop a comment below. Let's build something cool.
