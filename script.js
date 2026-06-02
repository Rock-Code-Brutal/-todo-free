/* ========================================
   ROCK-CODE-BRUTAL JAVASCRIPT
   Psychological Warfare To-Do System
   Modular Architecture
   ======================================== */

'use strict';

// ========================================
// CONSTANTS & CONFIG
// ========================================

const CONFIG = {
  STORAGE_KEY: 'brutal_tasks_encrypted',
};

const BRUTAL_INSULTS = [
  "PATHETIC. Your ancestors are disappointed.",
  "Still procrastinating? Grow up.",
  "This is why you're stuck.",
  "DO SOMETHING. ANYTHING.",
  "Your future self hates you.",
  "WEAK. MOVE FASTER.",
  "Timer's ticking. Your life isn't.",
  "This task won't complete itself, genius.",
  "Laziness is a disease. You're infected.",
  "Your excuses are worthless.",
  "STOP WASTING TIME.",
  "Mediocrity loves company. Leave it.",
  "Winners don't procrastinate. Losers do.",
  "The clock doesn't care about your feelings.",
  "ACT NOW OR REGRET LATER.",
  "You're better than this. PROVE IT.",
  "Deadline approaching. Moving yet?",
  "Your comfort zone is a prison.",
  "BREAK THE CYCLE. COMPLETE IT.",
  "This is embarrassing. Do better.",
];

const COMPLETION_TAUNTS = [
  "FINALLY. Took you long enough.",
  "One down. Don't celebrate yet.",
  "Good. Now do the rest.",
  "About time.",
  "Keep this pace or fail.",
  "ACCEPTABLE. Continue.",
  "Victory tastes better when you're fast.",
  "That's the spirit. MORE.",
];

// ========================================
// STORAGE MANAGER - Encrypted Storage Simulation
// ========================================

class StorageManager {
  /**
   * Save tasks with "encryption" (cosmetic for hacker aesthetic)
   */
  static save(tasks) {
    try {
      const encrypted = this.encrypt(tasks);
      localStorage.setItem(CONFIG.STORAGE_KEY, encrypted);
      return true;
    } catch (error) {
      console.error('Storage failed:', error);
      return false;
    }
  }

  /**
   * Load and "decrypt" tasks
   */
  static load() {
    try {
      const encrypted = localStorage.getItem(CONFIG.STORAGE_KEY);
      if (!encrypted) return [];
      return this.decrypt(encrypted);
    } catch (error) {
      console.error('Load failed:', error);
      return [];
    }
  }

  /**
   * Fake encryption - reversed base64 for aesthetic
   */
  static encrypt(data) {
    const jsonStr = JSON.stringify(data);
    const base64 = btoa(unescape(encodeURIComponent(jsonStr)));
    return base64.split('').reverse().join('');
  }

  /**
   * Fake decryption
   */
  static decrypt(encrypted) {
    try {
      const reversed = encrypted.split('').reverse().join('');
      const jsonStr = decodeURIComponent(escape(atob(reversed)));
      return JSON.parse(jsonStr);
    } catch {
      return [];
    }
  }

  /**
   * Clear all storage
   */
  static clear() {
    localStorage.removeItem(CONFIG.STORAGE_KEY);
  }
}

// ========================================
// INSULT GENERATOR - Random Brutal Messages
// ========================================

class InsultGenerator {
  static getRandomInsult() {
    return BRUTAL_INSULTS[Math.floor(Math.random() * BRUTAL_INSULTS.length)];
  }

  static getCompletionTaunt() {
    return COMPLETION_TAUNTS[Math.floor(Math.random() * COMPLETION_TAUNTS.length)];
  }

  static getMotivationalThreat() {
    const threats = [
      "TICK TOCK. TIME'S RUNNING OUT.",
      "YOUR SURVIVAL RATE IS DROPPING.",
      "FAILURE IS NOT AN OPTION.",
      "COMPLETE TASKS OR FACE CONSEQUENCES.",
      "THE SYSTEM IS WATCHING.",
    ];
    return threats[Math.floor(Math.random() * threats.length)];
  }
}

