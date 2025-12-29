// Common functionality for all pages

// Theme management
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem('theme') || 'light';
    this.init();
  }

  init() {
    // Apply theme immediately
    document.documentElement.setAttribute('data-theme', this.theme);

    // Try to bind events immediately, and retry if button not found
    this.bindEvents();
  }

  toggle() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', this.theme);
    localStorage.setItem('theme', this.theme);
    this.updateToggleButton();
  }

  updateToggleButton() {
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
      const icon = toggle.querySelector('.theme-icon');
      if (icon) {
        icon.textContent = this.theme === 'light' ? '🌙' : '☀️';
      }
    }
  }

  bindEvents() {
    const tryBind = () => {
      const toggle = document.getElementById('theme-toggle');
      if (toggle && !toggle.hasAttribute('data-bound')) {
        toggle.addEventListener('click', () => this.toggle());
        toggle.setAttribute('data-bound', 'true');
        this.updateToggleButton();
        console.log('Theme toggle button bound successfully');
        return true;
      }
      return false;
    };

    // Try immediately
    if (!tryBind()) {
      // If not found, try again after DOMContentLoaded
      document.addEventListener('DOMContentLoaded', () => {
        if (!tryBind()) {
          // If still not found, try with increasing delays
          let attempts = 0;
          const retryBind = () => {
            attempts++;
            if (attempts > 10) return; // Max 10 attempts
            if (!tryBind()) {
              setTimeout(retryBind, attempts * 100);
            }
          };
          retryBind();
        }
      });
    }
  }
}

// Navigation management
class NavigationManager {
  constructor() {
    this.init();
  }

  init() {
    // Delay activation until DOM is ready so header/footer inserted by pages are present
    document.addEventListener('DOMContentLoaded', () => {
      this.setActiveLink();
      this.bindMobileMenu();
    });
  }

  setActiveLink() {
    const currentPage = this.getCurrentPage();
    const links = document.querySelectorAll('.nav-link');

    links.forEach(link => {
      if (link.getAttribute('data-page') === currentPage) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  getCurrentPage() {
    const path = window.location.pathname;
    let page = path.split('/').pop().replace('.html', '');
    if (!page) page = 'home';
    // Treat index page as home for navigation highlighting
    if (page === 'index') page = 'home';
    return page;
  }

  bindMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (toggle && navLinks) {
      toggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        toggle.classList.toggle('active');
      });
    }
  }
}

// Animation on scroll
class ScrollAnimator {
  constructor() {
    this.init();
  }

  init() {
    this.observeElements();
  }

  observeElements() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
  }
}

// Utility functions
const utils = {
  // Format currency
  formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  },

  // Debounce function
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Show loading state
  showLoading(element) {
    element.innerHTML = '<div class="loading">Loading...</div>';
  },

  // Hide loading state
  hideLoading(element) {
    const loading = element.querySelector('.loading');
    if (loading) loading.remove();
  }
};

// Initialize managers
const themeManager = new ThemeManager();
const navigationManager = new NavigationManager();
const scrollAnimator = new ScrollAnimator();

// PWA functionality
class PWAManager {
  constructor() {
    this.deferredPrompt = null;
    this.init();
  }

  init() {
    this.registerServiceWorker();
    this.bindInstallEvents();
    this.addManifestLink();
  }

  async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('sw.js');
        console.log('Service Worker registered:', registration);

