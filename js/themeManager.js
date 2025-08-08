/* 
   Theme Manager Module
   ====================
   Handles theme switching between light and dark modes with persistence.
*/

class ThemeManager {
  constructor() {
    this.currentTheme = 'light';
    this.observers = [];
    this.storageKey = 'portfolio_theme';
  }

  /**
   * Initialize theme manager
   */
  init() {
    // Load saved theme or detect system preference
    this.loadTheme();
    
    // Set up theme toggle button
    this.setupThemeToggle();
    
    // Listen for system theme changes
    this.setupSystemThemeListener();
    
    Utils.logger.info('Theme manager initialized', { theme: this.currentTheme });
  }

  /**
   * Load theme from storage or system preference
   */
  loadTheme() {
    // Try to load from localStorage first
    const savedTheme = Utils.storage.get(this.storageKey);
    
    if (savedTheme) {
      this.currentTheme = savedTheme;
    } else {
      // Detect system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.currentTheme = prefersDark ? 'dark' : 'light';
    }
    
    this.applyTheme(this.currentTheme);
  }

  /**
   * Apply theme to document
   * @param {string} theme - Theme to apply ('light' or 'dark')
   */
  applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    this.currentTheme = theme;
    
    // Save to localStorage
    Utils.storage.set(this.storageKey, theme);
    
    // Notify observers
    this.notifyObservers(theme);
    
    Utils.logger.info(`Applied ${theme} theme`);
  }

  /**
   * Toggle between light and dark themes
   */
  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(newTheme);
  }

  /**
   * Get current theme
   * @returns {string} Current theme
   */
  getCurrentTheme() {
    return this.currentTheme;
  }

  /**
   * Set up theme toggle button
   */
  setupThemeToggle() {
    const toggleButton = document.getElementById('themeToggle');
    if (toggleButton) {
      toggleButton.addEventListener('click', () => {
        this.toggleTheme();
      });
      
      // Add keyboard support
      toggleButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggleTheme();
        }
      });
    }
  }

  /**
   * Listen for system theme changes
   */
  setupSystemThemeListener() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    mediaQuery.addEventListener('change', (e) => {
      // Only auto-switch if user hasn't manually set a preference
      const savedTheme = Utils.storage.get(this.storageKey);
      if (!savedTheme) {
        const newTheme = e.matches ? 'dark' : 'light';
        this.applyTheme(newTheme);
      }
    });
  }

  /**
   * Add theme change observer
   * @param {Function} callback - Callback function to call on theme change
   */
  addObserver(callback) {
    this.observers.push(callback);
  }

  /**
   * Remove theme change observer
   * @param {Function} callback - Callback function to remove
   */
  removeObserver(callback) {
    this.observers = this.observers.filter(obs => obs !== callback);
  }

  /**
   * Notify all observers of theme change
   * @param {string} theme - New theme
   */
  notifyObservers(theme) {
    this.observers.forEach(callback => {
      try {
        callback(theme);
      } catch (error) {
        Utils.logger.error('Error in theme observer', error);
      }
    });
  }

  /**
   * Destroy theme manager and clean up
   */
  destroy() {
    this.observers = [];
    Utils.logger.info('Theme manager destroyed');
  }
}

// Export ThemeManager for use in other modules
window.ThemeManager = ThemeManager;