// ========================================
// UI CONTROLLER - All UI Updates & Animations
// ========================================

class UIController {
  constructor() {
    this.elements = {
      taskList: document.getElementById('taskList'),
      taskInput: document.getElementById('taskInput'),
      taskCount: document.getElementById('taskCount'),
      emptyState: document.getElementById('emptyState'),
      survivalValue: document.getElementById('survivalValue'),
      progressFill: document.getElementById('progressFill'),
      progressPercentage: document.getElementById('progressPercentage'),
      statusText: document.getElementById('statusText'),
      insultMessage: document.getElementById('insultMessage'),
    };
  }

  /**
   * Render all tasks to the UI
   */
  renderTasks(tasks) {
    this.elements.taskList.innerHTML = '';
    
    if (tasks.length === 0) {
      this.elements.emptyState.classList.add('visible');
      this.elements.taskCount.textContent = '0 TASKS';
      return;
    }
    
    this.elements.emptyState.classList.remove('visible');
    this.elements.taskCount.textContent = `${tasks.length} TASK${tasks.length !== 1 ? 'S' : ''}`;
    
    tasks.forEach((task, index) => {
      const li = this.createTaskElement(task, index);
      this.elements.taskList.appendChild(li);
    });
  }

  /**
   * Create a single task element
   */
  createTaskElement(task, index) {
    const li = document.createElement('li');
    li.className = 'task-item';
    
    if (task.done) {
      li.classList.add('completed');
    }
    
    // Task content
    const content = document.createElement('div');
    content.className = 'task-content';
    content.onclick = () => window.taskManager && taskManager.toggleTask(index);
    
    const text = document.createElement('div');
    text.className = 'task-text';
    text.textContent = task.text;
    
    content.appendChild(text);
    
    // Task actions
    const actions = document.createElement('div');
    actions.className = 'task-actions';
    
    const completeBtn = document.createElement('button');
    completeBtn.className = 'task-btn complete-btn';
    completeBtn.textContent = task.done ? '↺' : '✓';
    completeBtn.onclick = (e) => {
      e.stopPropagation();
      window.taskManager && taskManager.toggleTask(index);
    };
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'task-btn delete-btn';
    deleteBtn.textContent = '✕';
    deleteBtn.onclick = (e) => {
      e.stopPropagation();
      window.taskManager && taskManager.deleteTask(index);
    };
    
    actions.appendChild(completeBtn);
    actions.appendChild(deleteBtn);
    
    li.appendChild(content);
    li.appendChild(actions);
    
    return li;
  }

  /**
   * Update survival rate display
   */
  updateSurvivalRate(rate) {
    const valueElement = this.elements.survivalValue;
    valueElement.textContent = `${Math.round(rate)}%`;
    
    // Color coding
    valueElement.classList.remove('warning', 'danger');
    if (rate < 50) {
      valueElement.classList.add('danger');
    } else if (rate < 80) {
      valueElement.classList.add('warning');
    }
  }

  /**
   * Update progress bar
   */
  updateProgressBar(completed, total) {
    const percentage = total === 0 ? 100 : (completed / total) * 100;
    
    this.elements.progressFill.style.width = `${percentage}%`;
    this.elements.progressPercentage.textContent = `${completed}/${total}`;
    
    // Color coding
    this.elements.progressFill.classList.remove('warning', 'danger');
    if (percentage < 50) {
      this.elements.progressFill.classList.add('danger');
    } else if (percentage < 80) {
      this.elements.progressFill.classList.add('warning');
    }
  }

  /**
   * Trigger glitch effect on completion
   */
  triggerGlitch(element) {
    const title = document.querySelector('.glitch-text');
    if (title) {
      title.classList.add('active');
      setTimeout(() => title.classList.remove('active'), 500);
    }
    
    if (element) {
      element.classList.add('glitch-effect');
      setTimeout(() => element.classList.remove('glitch-effect'), 500);
    }
  }