        // Handle updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              this.showUpdateNotification();
            }
          });
        });
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    }
  }

  bindInstallEvents() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.showInstallButton();
    });

    window.addEventListener('appinstalled', () => {
      this.deferredPrompt = null;
      this.hideInstallButton();
      console.log('PWA was installed');
    });
  }

  showInstallButton() {
    const installBtn = document.createElement('button');
    installBtn.id = 'pwa-install-btn';
    installBtn.className = 'btn btn-primary';
    installBtn.innerHTML = '📱 Install App';
    installBtn.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 1000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;

    installBtn.addEventListener('click', async () => {
      if (this.deferredPrompt) {
        this.deferredPrompt.prompt();
        const { outcome } = await this.deferredPrompt.userChoice;
        console.log(`User response to install prompt: ${outcome}`);
        this.deferredPrompt = null;
        this.hideInstallButton();
      }
    });

    document.body.appendChild(installBtn);
  }

  hideInstallButton() {
    const installBtn = document.getElementById('pwa-install-btn');
    if (installBtn) {
      installBtn.remove();
    }
  }

  showUpdateNotification() {
    const updateToast = document.createElement('div');
    updateToast.id = 'pwa-update-toast';
    updateToast.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 1rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 1000;
        max-width: 300px;
      ">
        <p style="margin: 0 0 0.5rem 0; font-weight: 500;">Update Available</p>
        <p style="margin: 0 0 1rem 0; font-size: 0.9rem;">A new version is available. Refresh to update.</p>
        <div style="display: flex; gap: 0.5rem;">
          <button id="update-btn" class="btn" style="background: white; color: var(--primary-color); padding: 0.25rem 0.75rem; font-size: 0.8rem;">Update</button>
          <button id="dismiss-btn" class="btn" style="background: transparent; color: white; border: 1px solid white; padding: 0.25rem 0.75rem; font-size: 0.8rem;">Later</button>
        </div>
      </div>
    `;

    document.body.appendChild(updateToast);

    document.getElementById('update-btn').addEventListener('click', () => {
      window.location.reload();
    });

    document.getElementById('dismiss-btn').addEventListener('click', () => {
      updateToast.remove();
    });
  }

  addManifestLink() {
    if (!document.querySelector('link[rel="manifest"]')) {
      const manifestLink = document.createElement('link');
      manifestLink.rel = 'manifest';
      manifestLink.href = 'manifest.json';
      document.head.appendChild(manifestLink);
    }
  }
}

// Initialize PWA manager
const pwaManager = new PWAManager();

// Accessibility enhancements
class AccessibilityManager {
  constructor() {
    this.init();
  }

  init() {
    this.addSkipLinks();
    this.enhanceKeyboardNavigation();
    this.addARIAEnhancements();
    this.handleReducedMotion();
    this.addScreenReaderAnnouncements();
  }

  addSkipLinks() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: var(--primary-color);
      color: white;
      padding: 8px;
      text-decoration: none;
      border-radius: 4px;
      z-index: 1000;
      transition: top 0.3s;
    `;

    skipLink.addEventListener('focus', () => {
      skipLink.style.top = '6px';
    });

    skipLink.addEventListener('blur', () => {
      skipLink.style.top = '-40px';
    });

    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  enhanceKeyboardNavigation() {
    // Enhanced focus indicators
    const style = document.createElement('style');
    style.textContent = `
      *:focus-visible {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
      }

      .btn:focus-visible,
      .form-input:focus-visible,
      .form-textarea:focus-visible {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
      }
    `;
    document.head.appendChild(style);

    // Keyboard navigation for cards and interactive elements
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const focusedElement = document.activeElement;
        if (focusedElement && focusedElement.classList.contains('card')) {
          e.preventDefault();
          const link = focusedElement.querySelector('a');
          if (link) link.click();
        }
      }
    });
  }

  addARIAEnhancements() {
    // Add ARIA labels to form elements
    document.addEventListener('DOMContentLoaded', () => {
      // Form inputs
      const inputs = document.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        if (!input.getAttribute('aria-label') && !input.getAttribute('aria-labelledby')) {
          const label = document.querySelector(`label[for="${input.id}"]`);
          if (label) {
            input.setAttribute('aria-label', label.textContent.trim());
          }
        }
      });

      // Buttons without text
      const buttons = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])');
      buttons.forEach(button => {
        if (!button.textContent.trim() && button.querySelector('img, svg, .icon')) {
          const icon = button.querySelector('img, svg, .icon');
          if (icon) {
            const alt = icon.getAttribute('alt') || icon.getAttribute('aria-label') || 'Icon button';
            button.setAttribute('aria-label', alt);
          }
        }
      });

      // Live regions for dynamic content
      const dynamicContent = document.querySelectorAll('.live-activity, .chat-messages, #time-slots');
      dynamicContent.forEach(element => {
        element.setAttribute('aria-live', 'polite');
        element.setAttribute('aria-atomic', 'false');
      });
    });
  }

  handleReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      const style = document.createElement('style');
      style.textContent = `
        *,
        *::before,
        *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      `;
      document.head.appendChild(style);
    }
  }

  addScreenReaderAnnouncements() {
    // Create announcement element
    const announcement = document.createElement('div');
    announcement.id = 'sr-announcements';
    announcement.setAttribute('aria-live', 'assertive');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.style.cssText = `
      position: absolute;
      left: -10000px;
      width: 1px;
      height: 1px;
      overflow: hidden;
    `;
    document.body.appendChild(announcement);

    // Function to announce messages to screen readers
    window.announceToScreenReader = (message) => {
      announcement.textContent = message;
      setTimeout(() => {
        announcement.textContent = '';
      }, 1000);
    };
  }
}

