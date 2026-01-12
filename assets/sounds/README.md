# 🔥 ROCK-CODE-BRUTAL - Sound Effects Guide

## Overview
This directory contains sound effects for the brutal to-do application. Audio files are optional but highly recommended for the full psychological warfare experience.

## Required Sound Files

Create or download the following files and place them in this directory:

### 1. **complete.mp3**
- **Purpose**: Task completion sound
- **Style**: Mechanical keyboard click or digital success beep
- **Duration**: 0.5-1 second
- **Recommended Sources**:
  - Freesound: [Keyboard Click #341695](https://freesound.org/people/dermotte/sounds/341695/)
  - Zapsplat: Search "mechanical keyboard click"
  - OpenGameArt: Search "success beep"

### 2. **delete.mp3**
- **Purpose**: Task deletion sound
- **Style**: Glitch static or error beep
- **Duration**: 0.5-1 second
- **Recommended Sources**:
  - Freesound: [Digital Glitch #344276](https://freesound.org/people/DiscoveryME/sounds/344276/)
  - Zapsplat: Search "digital error"
  - OpenGameArt: Search "glitch sound"

### 3. **penalty.mp3**
- **Purpose**: Penalty/overdue task warning
- **Style**: Alarm siren or warning buzz
- **Duration**: 1-2 seconds
- **Recommended Sources**:
  - Freesound: [Warning Alarm #331912](https://freesound.org/people/tim.kahn/sounds/331912/)
  - Zapsplat: Search "warning alarm"
  - BBC Sound Effects: Search "alarm"

### 4. **locked.mp3**
- **Purpose**: Locked feature click
- **Style**: Access denied beep
- **Duration**: 0.5-1 second
- **Recommended Sources**:
  - Freesound: [Access Denied #156786](https://freesound.org/people/fins/sounds/156786/)
  - Zapsplat: Search "access denied"
  - OpenGameArt: Search "error sound"

### 5. **type.mp3**
- **Purpose**: Task addition/typing feedback
- **Style**: Keyboard typing sound
- **Duration**: 0.3-0.5 seconds
- **Recommended Sources**:
  - Freesound: [Keyboard Type #366106](https://freesound.org/people/Breviceps/sounds/366106/)
  - Zapsplat: Search "keyboard type"
  - Myinstants: Search "keyboard sound"

## How to Download Sounds

### Option 1: Freesound.org (Recommended)
1. Visit [Freesound.org](https://freesound.org/)
2. Create a free account
3. Search for the sound IDs listed above
4. Download as MP3 (or convert from WAV using online tools)
5. Rename to match the required filenames

### Option 2: Zapsplat.com
1. Visit [Zapsplat.com](https://www.zapsplat.com/)
2. Create a free account
3. Search for the sound types listed above
4. Download and rename

### Option 3: OpenGameArt.org
1. Visit [OpenGameArt.org](https://opengameart.org/)
2. Browse sound effects section
3. Filter for CC0/Public Domain licenses
4. Download and rename

### Option 4: Create Your Own
- Use Audacity (free software) to record or create sounds
- Keep files short and punchy
- Export as MP3 at 128kbps or higher

## License Requirements

Make sure to use sounds with appropriate licenses:
- ✅ **CC0 (Public Domain)**: Can use freely
- ✅ **CC-BY**: Can use with attribution
- ❌ **Copyrighted**: Do not use without permission

## File Format

- **Format**: MP3 (recommended)
- **Bitrate**: 128kbps or higher
- **Sample Rate**: 44.1kHz
- **Channels**: Mono or Stereo

## Testing Sounds

After adding sound files:
1. Open `index.html` in a browser
2. Add a task (should hear `type.mp3`)
3. Complete a task (should hear `complete.mp3`)
4. Delete a task (should hear `delete.mp3`)
5. Click a locked feature (should hear `locked.mp3`)
6. Wait for a task to become overdue (should hear `penalty.mp3`)

## Troubleshooting

### Sounds not playing?
- Check browser console for errors
- Verify filenames match exactly (case-sensitive)
- Ensure files are in correct directory
- Check browser autoplay policy (may need user interaction first)
- Verify audio files are not corrupted

### Volume too loud/quiet?
- Edit `CONFIG.AUDIO_VOLUME` in `script.js` (default: 0.3)
- Range: 0.0 (mute) to 1.0 (max)

## Optional: Create Silent Versions

If you want the app to work without sounds:
1. Create empty/silent MP3 files with the required names
2. Or edit `script.js` and comment out audio play calls
3. The app will function normally without audio

---

**Pro Tip**: Use short, punchy sounds (< 1 second) for best UX. Longer sounds can feel sluggish.

**Brutal Recommendation**: Choose harsh, digital, aggressive sounds to match the brutal aesthetic. Avoid soft or pleasant sounds.