  /**
   * Show insult message
   */
  showInsult(message) {
    const insultElement = this.elements.insultMessage;
    insultElement.textContent = message;
    insultElement.classList.add('show');
    
    setTimeout(() => {
      insultElement.classList.remove('show');
    }, 3000);
  }

  /**
   * Clear input field
   */
  clearInput() {
    this.elements.taskInput.value = '';
    this.elements.taskInput.focus();
  }

  /**
   * Update status text
   */
  updateStatus(text) {
    this.elements.statusText.textContent = text;
  }
}

// ========================================
// TASK MANAGER - Core Task CRUD Operations
// ========================================

class TaskManager {
  constructor(uiController) {
    this.tasks = StorageManager.load();
    this.uiController = uiController;
    
    // Initialize
    this.render();
    
    // Add enter key listener
    document.getElementById('taskInput').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.addTask();
      }
    });
  }

  /**
   * Add a new task
   */
  addTask() {
    const input = document.getElementById('taskInput');
    const text = input.value.trim();
    
    if (text === '') return;
    
    const newTask = {
      text: text,
      done: false,
      createdAt: new Date().toISOString(),
    };
    
    this.tasks.push(newTask);
    this.save();
    this.render();
    this.uiController.clearInput();
    
    this.uiController.updateStatus('TASK ADDED');
    setTimeout(() => this.uiController.updateStatus('SYSTEM ACTIVE'), 2000);
  }

  /**
   * Toggle task completion
   */
  toggleTask(index) {
    const task = this.tasks[index];
    task.done = !task.done;
    
    if (task.done) {
      // Task completed - trigger glitch and taunt
      const taskElement = document.querySelectorAll('.task-item')[index];
      this.uiController.triggerGlitch(taskElement);
      
      
      // Random completion taunt
      if (Math.random() > 0.5) {
        const taunt = InsultGenerator.getCompletionTaunt();
        this.uiController.showInsult(taunt);
      }
    }
    
    this.save();
    this.render();
  }

  /**
   * Delete a task
   */
  deleteTask(index) {
    this.tasks.splice(index, 1);
    this.save();
    this.render();
    
    this.uiController.updateStatus('TASK DELETED');
    setTimeout(() => this.uiController.updateStatus('SYSTEM ACTIVE'), 2000);
  }

  /**
   * Save tasks to storage
   */
  save() {
    StorageManager.save(this.tasks);
  }

  /**
   * Render UI
   */
  render() {
    this.uiController.renderTasks(this.tasks);
    this.updateMetrics();
  }

  /**
   * Update metrics (survival rate, progress)
   */
  updateMetrics() {
    const total = this.tasks.length;
    const completed = this.tasks.filter(t => t.done).length;
    
    let survivalRate = total === 0 ? 100 : (completed / total) * 100;
    
    this.uiController.updateSurvivalRate(survivalRate);
    this.uiController.updateProgressBar(completed, total);
  }

  /**
   * Get completion rate
   */
  getCompletionRate() {
    if (this.tasks.length === 0) return 100;
    const completed = this.tasks.filter(t => t.done).length;
    return (completed / this.tasks.length) * 100;
  }
}

// ========================================
// UPGRADE MODAL FUNCTIONS
// ========================================

function showUpgradeModal(featureName) {
  const modal = document.getElementById('upgradeModal');
  const modalText = document.getElementById('modalText');
  
  modalText.textContent = `"${featureName}" is locked in FREE version.`;
  modal.classList.add('show');
}

function closeUpgradeModal() {
  const modal = document.getElementById('upgradeModal');
  modal.classList.remove('show');
}

// Close modal on outside click
document.addEventListener('click', (e) => {
  const modal = document.getElementById('upgradeModal');
  if (e.target === modal) {
    closeUpgradeModal();
  }
  const paymentModal = document.getElementById('paymentModal');
  if (e.target === paymentModal) {
    closePaymentModal();
  }
});

