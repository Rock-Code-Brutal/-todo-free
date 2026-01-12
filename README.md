# 🔥 ROCK-CODE-BRUTAL - Psychological Warfare To-Do List

> **"Complete or Die"** - A brutal productivity tool that doesn't coddle you.

## 🎯 What Is This?

**Rock-Code-Brutal** is not your typical to-do list. This is a **psychological warfare productivity tool** designed to force you into action through negative gamification, intimidation, and brutal honesty.

Forget gentle reminders. This app will:
- ⚡ **Insult you** when you procrastinate
- 🔥 **Flash red warnings** when tasks become overdue
- 💀 **Tank your survival rate** for incomplete tasks
- 🎯 **Glitch out** when you complete tasks (dopamine hit)
- 🔒 **Tease you** with locked PRO features

Built with **Vanilla JavaScript, HTML, and CSS** for maximum speed and hackability.

---

## ✨ Features (FREE Version)

### Core Functionality
- ✅ **Task Management**: Add, complete, delete tasks
- ⏱️ **Auto-Deadlines**: 30-minute countdown per task
- 💾 **"Encrypted" Storage**: LocalStorage with fake encryption (aesthetic hacking vibes)
- 📱 **Responsive Design**: Works on desktop and mobile

### Brutal UX Features
- 🎭 **Glitch Effects**: RGB split & screen shake on task completion
- 💬 **Random Insults**: 20+ brutal messages when you're slacking
- 📊 **Survival Rate**: Real-time productivity metric
- ⚠️ **5-Level Penalty System**: Visual punishment escalation
- 🚨 **Overdue Warnings**: Blinking red alerts for late tasks

### Terminal Hacker Aesthetic
- 🖥️ **CRT Scanlines**: Retro monitor effect overlay
- ⚡ **Neon Glows**: Green/Red/Cyan terminal colors
- 🔤 **Monospaced Fonts**: Fira Code & Roboto Mono
- 📟 **Command Prompt UI**: Root@brutal:~$ style
- ✨ **Screen Flicker**: Subtle CRT animation

### Locked PRO Features (Teaser)
- 🔒 **Drag & Drop Reordering** (Locked)
- 🔒 **Dark Theme Switcher** (Locked)
- 🔒 **PDF Export** (Locked)
- 🔒 **Cloud Sync** (Locked)

---

## 🚀 Quick Start

### 1. Download or Clone
```bash
git clone https://github.com/yourusername/rock-code-brutal.git
cd rock-code-brutal
```

### 2. Add Sound Effects (Optional)
Download sound files from the sources listed in `assets/sounds/README.md`:
- `complete.mp3` - Task completion
- `delete.mp3` - Task deletion
- `penalty.mp3` - Overdue warning
- `locked.mp3` - Locked feature click
- `type.mp3` - Task addition

**Recommended Sources**:
- [Freesound.org](https://freesound.org/) (Free, CC0 sounds)
- [Zapsplat.com](https://www.zapsplat.com/) (Free SFX library)

### 3. Open in Browser
```bash
# Just open index.html in your browser
# No build process, no npm install, no bullshit
```

Double-click `index.html` or use a local server:
```bash
# Python
python -m http.server 8000

# Node.js (if you have live-server)
npx live-server
```

### 4. Start Getting Insulted
1. Add a task
2. Watch the 30-minute deadline countdown
3. Try to complete it before the insults start flying 🔥

---

## 🎮 How It Works

### Task Lifecycle
```
ADD TASK → 30min deadline starts
   ↓
COMPLETE → Glitch effect + completion taunt
   ↓
SURVIVAL RATE INCREASES
```

### Penalty System Escalation
```
Level 0: Normal (you're safe... for now)
Level 1: Yellow tint (warning)
Level 2: Orange glow (concern)
Level 3: Red flash + insult (danger)
Level 4: Aggressive red + harsh insult (critical)
Level 5: Full-screen assault (game over)
```

### Survival Rate Calculation
```javascript
survivalRate = (completedTasks / totalTasks) * 100 - (overdueTasks * 20)
```

- 100%: Perfect execution
- 80-99%: Acceptable
- 50-79%: Warning zone
- 0-49%: Critical failure

---

## 🛠️ Tech Stack

- **HTML5**: Semantic structure
- **CSS3**: Custom properties, animations, gradients
- **Vanilla JavaScript**: ES6+ classes, modular architecture
- **LocalStorage**: Persistent task storage
- **Google Fonts**: Fira Code, Roboto Mono

### No Dependencies
- ❌ No React
- ❌ No jQuery
- ❌ No build tools
- ✅ Pure, clean, brutal code

---

## 📁 Project Structure

```
rock-code-brutal/
├── index.html              # Main HTML structure
├── style.css               # Brutal styling & animations
├── script.js               # Modular JavaScript
├── README.md               # This file
├── LICENSE                 # MIT License
└── assets/
    └── sounds/
        ├── README.md       # Sound effects guide
        ├── complete.mp3    # (User adds)
        ├── delete.mp3      # (User adds)
        ├── penalty.mp3     # (User adds)
        ├── locked.mp3      # (User adds)
        └── type.mp3        # (User adds)
```

---

## 🎯 Code Architecture

### Modular Classes

**`TaskManager`**
- Core CRUD operations
- Task lifecycle management
- Deadline tracking

**`UIController`**
- All DOM manipulation
- Animation triggers
- Visual updates

**`PenaltySystem`**
- Overdue task detection
- Penalty escalation (5 levels)
- Visual punishment application

**`StorageManager`**
- LocalStorage wrapper
- Fake encryption/decryption
- Data persistence

**`InsultGenerator`**
- Random brutal messages
- Completion taunts
- Motivational threats

**`AudioManager`**
- Sound effect playback
- Volume control
- Audio preloading

---

## 🎨 Customization

### Change Deadline Duration
Edit `script.js`:
```javascript
const CONFIG = {
  TASK_DEADLINE_MINUTES: 30, // Change to 60 for 1 hour
  // ...
};
```

### Adjust Audio Volume
```javascript
const CONFIG = {
  AUDIO_VOLUME: 0.3, // Range: 0.0 - 1.0
  // ...
};
```

### Add More Insults
Edit the `BRUTAL_INSULTS` array in `script.js`:
```javascript
const BRUTAL_INSULTS = [
  "Your custom insult here.",
  // ...
];
```

### Modify Neon Colors
Edit CSS variables in `style.css`:
```css
:root {
  --neon-green: #00ff00;
  --neon-red: #ff0040;
  --neon-cyan: #00ffff;
  /* Change to your preference */
}
```

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] Add task → Verify it appears in list
- [ ] Complete task → See glitch effect
- [ ] Delete task → Hear delete sound
- [ ] Click locked feature → Modal appears
- [ ] Wait for deadline → Penalty kicks in
- [ ] Check responsive design on mobile

### Browser Compatibility
Tested on:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)