// Social sharing functionality
class SocialShareManager {
  constructor() {
    this.init();
  }

  init() {
    this.addShareButtons();
  }

  addShareButtons() {
    document.addEventListener('DOMContentLoaded', () => {
      // Add share buttons to portfolio items and blog posts
      const shareableContent = document.querySelectorAll('.portfolio-item, .case-study');

      shareableContent.forEach(item => {
        const shareButton = document.createElement('button');
        shareButton.className = 'share-btn btn btn-secondary';
        shareButton.innerHTML = '📤 Share';
        shareButton.setAttribute('aria-label', 'Share this content');

        shareButton.addEventListener('click', (e) => {
          e.preventDefault();
          this.showShareOptions(item);
        });

        item.appendChild(shareButton);
      });
    });
  }

  showShareOptions(contentElement) {
    const title = contentElement.querySelector('h3, h2')?.textContent || 'TechFlow Project';
    const url = window.location.href;
    const text = `Check out this project: ${title}`;

    if (navigator.share) {
      // Use native Web Share API
      navigator.share({
        title: title,
        text: text,
        url: url
      });
    } else {
      // Fallback to custom share options
      this.showCustomShareDialog(title, text, url);
    }
  }

  showCustomShareDialog(title, text, url) {
    const dialog = document.createElement('div');
    dialog.className = 'share-dialog';
    dialog.innerHTML = `
      <div class="share-dialog-overlay" style="
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div class="share-dialog-content" style="
          background: var(--bg-primary);
          padding: 2rem;
          border-radius: 0.5rem;
          max-width: 400px;
          width: 90%;
          box-shadow: var(--shadow-lg);
        ">
          <h3 style="margin-top: 0;">Share this project</h3>
          <div class="share-options" style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin: 1rem 0;">
            <button class="share-option btn" data-platform="twitter">🐦 Twitter</button>
            <button class="share-option btn" data-platform="linkedin">💼 LinkedIn</button>
            <button class="share-option btn" data-platform="facebook">📘 Facebook</button>
            <button class="share-option btn" data-platform="email">✉️ Email</button>
          </div>
          <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
            <button class="btn btn-secondary" id="copy-link">📋 Copy Link</button>
            <button class="btn" id="close-share">Close</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(dialog);

    // Share handlers
    dialog.addEventListener('click', (e) => {
      const platform = e.target.dataset.platform;
      if (platform) {
        this.shareToPlatform(platform, title, text, url);
        dialog.remove();
      }

      if (e.target.id === 'copy-link') {
        navigator.clipboard.writeText(url).then(() => {
          announceToScreenReader('Link copied to clipboard');
          e.target.textContent = '✅ Copied!';
          setTimeout(() => {
            e.target.textContent = '📋 Copy Link';
          }, 2000);
        });
      }

      if (e.target.id === 'close-share' || e.target.classList.contains('share-dialog-overlay')) {
        dialog.remove();
      }
    });
  }

  shareToPlatform(platform, title, text, url) {
    const encodedTitle = encodeURIComponent(title);
    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(url);

    let shareUrl;

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodedTitle}&body=${encodedText}%0A%0A${encodedUrl}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  }
}

// Personalization features
class PersonalizationManager {
  constructor() {
    this.userPreferences = this.loadPreferences();
    this.init();
  }

  init() {
    this.applyPreferences();
    this.trackUserBehavior();
    this.addPersonalizationUI();
  }

  loadPreferences() {
    return {
      theme: localStorage.getItem('theme') || 'light',
      fontSize: localStorage.getItem('fontSize') || 'medium',
      visitedPages: JSON.parse(localStorage.getItem('visitedPages') || '[]'),
      favoriteServices: JSON.parse(localStorage.getItem('favoriteServices') || '[]'),
      lastVisit: localStorage.getItem('lastVisit') || null
    };
  }

  savePreferences() {
    localStorage.setItem('theme', this.userPreferences.theme);
    localStorage.setItem('fontSize', this.userPreferences.fontSize);
    localStorage.setItem('visitedPages', JSON.stringify(this.userPreferences.visitedPages));
    localStorage.setItem('favoriteServices', JSON.stringify(this.userPreferences.favoriteServices));
    localStorage.setItem('lastVisit', new Date().toISOString());
  }

  applyPreferences() {
    // Apply theme
    document.documentElement.setAttribute('data-theme', this.userPreferences.theme);

    // Apply font size
    document.documentElement.setAttribute('data-font-size', this.userPreferences.fontSize);

    // Welcome back message
    if (this.userPreferences.lastVisit) {
      const lastVisit = new Date(this.userPreferences.lastVisit);
      const now = new Date();
      const daysSince = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));

      if (daysSince > 0) {
        setTimeout(() => {
          announceToScreenReader(`Welcome back! It's been ${daysSince} day${daysSince > 1 ? 's' : ''} since your last visit.`);
        }, 1000);
      }
    }
  }

  trackUserBehavior() {
    // Track page visits
    const currentPage = window.location.pathname;
    if (!this.userPreferences.visitedPages.includes(currentPage)) {
      this.userPreferences.visitedPages.push(currentPage);
      this.savePreferences();
    }

    // Track time spent on page
    let startTime = Date.now();
    window.addEventListener('beforeunload', () => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      // In a real app, this would be sent to analytics
      console.log(`Time spent on ${currentPage}: ${timeSpent} seconds`);
    });

    // Track service interests
    document.addEventListener('click', (e) => {
      if (e.target.closest('.service-card, .pricing-card')) {
        const serviceElement = e.target.closest('.service-card, .pricing-card');
        const serviceName = serviceElement.querySelector('h3')?.textContent;

        if (serviceName && !this.userPreferences.favoriteServices.includes(serviceName)) {
          this.userPreferences.favoriteServices.push(serviceName);
          this.savePreferences();
        }
      }
    });
  }

  addPersonalizationUI() {
    document.addEventListener('DOMContentLoaded', () => {
      // Add font size controls
      const fontSizeControls = document.createElement('div');
      fontSizeControls.className = 'font-size-controls';
      fontSizeControls.innerHTML = `
        <button id="font-smaller" aria-label="Decrease font size">A-</button>
        <button id="font-reset" aria-label="Reset font size">A</button>
        <button id="font-larger" aria-label="Increase font size">A+</button>
      `;
      fontSizeControls.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        display: flex;
        gap: 0.25rem;
        background: var(--bg-primary);
        padding: 0.5rem;
        border-radius: 0.5rem;
        box-shadow: var(--shadow);
        z-index: 100;
      `;

      document.body.appendChild(fontSizeControls);

      // Font size handlers
      document.getElementById('font-smaller').addEventListener('click', () => {
        this.changeFontSize('smaller');
      });

      document.getElementById('font-reset').addEventListener('click', () => {
        this.changeFontSize('medium');
      });

      document.getElementById('font-larger').addEventListener('click', () => {
        this.changeFontSize('larger');
      });
    });
  }

  changeFontSize(size) {
    this.userPreferences.fontSize = size;
    document.documentElement.setAttribute('data-font-size', size);
    this.savePreferences();
    announceToScreenReader(`Font size changed to ${size}`);
  }
}

// Initialize all managers
const accessibilityManager = new AccessibilityManager();
const socialShareManager = new SocialShareManager();
const personalizationManager = new PersonalizationManager();

// Make utils globally available
window.utils = utils;