// ========================================
// PAYMENT MODAL FUNCTIONS
// ========================================

function showPaymentModal() {
  const modal = document.getElementById('paymentModal');
  modal.classList.add('show');
}

function closePaymentModal() {
  const modal = document.getElementById('paymentModal');
  modal.classList.remove('show');
}

function copyAccountNumber() {
  const accountEl = document.getElementById('paymentAccount');
  const text = accountEl.textContent.trim();
  
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showCopyFeedback('REKENING DI-COPY!');
    }).catch(() => {
      fallbackCopy(text);
    });
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  showCopyFeedback('REKENING DI-COPY!');
}

function showCopyFeedback(msg) {
  const insult = document.getElementById('insultMessage');
  insult.textContent = msg;
  insult.classList.add('show');
  setTimeout(() => insult.classList.remove('show'), 2000);
}

// ========================================
// PRO UNLOCK SYSTEM - Name-based Permanent Code
// ========================================

const PRO_SALT = 'brut4l_r0ck_s3cr3t_2026';

function generateUnlockCode(name) {
  const input = PRO_SALT + name.toLowerCase().replace(/\s+/g, '');
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const c = input.charCodeAt(i);
    hash = ((hash << 7) - hash) + c;
    hash |= 0;
  }
  return Math.abs(hash).toString(36).toUpperCase().slice(0, 8);
}

function verifyUnlockCode() {
  const nameInput = document.getElementById('unlockName');
  const codeInput = document.getElementById('unlockCode');
  const statusEl = document.getElementById('unlockStatus');
  const name = nameInput.value.trim();
  const code = codeInput.value.trim().toUpperCase();

  if (!name || !code) {
    statusEl.textContent = 'ISI NAMA & KODE DULU!';
    statusEl.style.color = 'var(--neon-red)';
    return;
  }

  const expected = generateUnlockCode(name);
  if (code === expected) {
    localStorage.setItem('brutal_pro_unlock', JSON.stringify({ name, code }));
    statusEl.textContent = '✅ PRO UNLOCKED! SELAMAT KAMU RESMI BRUTAL.';
    statusEl.style.color = 'var(--neon-green)';
    applyProUnlock();
    setTimeout(() => closePaymentModal(), 500);
  } else {
    statusEl.textContent = '❌ KODE SALAH! LO BELUM LAYAK PRO.';
    statusEl.style.color = 'var(--neon-red)';
  }
}

function checkUnlockState() {
  try {
    const data = JSON.parse(localStorage.getItem('brutal_pro_unlock'));
    if (data && data.name && data.code) {
      const expected = generateUnlockCode(data.name);
      if (data.code === expected) {
        document.getElementById('unlockName').value = data.name;
        document.getElementById('unlockCode').value = data.code;
        applyProUnlock();
        return true;
      }
    }
  } catch {}
  return false;
}

function applyProUnlock() {
  document.getElementById('lockedProSection').style.display = 'none';
  document.getElementById('unlockSection').style.display = 'none';
  document.getElementById('unlockedProSection').style.display = 'block';
  document.getElementById('proBadge').textContent = 'PRO';
  document.getElementById('proBadge').style.color = '#00ff00';
  document.getElementById('proBadge').style.textShadow = '0 0 5px #00ff00';
  document.querySelector('.subtitle').textContent = 'COMPLETE OR DIE // PRO EDITION';

  window.isProUnlocked = true;

  // Enable drag & drop on tasks
  enableDragDrop();
}

// ========================================
// PRO FEATURES
// ========================================

