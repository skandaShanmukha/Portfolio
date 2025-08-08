/* 
   Main Application Controller
   ===========================
   Orchestrates the entire application, handles initialization,
   data loading, and component rendering.
*/

class PortfolioApp {
  constructor() {
    this.dataLoader = new DataLoader();
    this.themeManager = new ThemeManager();
    this.data = {};
    this.currentQuoteIndex = 0;
    this.isInitialized = false;
  }

  /**
   * Initialize the application
   */
  async init() {
    try {
      Utils.logger.info('🚀 Initializing Koustubh Dave Portfolio...');
      
      // Initialize theme manager first
      this.themeManager.init();
      
      // Load all data
      await this.loadData();
      
      // Render components
      this.renderComponents();
      
      // Set up event listeners
      this.setupEventListeners();
      
      // Set up theme change listener
      this.setupThemeListener();
      
      // Initialize animations
      this.initializeAnimations();
      
      // Initialize quote rotation
      this.initializeQuoteRotation();
      
      this.isInitialized = true;
      Utils.logger.success('✅ Portfolio initialized successfully');
      
    } catch (error) {
      Utils.logger.error('❌ Failed to initialize portfolio', error);
      this.handleInitializationError(error);
    }
  }

  /**
   * Load all data from JSON files
   */
  async loadData() {
    try {
      this.data = await this.dataLoader.loadAllData();
      Utils.logger.info('Data loaded successfully');
    } catch (error) {
      Utils.logger.error('Error loading data', error);
      // Continue with fallback data
    }
  }

  /**
   * Render all components based on current theme
   */
  renderComponents() {
    const currentTheme = this.themeManager.getCurrentTheme();
    
    // Render hero stats
    this.renderHeroStats();
    
    // Render skills and projects based on theme
    if (currentTheme === 'dark') {
      this.renderSkills(this.data.cyber.skills);
      this.renderProjects(this.data.cyber.projects);
    } else {
      this.renderSkills(this.data.webdev.skills);
      this.renderProjects(this.data.webdev.projects);
    }
    
    // Render theme-independent sections
    this.renderBooks();
    this.renderInterests();
    this.renderContactInfo();
    this.renderInitialQuote();
  }

  /**
   * Render hero statistics
   */
  renderHeroStats() {
    const statsContainer = document.getElementById('heroStats');
    if (statsContainer && this.data.user && this.data.user.stats) {
      statsContainer.innerHTML = Components.buildHeroStats(this.data.user.stats);
    }
  }

  /**
   * Render skills section with expand functionality
   * @param {Array} skills - Skills data array
   */
  renderSkills(skills) {
    if (skills) {
      Components.renderWithExpand(
        skills,
        Components.buildSkillCard,
        'skillsGrid',
        'expandSkills',
        3
      );
    }
  }

  /**
   * Render projects section with expand functionality
   * @param {Array} projects - Projects data array
   */
  renderProjects(projects) {
    if (projects) {
      // Sort projects to show featured first
      const sortedProjects = projects.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
      
      Components.renderWithExpand(
        sortedProjects,
        Components.buildProjectCard,
        'projectsGrid',
        'expandProjects',
        2
      );
    }
  }

  /**
   * Render books section with expand functionality
   */
  renderBooks() {
    if (this.data.books) {
      Components.renderWithExpand(
        this.data.books,
        Components.buildBookCard,
        'booksGrid',
        'expandBooks',
        4
      );
    }
  }

  /**
   * Render interests section with expand functionality
   */
  renderInterests() {
    if (!this.data.interests) return;

    // Render heroes
    if (this.data.interests.heroes) {
      Components.renderWithExpand(
        this.data.interests.heroes,
        Components.buildHeroCard,
        'heroesGrid',
        'expandHeroes',
        3
      );
    }

    // Render interests (no expand needed, usually fewer items)
    const interestsGrid = document.getElementById('interestsGrid');
    if (interestsGrid && this.data.interests.interests) {
      interestsGrid.innerHTML = this.data.interests.interests.map(interest => 
        Components.buildInterestCard(interest)
      ).join('');
    }

    // Render hobbies (no expand needed, usually fewer items)
    const hobbiesGrid = document.getElementById('hobbiesGrid');
    if (hobbiesGrid && this.data.interests.hobbies) {
      hobbiesGrid.innerHTML = this.data.interests.hobbies.map(hobby => 
        Components.buildHobbyCard(hobby)
      ).join('');
    }
  }

  /**
   * Render contact information
   */
  renderContactInfo() {
    const contactInfo = document.getElementById('contactInfo');
    if (contactInfo && this.data.user) {
      contactInfo.innerHTML = Components.buildContactInfo(this.data.user);
    }
  }

  /**
   * Render initial quote
   */
  renderInitialQuote() {
    if (this.data.quotes && this.data.quotes.length > 0) {
      this.displayQuote(this.data.quotes[0]);
    }
  }

  /**
   * Display a quote
   * @param {Object} quote - Quote object
   */
  displayQuote(quote) {
    const quoteText = document.getElementById('quoteText');
    const quoteAuthor = document.getElementById('quoteAuthor');
    
    if (quoteText && quoteAuthor) {
      quoteText.textContent = `"${quote.text}"`;
      quoteAuthor.textContent = `— ${quote.author}`;
    }
  }

