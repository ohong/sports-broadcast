# sports-broadcast
ESPN for kids: Generate pro-quality play-by-play commentary for youth sports footage. Uses Gemini video understanding + ElevenLabs voice model.

## Overview

This app allows users to upload sports video or paste a link, then uses AI to generate lifelike broadcast-style narration overlaid on the footage. No editing skills required.

## Target Users

Parents of youth athletes (ages 8-16) who film games but want to add professional commentary without manual narration or expensive video editing.

## Core Features

- **Video input**: Upload file or paste YouTube/Vimeo link
- **Sport detection**: Support for basketball, soccer, baseball, tennis, and more
- **Automated analysis**: Computer vision identifies key moments (goals, assists, defensive plays)
- **Natural commentary**: AI generates contextually appropriate narration with proper timing and energy
- **Audio mixing**: Commentary blended with existing audio (crowd noise, coach instructions)
- **Quick turnaround**: Processed video ready within minutes

## Technical Stack

- **Video understanding**: Gemini 2.5 Flash for scene analysis and event detection
- **Text-to-speech**: ElevenLabs v3 for natural-sounding narration with dynamic energy levels
- **Audio processing**: Mix commentary with original audio

## User Flow

1. User uploads video or pastes link
2. User selects sport type
3. AI analyzes footage and identifies key moments
4. AI generates commentary matching action timing
5. User downloads video with commentary, ready to share

## Initial Launch Sports

- Basketball (highest youth participation)
- Soccer (highest youth participation)

## Future Expansion

- Additional sports
- High school athletics highlight reels
- Adult recreational leagues
- Real-time commentary for live-streamed games
