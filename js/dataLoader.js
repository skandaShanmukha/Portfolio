/* 
   Data Loader Module
   ==================
   Handles loading and caching of JSON data files with fallback support.
*/

class DataLoader {
  constructor() {
    this.cache = new Map();
    this.cacheExpiry = 5 * 60 * 1000; // 5 minutes
    this.fallbackData = this.getFallbackData();
  }

  /**
   * Load all data files
   * @returns {Promise<Object>} All loaded data
   */
  async loadAllData() {
    try {
      const [user, webdev, cyber, books, interests, quotes] = await Promise.all([
        this.loadData('user'),
        this.loadData('webdev'),
        this.loadData('cyber'),
        this.loadData('books'),
        this.loadData('interests'),
        this.loadData('quotes')
      ]);

      return { user, webdev, cyber, books, interests, quotes };
    } catch (error) {
      Utils.logger.error('Failed to load all data', error);
      return this.fallbackData;
    }
  }

  /**
   * Load individual data file
   * @param {string} type - Data type to load
   * @returns {Promise<Object>} Loaded data
   */
  async loadData(type) {
    const cacheKey = `data_${type}`;
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.cacheExpiry) {
        Utils.logger.info(`Using cached data for ${type}`);
        return cached.data;
      }
    }

    try {
      Utils.logger.info(`Loading ${type} data from file`);
      const response = await fetch(`data/${type}.json`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Cache the data
      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });

      Utils.logger.success(`Successfully loaded ${type} data`);
      return data;

    } catch (error) {
      Utils.logger.warn(`Failed to load ${type} data, using fallback`, error);
      return this.fallbackData[type] || {};
    }
  }

  /**
   * Clear cache
   */
  clearCache() {
    this.cache.clear();
    Utils.logger.info('Data cache cleared');
  }

  /**
   * Get cache status
   * @returns {Object} Cache status information
   */
  getCacheStatus() {
    const status = {};
    for (const [key, value] of this.cache.entries()) {
      const age = Date.now() - value.timestamp;
      status[key] = {
        cached: true,
        age: Math.round(age / 1000), // in seconds
        expired: age > this.cacheExpiry
      };
    }
    return status;
  }

  /**
   * Fallback data in case files fail to load
   * @returns {Object} Fallback data structure
   */
  getFallbackData() {
    return {
      user: {
        name: "Koustubh Dave",
        email: "kanuntd13@gmail.com",
        github: "https://github.com/Koustubh1234G",
        linkedin: "https://www.linkedin.com/in/koustubh-dave-0690131a1",
        summary: "Full Stack Developer & Cybersecurity Enthusiast with strong interest in strategic thinking, Indian history, and philosophy.",
        stats: {
          experience: "3+",
          projects: "25+",
          technologies: "15+",
          certifications: "5+"
        }
      },
      webdev: {
        skills: [
          {
            title: "Frontend Development",
            description: "Modern web interfaces with React, Vue, and vanilla JavaScript",
            icon: "fas fa-code",
            level: 90
          },
          {
            title: "Backend Development",
            description: "Server-side applications with Node.js, Python, and databases",
            icon: "fas fa-server",
            level: 85
          },
          {
            title: "Full Stack Architecture",
            description: "End-to-end application design and implementation",
            icon: "fas fa-layer-group",
            level: 80
          }
        ],
        projects: [
          {
            title: "Portfolio Website",
            description: "Dual-mode personal portfolio with dynamic theme switching",
            icon: "fas fa-user",
            tech: ["HTML", "CSS", "JavaScript"],
            demo: "#",
            github: "https://github.com/Koustubh1234G",
            featured: true
          }
        ]
      },
      cyber: {
        skills: [
          {
            title: "Penetration Testing",
            description: "Ethical hacking and vulnerability assessment",
            icon: "fas fa-shield-alt",
            level: 75
          },
          {
            title: "Network Security",
            description: "Securing network infrastructure and protocols",
            icon: "fas fa-network-wired",
            level: 80
          },
          {
            title: "Digital Forensics",
            description: "Investigation and analysis of digital evidence",
            icon: "fas fa-search",
            level: 70
          }
        ],
        projects: [
          {
            title: "Security Assessment Tool",
            description: "Automated vulnerability scanning and reporting",
            icon: "fas fa-bug",
            tech: ["Python", "Nmap", "SQLMap"],
            demo: "#classified",
            github: null,
            featured: true
          }
        ]
      },
      books: [
        {
          title: "The Art of War",
          author: "Sun Tzu",
          description: "Ancient Chinese military treatise on strategy and tactics",
          icon: "fas fa-chess",
          category: "Strategy"
        },
        {
          title: "Meditations",
          author: "Marcus Aurelius",
          description: "Stoic philosophy and personal reflections of a Roman Emperor",
          icon: "fas fa-scroll",
          category: "Philosophy"
        }
      ],
      interests: {
        heroes: [
          {
            name: "Subhas Chandra Bose",
            description: "Indian freedom fighter and strategic military leader",
            icon: "fas fa-flag"
          },
          {
            name: "Adi Shankaracharya",
            description: "Philosopher who consolidated Advaita Vedanta",
            icon: "fas fa-om"
          }
        ],
        interests: [
          {
            title: "Strategic Thinking",
            description: "Military strategy, geopolitics, and tactical analysis",
            icon: "fas fa-chess-king"
          },
          {
            title: "Indian Philosophy",
            description: "Vedanta, dharmic traditions, and spiritual texts",
            icon: "fas fa-lotus"
          }
        ],
        hobbies: [
          {
            title: "Chess",
            description: "Strategic board game mastery and tactical thinking",
            icon: "fas fa-chess-knight"
          },
          {
            title: "Go (Weiqi)",
            description: "Ancient strategy game of territory and influence",
            icon: "fas fa-circle"
          }
        ]
      },
      quotes: [
        {
          text: "All warfare is based on deception.",
          author: "Sun Tzu"
        },
        {
          text: "You have power over your mind - not outside events. Realize this, and you will find strength.",
          author: "Marcus Aurelius"
        },
        {
          text: "Freedom is my birthright and I shall have it.",
          author: "Bal Gangadhar Tilak"
        }
      ]
    };
  }
}

// Export DataLoader for use in other modules
window.DataLoader = DataLoader;
