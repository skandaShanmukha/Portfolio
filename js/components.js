/* 
   Component Builders
   ==================
   Functions to build and render different UI components dynamically.
*/

const Components = {
  /**
   * Build skill card HTML
   * @param {Object} skill - Skill data object
   * @returns {string} HTML string for skill card
   */
  buildSkillCard(skill) {
    return `
      <div class="card skill-card">
        <div class="skill-icon">
          <i class="${skill.icon}"></i>
        </div>
        <h3 class="skill-title">${skill.title}</h3>
        <p class="skill-description">${skill.description}</p>
        ${skill.level ? `
          <div class="skill-level">
            <div class="skill-level-label">
              <span>Proficiency</span>
              <span>${skill.level}%</span>
            </div>
            <div class="skill-level-bar">
              <div class="skill-level-fill" style="width: ${skill.level}%"></div>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  },

  /**
   * Build project card HTML
   * @param {Object} project - Project data object
   * @returns {string} HTML string for project card
   */
  buildProjectCard(project) {
    return `
      <div class="card project-card">
        <div class="project-image">
          <i class="${project.icon}"></i>
        </div>
        <div class="project-content">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-description">${project.description}</p>
          <div class="project-tech">
            ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
          </div>
          <div class="project-links">
            ${project.demo && project.demo !== '#classified' ? `
              <a href="${project.demo}" class="project-link" target="_blank" rel="noopener noreferrer">
                <i class="fas fa-external-link-alt"></i>
                Live Demo
              </a>
            ` : ''}
            ${project.github ? `
              <a href="${project.github}" class="project-link secondary" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-github"></i>
                Source Code
              </a>
            ` : ''}
            ${project.demo === '#classified' ? `
              <span class="project-link" style="background-color: #6b7280; cursor: not-allowed;">
                <i class="fas fa-lock"></i>
                Classified
              </span>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Build book card HTML
   * @param {Object} book - Book data object
   * @returns {string} HTML string for book card
   */
  buildBookCard(book) {
    return `
      <div class="card book-card">
        <div class="book-cover">
          <i class="${book.icon}"></i>
        </div>
        <h3 class="book-title">${book.title}</h3>
        <p class="book-author">${book.author}</p>
        <p class="book-description">${book.description}</p>
        <div class="book-category">
          <span class="tech-tag">${book.category}</span>
        </div>
      </div>
    `;
  },

  /**
   * Build hero card HTML
   * @param {Object} hero - Hero data object
   * @returns {string} HTML string for hero card
   */
  buildHeroCard(hero) {
    return `
      <div class="card hero-card">
        <div class="hero-avatar">
          <i class="${hero.icon}"></i>
        </div>
        <h3 class="hero-name">${hero.name}</h3>
        <p class="hero-description">${hero.description}</p>
      </div>
    `;
  },

  /**
   * Build interest card HTML
   * @param {Object} interest - Interest data object
   * @returns {string} HTML string for interest card
   */
  buildInterestCard(interest) {
    return `
      <div class="card interest-card">
        <div class="interest-icon">
          <i class="${interest.icon}"></i>
        </div>
        <h3 class="interest-title">${interest.title}</h3>
        <p class="interest-description">${interest.description}</p>
      </div>
    `;
  },

  /**
   * Build hobby card HTML
   * @param {Object} hobby - Hobby data object
   * @returns {string} HTML string for hobby card
   */
  buildHobbyCard(hobby) {
    return `
      <div class="card hobby-card">
        <div class="hobby-icon">
          <i class="${hobby.icon}"></i>
        </div>
        <h3 class="hobby-title">${hobby.title}</h3>
        <p class="hobby-description">${hobby.description}</p>
      </div>
    `;
  },

  /**
   * Build hero stats HTML
   * @param {Object} stats - Stats data object
   * @returns {string} HTML string for hero stats
   */
  buildHeroStats(stats) {
    return `
      <div class="hero-stat">
        <span class="stat-number">${stats.experience}</span>
        <span class="stat-label">Years Experience</span>
      </div>
      <div class="hero-stat">
        <span class="stat-number">${stats.projects}</span>
        <span class="stat-label">Projects Completed</span>
      </div>
      <div class="hero-stat">
        <span class="stat-number">${stats.technologies}</span>
        <span class="stat-label">Technologies</span>
      </div>
      <div class="hero-stat">
        <span class="stat-number">${stats.certifications}</span>
        <span class="stat-label">Certifications</span>
      </div>
    `;
  },

  /**
   * Build contact info HTML
   * @param {Object} user - User data object
   * @returns {string} HTML string for contact info
   */
  buildContactInfo(user) {
    return `
      <div class="contact-item">
        <div class="contact-icon">
          <i class="fas fa-envelope"></i>
        </div>
        <div class="contact-details">
          <h3>Email</h3>
          <p><a href="mailto:${user.email}">${user.email}</a></p>
        </div>
      </div>
      
      <div class="contact-item">
        <div class="contact-icon">
          <i class="fab fa-github"></i>
        </div>
        <div class="contact-details">
          <h3>GitHub</h3>
          <p><a href="${user.github}" target="_blank" rel="noopener noreferrer">View Profile</a></p>
        </div>
      </div>
      
      <div class="contact-item">
        <div class="contact-icon">
          <i class="fab fa-linkedin"></i>
        </div>
        <div class="contact-details">
          <h3>LinkedIn</h3>
          <p><a href="${user.linkedin}" target="_blank" rel="noopener noreferrer">Connect with me</a></p>
        </div>
      </div>
      
      ${user.phone ? `
        <div class="contact-item">
          <div class="contact-icon">
            <i class="fas fa-phone"></i>
          </div>
          <div class="contact-details">
            <h3>Phone</h3>
            <p><a href="tel:${user.phone}">${user.phone}</a></p>
          </div>
        </div>
      ` : ''}
      
      ${user.location ? `
        <div class="contact-item">
          <div class="contact-icon">
            <i class="fas fa-map-marker-alt"></i>
          </div>
          <div class="contact-details">
            <h3>Location</h3>
            <p>${user.location}</p>
          </div>
        </div>
      ` : ''}
    `;
  },

  /**
   * Show limited items with expand functionality
   * @param {Array} items - Array of items to display
   * @param {Function} buildFunction - Function to build each item
   * @param {string} containerId - Container element ID
   * @param {string} expandButtonId - Expand button ID
   * @param {number} initialCount - Number of items to show initially
   */
  renderWithExpand(items, buildFunction, containerId, expandButtonId, initialCount = 3) {
    const container = document.getElementById(containerId);
    const expandButton = document.getElementById(expandButtonId);
    
    if (!container || !items || items.length === 0) return;

    // Show initial items
    const initialItems = items.slice(0, initialCount);
    const remainingItems = items.slice(initialCount);
    
    container.innerHTML = initialItems.map(item => buildFunction(item)).join('');
    
    // Show expand button if there are more items
    if (remainingItems.length > 0 && expandButton) {
      expandButton.style.display = 'flex';
      expandButton.querySelector('span').textContent = `Show ${remainingItems.length} More`;
      
      // Remove existing listeners
      const newButton = expandButton.cloneNode(true);
      expandButton.parentNode.replaceChild(newButton, expandButton);
      
      // Add click listener
      newButton.addEventListener('click', () => {
        if (newButton.classList.contains('expanded')) {
          // Collapse
          container.innerHTML = initialItems.map(item => buildFunction(item)).join('');
          newButton.classList.remove('expanded');
          newButton.querySelector('span').textContent = `Show ${remainingItems.length} More`;
        } else {
          // Expand
          container.innerHTML = items.map(item => buildFunction(item)).join('');
          newButton.classList.add('expanded');
          newButton.querySelector('span').textContent = 'Show Less';
        }
      });
    } else if (expandButton) {
      expandButton.style.display = 'none';
    }
  },

  /**
   * Animate skill level bars
   */
  animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-level-fill');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const width = bar.style.width;
          bar.style.width = '0%';
          
          setTimeout(() => {
            bar.style.width = width;
          }, 100);
          
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
  },

  /**
   * Animate stat numbers
   */
  animateStatNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const text = element.textContent;
          const number = parseInt(text.replace(/\D/g, ''));
          
          if (!isNaN(number)) {
            Utils.animateNumber(0, number, 2000, (current) => {
              element.textContent = text.replace(/\d+/, current);
            });
          }
          
          observer.unobserve(element);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => observer.observe(stat));
  },

  /**
   * Add simple scroll animations to cards
   */
  addScrollAnimations() {
    if (Utils.prefersReducedMotion()) return;

    const cards = document.querySelectorAll('.card');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(10px)';
      card.style.transition = `opacity 0.3s ease ${index * 0.05}s, transform 0.3s ease ${index * 0.05}s`;
      observer.observe(card);
    });
  }
};

// Export Components for use in other modules
window.Components = Components;