---

## 🚨 Known Issues

1. **Audio Autoplay Policy**: Some browsers block audio until user interaction. Click anywhere on the page first.
2. **Sound Files Not Included**: You need to add your own MP3 files (licensing reasons).
3. **LocalStorage Limits**: Can store ~5MB of tasks. You'll never hit this limit unless you're adding novels as tasks.

---

## 🎯 Why This Works (Psychology)

### Negative Reinforcement
- Fear of insults creates urgency
- Red warnings trigger stress response
- Survival rate gamifies productivity

### Visual Satisfaction
- Glitch effects = dopamine on completion
- Terminal aesthetic = "I'm a hacker" feeling
- Progress bar = visible accountability

### FOMO for PRO
- Locked features create desire
- Premium aesthetic makes upgrade aspirational
- "Stay Poor" button = reverse psychology

**This app weaponizes psychology against procrastination.**

---

## 🔮 Roadmap (PRO Version)

The PRO version will include:
- 🎯 **Drag & Drop**: Reorder tasks
- 🌙 **Multiple Themes**: Cyberpunk, Matrix, Synthwave
- 📄 **PDF Export**: Print your tasks
- ☁️ **Cloud Sync**: Cross-device sync
- 🎵 **Custom Sounds**: Upload your own audio
- ⚙️ **Advanced Settings**: Deadline customization, penalty tuning
- 📊 **Analytics**: Weekly/monthly productivity stats
- 🏆 **Achievements**: Unlock brutal badges

---

## 📝 License

MIT License - Do whatever you want with this code. Just don't blame me if it makes you cry.

---

## 🙏 Credits

**Created by**: Rock (Rock-Code-Brutal Project)

**Inspired by**:
- Terminal hackers everywhere
- People who hate soft productivity apps
- The brutal honesty of reality

**Special Thanks**:
- Freesound.org for open-source audio
- The cyberpunk aesthetic community
- Everyone tired of "gentle reminder" apps

---

## 💬 Support

Having issues? Too bad. Debug it yourself, that's the brutal way.

Just kidding. Open an issue on GitHub or:
- Email: youremail@example.com
- Twitter: @yourhandle

---

## ⚡ Final Words

This app doesn't believe in:
- ❌ Gentle encouragement
- ❌ Soft reminders
- ❌ "You got this!" messages
- ❌ Participation trophies

This app believes in:
- ✅ Brutal honesty
- ✅ Psychological pressure
- ✅ Results over feelings
- ✅ Productivity through intimidation

**Welcome to Rock-Code-Brutal. Complete or die. 🔥**

---

## 🔗 Links

- **GitHub**: https://github.com/yourusername/rock-code-brutal
- **Demo**: https://yourusername.github.io/rock-code-brutal
- **PRO Version**: https://gumroad.com/l/todopro

---

*"The only way out is through. Stop reading this README and complete your tasks."*