const PRO_THEMES = {
  default: {
    '--terminal-bg': '#0a0a0a',
    '--terminal-secondary': '#121212',
    '--terminal-tertiary': '#1a1a1a',
    '--neon-green': '#00ff00',
    '--neon-red': '#ff0040',
    '--neon-cyan': '#00ffff',
    '--neon-yellow': '#ffff00',
    '--neon-orange': '#ff6600',
    '--text-primary': '#e0e0e0',
    '--text-secondary': '#a0a0a0',
    '--text-dim': '#606060',
    '--border-glow': 'rgba(0, 255, 0, 0.3)',
  },
  night: {
    '--terminal-bg': '#0d1117',
    '--terminal-secondary': '#161b22',
    '--terminal-tertiary': '#21262d',
    '--neon-green': '#58a6ff',
    '--neon-red': '#f85149',
    '--neon-cyan': '#79c0ff',
    '--neon-yellow': '#d29922',
    '--neon-orange': '#db6d28',
    '--text-primary': '#c9d1d9',
    '--text-secondary': '#8b949e',
    '--text-dim': '#484f58',
    '--border-glow': 'rgba(88, 166, 255, 0.3)',
  },
  cyberpunk: {
    '--terminal-bg': '#0a0015',
    '--terminal-secondary': '#12002a',
    '--terminal-tertiary': '#1c0040',
    '--neon-green': '#ff00ff',
    '--neon-red': '#ff0080',
    '--neon-cyan': '#00ffff',
    '--neon-yellow': '#ffff00',
    '--neon-orange': '#ff6600',
    '--text-primary': '#e0d0ff',
    '--text-secondary': '#a080d0',
    '--text-dim': '#604080',
    '--border-glow': 'rgba(255, 0, 255, 0.3)',
  },
  blood: {
    '--terminal-bg': '#1a0000',
    '--terminal-secondary': '#240000',
    '--terminal-tertiary': '#2e0000',
    '--neon-green': '#ff0000',
    '--neon-red': '#ff6600',
    '--neon-cyan': '#ff4444',
    '--neon-yellow': '#ff8800',
    '--neon-orange': '#ff4400',
    '--text-primary': '#ffcccc',
    '--text-secondary': '#cc8888',
    '--text-dim': '#884444',
    '--border-glow': 'rgba(255, 0, 0, 0.3)',
  },
};

class ProFeatures {
  static toggleTheme() {
    const panel = document.getElementById('themePanel');
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
  }

  static setTheme(name) {
    const theme = PRO_THEMES[name];
    if (!theme) return;
    const root = document.documentElement;
    Object.entries(theme).forEach(([key, val]) => {
      root.style.setProperty(key, val);
    });
    localStorage.setItem('brutal_pro_theme', name);
    document.querySelectorAll('.theme-option').forEach(el => {
      el.classList.toggle('active', el.dataset.theme === name);
    });
  }

  static loadTheme() {
    const saved = localStorage.getItem('brutal_pro_theme');
    if (saved && PRO_THEMES[saved]) {
      ProFeatures.setTheme(saved);
    }
  }

  static exportPDF() {
    const tasks = window.taskManager.tasks;
    const completed = tasks.filter(t => t.done).length;
    const total = tasks.length;
    const rate = total === 0 ? 100 : Math.round((completed / total) * 100);

    const win = window.open('', '_blank');
    win.document.write(`<!DOCTYPE html>
<html><head><title>To-Do Brutal PRO - Export</title>
<style>
  body { font-family: 'Courier New', monospace; padding: 40px; color: #222; }
  h1 { color: #c00; font-size: 24px; border-bottom: 2px solid #c00; padding-bottom: 10px; }
  .stats { margin: 20px 0; padding: 15px; background: #f5f5f5; border-left: 4px solid #c00; }
  .task { padding: 10px 0; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; }
  .task.done { color: #999; text-decoration: line-through; }
  .index { color: #999; margin-right: 10px; }
  .footer { margin-top: 30px; font-size: 12px; color: #999; text-align: center; }
</style></head>
<body>
<h1>🔥 TO-DO BRUTAL PRO - MISSION REPORT</h1>
<div class="stats"><strong>Survival Rate:</strong> ${rate}% | <strong>Completed:</strong> ${completed}/${total}</div>
${tasks.map((t, i) => `<div class="task ${t.done ? 'done' : ''}"><span><span class="index">#${i + 1}</span>${t.text}</span><span>${t.done ? '✓' : '○'}</span></div>`).join('')}
<div class="footer">Generated by To-Do Brutal PRO — ${new Date().toLocaleDateString()}</div>
<script>window.print();<\/script>
</body></html>`);
    win.document.close();
  }

  static exportJSON() {
    const data = JSON.stringify(window.taskManager.tasks, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `brutal-tasks-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  static importJSON() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target.result);
          if (!Array.isArray(data)) throw new Error();
          window.taskManager.tasks = data;
          window.taskManager.save();
          window.taskManager.render();
          const status = document.getElementById('unlockStatus');
          status.textContent = '✅ DATA DI-IMPORT!';
          status.style.color = 'var(--neon-green)';
        } catch {
          const status = document.getElementById('unlockStatus');
          status.textContent = '❌ FILE INVALID!';
          status.style.color = 'var(--neon-red)';
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }
}