  /**
   * Get next random quote
   */
  getNextQuote() {
    if (!this.data.quotes || this.data.quotes.length === 0) return;
    
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * this.data.quotes.length);
    } while (nextIndex === this.currentQuoteIndex && this.data.quotes.length > 1);
    
    this.currentQuoteIndex = nextIndex;
    return this.data.quotes[nextIndex];
  }

  /**
   * Initialize quote rotation
   */
  initializeQuoteRotation() {
    const quoteRefresh = document.getElementById('quoteRefresh');
    if (quoteRefresh) {
      quoteRefresh.addEventListener('click', () => {
        const nextQuote = this.getNextQuote();
        if (nextQuote) {
          this.displayQuote(nextQuote);
        }
      });
    }

    // Auto-rotate quotes every 30 seconds
    setInterval(() => {
      const nextQuote = this.getNextQuote();
      if (nextQuote) {
        this.displayQuote(nextQuote);
      }
    }, 30000);
  }

  /**
   * Set up global event listeners
   */
  setupEventListeners() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          Utils.scrollToElement(target, 80); // Account for fixed header
        }
      });
    });

    // Hero action buttons
    const viewWorkBtn = document.getElementById('viewWorkBtn');
    const contactBtn = document.getElementById('contactBtn');

    if (viewWorkBtn) {
      viewWorkBtn.addEventListener('click', () => {
        Utils.scrollToElement('#projects', 80);
      });
    }

    if (contactBtn) {
      contactBtn.addEventListener('click', () => {
        Utils.scrollToElement('#contact', 80);
      });
    }

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleContactFormSubmission(e);
      });
    }

    // Navigation active state
    this.setupNavigationActiveState();
  }

  /**
   * Set up navigation active state based on scroll position
   */
  setupNavigationActiveState() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    const sections = document.querySelectorAll('section[id]');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          
          // Remove active class from all nav links
          navLinks.forEach(link => link.classList.remove('active'));
          
          // Add active class to current section's nav link
          const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
          if (activeLink) {
            activeLink.classList.add('active');
          }
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '-80px 0px -80px 0px' // Account for fixed header
    });

    sections.forEach(section => observer.observe(section));
  }

  /**
   * Set up theme change listener
   */
  setupThemeListener() {
    this.themeManager.addObserver((theme) => {
      // Re-render theme-dependent content
      if (theme === 'dark') {
        this.renderSkills(this.data.cyber.skills);
        this.renderProjects(this.data.cyber.projects);
      } else {
        this.renderSkills(this.data.webdev.skills);
        this.renderProjects(this.data.webdev.projects);
      }
      
      // Re-initialize animations for new content
      setTimeout(() => {
        this.initializeAnimations();
      }, 100);
    });
  }

  /**
   * Initialize animations
   */
  initializeAnimations() {
    if (Utils.prefersReducedMotion()) return;

    Components.addScrollAnimations();
    Components.animateSkillBars();
    Components.animateStatNumbers();
  }

  /**
   * Handle contact form submission
   * @param {Event} e - Form submission event
   */
  handleContactFormSubmission(e) {
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    };

    Utils.logger.info('Contact form submitted', data);
    
    // In a real application, you would send this data to a server
    // For now, we'll just show a success message
    this.showContactFormSuccess();
  }

  /**
   * Show contact form success message
   */
  showContactFormSuccess() {
    const form = document.getElementById('contactForm');
    const successMessage = document.createElement('div');
    successMessage.className = 'contact-success';
    successMessage.innerHTML = `
      <div style="
        background-color: var(--success);
        color: white;
        padding: 1rem;
        border-radius: 0.5rem;
        margin-top: 1rem;
        text-align: center;
      ">
        <i class="fas fa-check-circle"></i>
        Thank you for your message! I'll get back to you soon.
      </div>
    `;

    form.appendChild(successMessage);
    form.reset();

    // Remove success message after 5 seconds
    setTimeout(() => {
      successMessage.remove();
    }, 5000);
  }

  /**
   * Handle initialization errors
   * @param {Error} error - Initialization error
   */
  handleInitializationError(error) {
    Utils.logger.error('Initialization error', error);
    
    // Show error message to user
    const errorMessage = document.createElement('div');
    errorMessage.innerHTML = `
      <div style="
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--error);
        color: white;
        padding: 2rem;
        border-radius: 1rem;
        text-align: center;
        z-index: 9999;
        max-width: 400px;
      ">
        <h3>⚠️ Loading Error</h3>
        <p>The portfolio failed to load properly. Please refresh the page.</p>
        <button onclick="location.reload()" style="
          background: white;
          color: var(--error);
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          cursor: pointer;
          margin-top: 1rem;
        ">
          Refresh Page
        </button>
      </div>
    `;
    
    document.body.appendChild(errorMessage);
  }

  /**
   * Get application status
   * @returns {Object} Application status information
   */
  getStatus() {
    return {
      initialized: this.isInitialized,
      currentTheme: this.themeManager.getCurrentTheme(),
      dataLoaded: Object.keys(this.data).length > 0,
      cacheStatus: this.dataLoader.getCacheStatus()
    };
  }

  /**
   * Destroy the application and clean up
   */
  destroy() {
    this.themeManager.destroy();
    this.dataLoader.clearCache();
    this.isInitialized = false;
    Utils.logger.info('Portfolio app destroyed');
  }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.portfolioApp = new PortfolioApp();
  window.portfolioApp.init();
});

// Export PortfolioApp for global access
window.PortfolioApp = PortfolioApp;
