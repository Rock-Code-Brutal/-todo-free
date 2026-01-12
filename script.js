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
  TASK_DEADLINE_MINUTES: 30,
  PENALTY_CHECK_INTERVAL: 30000, // 30 seconds
  MAX_PENALTY_LEVEL: 5,
  STORAGE_KEY: 'brutal_tasks_encrypted',
  AUDIO_VOLUME: 0.3,
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
// AUDIO MANAGER - Sound Effects Controller
// ========================================

class AudioManager {
  constructor() {
    this.sounds = {
      complete: document.getElementById('audioComplete'),
      delete: document.getElementById('audioDelete'),
      penalty: document.getElementById('audioPenalty'),
      locked: document.getElementById('audioLocked'),
      type: document.getElementById('audioType'),
    };
    
    this.setVolume(CONFIG.AUDIO_VOLUME);
  }

  /**
   * Play a sound effect
   */
  play(soundName) {
    const audio = this.sounds[soundName];
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(err => {
        // Audio playback failed (usually due to autoplay policy)
        console.log('Audio playback prevented:', err.message);
      });
    }
  }

  /**
   * Set volume for all sounds
   */
  setVolume(level) {
    Object.values(this.sounds).forEach(audio => {
      if (audio) audio.volume = level;
    });
  }
}

// ========================================
// PENALTY SYSTEM - Brutal Negative Gamification
// ========================================

class PenaltySystem {
  constructor(uiController, audioManager) {
    this.uiController = uiController;
    this.audioManager = audioManager;
    this.penaltyLevel = 0;
    this.maxPenalty = CONFIG.MAX_PENALTY_LEVEL;
  }

  /**
   * Check for overdue tasks and apply penalties
   */
  checkOverdueTasks(tasks) {
    const overdueTasks = tasks.filter(task => {
      if (task.done) return false;
      const deadline = new Date(task.deadline);
      return deadline < new Date();
    });

    if (overdueTasks.length > 0) {
      this.escalatePenalty();
      return overdueTasks.length;
    } else {
      this.resetPenalty();
      return 0;
    }
  }

  /**
   * Escalate penalty level
   */
  escalatePenalty() {
    if (this.penaltyLevel < this.maxPenalty) {
      this.penaltyLevel++;
    }
    
    this.applyVisualPenalty();
    
    // Show insult every other escalation
    if (this.penaltyLevel % 2 === 0) {
      const insult = InsultGenerator.getRandomInsult();
      this.uiController.showInsult(insult);
      this.audioManager.play('penalty');
    }
  }

  /**
   * Reset penalty to zero
   */
  resetPenalty() {
    this.penaltyLevel = 0;
    this.uiController.hidePenalty();
  }

  /**
   * Apply visual penalty based on level
   */
  applyVisualPenalty() {
    const overlay = document.getElementById('penaltyOverlay');
    
    switch(this.penaltyLevel) {
      case 1:
        // Subtle warning
        overlay.style.backgroundColor = 'rgba(255, 204, 0, 0.05)';
        break;
      case 2:
        // Yellow flash
        overlay.style.backgroundColor = 'rgba(255, 204, 0, 0.1)';
        break;
      case 3:
        // Orange warning
        overlay.style.backgroundColor = 'rgba(255, 102, 0, 0.15)';
        overlay.classList.add('active');
        break;
      case 4:
        // Red danger
        overlay.style.backgroundColor = 'rgba(255, 0, 64, 0.2)';
        overlay.classList.add('active');
        break;
      case 5:
        // Maximum penalty
        overlay.style.backgroundColor = 'rgba(255, 0, 64, 0.3)';
        overlay.classList.add('active');
        break;
    }
  }
}

// ========================================
// UI CONTROLLER - All UI Updates & Animations
// ========================================