// ========================================
// DRAG & DROP (PRO only)
// ========================================

function enableDragDrop() {
  const list = document.getElementById('taskList');
  let dragIndex = null;

  list.addEventListener('dragstart', (e) => {
    const li = e.target.closest('.task-item');
    if (!li) return;
    dragIndex = parseInt(li.dataset.index);
    li.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
  });

  list.addEventListener('dragend', (e) => {
    const li = e.target.closest('.task-item');
    if (li) li.classList.remove('dragging');
    document.querySelectorAll('.task-item').forEach(el => el.classList.remove('drag-over'));
  });

  list.addEventListener('dragover', (e) => {
    e.preventDefault();
    const li = e.target.closest('.task-item');
    if (li && !li.classList.contains('dragging')) {
      li.classList.add('drag-over');
    }
  });

  list.addEventListener('dragleave', (e) => {
    const li = e.target.closest('.task-item');
    if (li) li.classList.remove('drag-over');
  });

  list.addEventListener('drop', (e) => {
    e.preventDefault();
    const li = e.target.closest('.task-item');
    if (!li || dragIndex === null) return;
    const toIndex = parseInt(li.dataset.index);
    li.classList.remove('drag-over');
    if (dragIndex !== toIndex) {
      const [moved] = window.taskManager.tasks.splice(dragIndex, 1);
      window.taskManager.tasks.splice(toIndex, 0, moved);
      window.taskManager.save();
      window.taskManager.render();
    }
    dragIndex = null;
  });
}

// ========================================
// OVERRIDE renderTasks to add drag support when PRO
// ========================================

const _origRenderTasks = UIController.prototype.renderTasks;
UIController.prototype.renderTasks = function(tasks) {
  _origRenderTasks.call(this, tasks);
  if (window.isProUnlocked) {
    document.querySelectorAll('.task-item').forEach(el => {
      el.draggable = true;
      el.style.cursor = 'grab';
    });
  }
};

// ========================================
// APP INITIALIZATION
// ========================================

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Create instances
  const uiController = new UIController();
  const taskManager = new TaskManager(uiController);
  
  // Make globally accessible
  window.taskManager = taskManager;
  window.uiController = uiController;
  window.proFeatures = ProFeatures;
  window.verifyUnlockCode = verifyUnlockCode;

  // Check for existing unlock
  checkUnlockState();
  ProFeatures.loadTheme();
  
  // Log startup
  console.log('%c🔥 ROCK-CODE-BRUTAL INITIALIZED', 'color: #00ff00; font-size: 16px; font-weight: bold;');
  console.log('%cStorage: Encrypted | System: Active', 'color: #00ffff; font-size: 12px;');
});

// ========================================
// EXPORT FOR TESTING (if needed)
// ========================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    TaskManager,
    UIController,
    StorageManager,
    InsultGenerator,
  };
}
