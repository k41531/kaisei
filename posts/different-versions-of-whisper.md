---
aliases: "Different Versions of Whisper"
title: "Different Versions of Whisper"
tags: murmur
created: "2025-02-12 21:17"
updated: "2025-02-12 21:39"
published_at: "2025-02-12 21:39"
---

# Different Versions of Whisper

I wanted to transcribe a podcast for study, so I used Whisper.

Whisper has several variations. The most popular variant is probably OpenAI's API-based Whisper, but OpenAI has also released an open-source version: openai/whisper.

This open-source version is also popular. I've used it before, and it was good. I think the next well-known variant is whisper.cpp, which was developed by the creator of llama.cpp. On the other hand, faster-whisper is known for being faster than the original.

Today, while researching which version of Whisper is best for my M1 Mac as I wrote a transcription script, I found a new one: mlx-whisper. MLX is a machine learning framework optimized for Apple Silicon.

I haven't tested it myself, but it seems to be faster than the others. So, I’m considering using mlx-whisper when running Whisper on Apple Silicon