class UIController {
  constructor(audioManager) {
    this.audioManager = audioManager;
    this.elements = {
      taskList: document.getElementById('taskList'),
      taskInput: document.getElementById('taskInput'),
      taskCount: document.getElementById('taskCount'),
      emptyState: document.getElementById('emptyState'),
      survivalValue: document.getElementById('survivalValue'),
      progressFill: document.getElementById('progressFill'),
      progressPercentage: document.getElementById('progressPercentage'),
      statusText: document.getElementById('statusText'),
      penaltyOverlay: document.getElementById('penaltyOverlay'),
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
    
    // Check if overdue
    const deadline = new Date(task.deadline);
    const now = new Date();
    const isOverdue = deadline < now && !task.done;
    
    if (isOverdue) {
      li.classList.add('overdue');
    }
    
    // Task content
    const content = document.createElement('div');
    content.className = 'task-content';
    content.onclick = () => window.taskManager && taskManager.toggleTask(index);
    
    const text = document.createElement('div');
    text.className = 'task-text';
    text.textContent = task.text;
    
    const meta = document.createElement('div');
    meta.className = 'task-meta';
    
    // Deadline display
    const deadlineSpan = document.createElement('span');
    deadlineSpan.className = 'task-deadline';
    const timeLeft = this.getTimeLeftString(deadline);
    deadlineSpan.textContent = `⏱ ${timeLeft}`;
    
    // Color code based on urgency
    const minutesLeft = (deadline - now) / 60000;
    if (minutesLeft < 0) {
      deadlineSpan.classList.add('critical');
      deadlineSpan.textContent = `⏱ OVERDUE`;
    } else if (minutesLeft < 10) {
      deadlineSpan.classList.add('critical');
    } else if (minutesLeft < 20) {
      deadlineSpan.classList.add('warning');
    }
    
    meta.appendChild(deadlineSpan);
    content.appendChild(text);
    content.appendChild(meta);
    
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
   * Get time left as readable string
   */
  getTimeLeftString(deadline) {
    const now = new Date();
    const diff = deadline - now;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 0) return 'OVERDUE';
    if (minutes < 60) return `${minutes}m left`;
    
    const hours = Math.floor(minutes / 60);
    return `${hours}h ${minutes % 60}m left`;
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
   * Hide penalty overlay
   */
  hidePenalty() {
    const overlay = this.elements.penaltyOverlay;
    overlay.style.backgroundColor = 'rgba(255, 0, 64, 0)';
    overlay.classList.remove('active');
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
  constructor(uiController, audioManager, penaltySystem) {
    this.tasks = StorageManager.load();
    this.uiController = uiController;
    this.audioManager = audioManager;
    this.penaltySystem = penaltySystem;
    
    // Initialize
    this.render();
    this.startPenaltyTimer();
    
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
    
    // Calculate deadline
    const deadline = new Date();
    deadline.setMinutes(deadline.getMinutes() + CONFIG.TASK_DEADLINE_MINUTES);
    
    const newTask = {
      text: text,
      done: false,
      deadline: deadline.toISOString(),
      createdAt: new Date().toISOString(),
    };
    
    this.tasks.push(newTask);
    this.save();
    this.render();
    this.uiController.clearInput();
    this.audioManager.play('type');
    
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
      this.audioManager.play('complete');
      
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
    this.audioManager.play('delete');
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
    
    // Survival rate calculation
    const overdueTasks = this.tasks.filter(task => {
      if (task.done) return false;
      const deadline = new Date(task.deadline);
      return deadline < new Date();
    }).length;
    
    let survivalRate = 100;
    if (total > 0) {
      survivalRate = ((completed / total) * 100) - (overdueTasks * 20);
      survivalRate = Math.max(0, Math.min(100, survivalRate));
    }
    
    this.uiController.updateSurvivalRate(survivalRate);
    this.uiController.updateProgressBar(completed, total);
  }

  /**
   * Start penalty check timer
   */
  startPenaltyTimer() {
    setInterval(() => {
      const overdueCount = this.penaltySystem.checkOverdueTasks(this.tasks);
      if (overdueCount > 0) {
        this.render(); // Update UI to show overdue status
      }
    }, CONFIG.PENALTY_CHECK_INTERVAL);
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
  
  // Play locked sound
  if (window.audioManager) {
    audioManager.play('locked');
  }
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
});

// ========================================
// APP INITIALIZATION
// ========================================

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Create instances
  const audioManager = new AudioManager();
  const uiController = new UIController(audioManager);
  const penaltySystem = new PenaltySystem(uiController, audioManager);
  const taskManager = new TaskManager(uiController, audioManager, penaltySystem);
  
  // Make globally accessible
  window.audioManager = audioManager;
  window.taskManager = taskManager;
  window.uiController = uiController;
  window.penaltySystem = penaltySystem;
  
  // Log startup
  console.log('%c🔥 ROCK-CODE-BRUTAL INITIALIZED', 'color: #00ff00; font-size: 16px; font-weight: bold;');
  console.log('%cStorage: Encrypted | Penalty System: Active', 'color: #00ffff; font-size: 12px;');
});

// ========================================
// EXPORT FOR TESTING (if needed)
// ========================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    TaskManager,
    UIController,
    PenaltySystem,
    StorageManager,
    InsultGenerator,
    AudioManager,
  };
}
