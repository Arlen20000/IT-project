// Header component
window.headerHTML = `
<header class="header">
  <nav class="nav container">
    <div class="nav-brand">
      <a href="index.html" class="logo">TechFlow Solutions</a>
    </div>
    <div class="nav-links">
      <a href="index.html" class="nav-link" data-page="home">Home</a>
      <a href="services.html" class="nav-link" data-page="services">Services</a>
      <a href="about.html" class="nav-link" data-page="about">About</a>
      <a href="portfolio.html" class="nav-link" data-page="portfolio">Portfolio</a>
      <a href="pricing.html" class="nav-link" data-page="pricing">Pricing</a>
      <a href="ai-assistant.html" class="nav-link" data-page="ai-assistant">AI Assistant</a>
      <a href="contact.html" class="nav-link" data-page="contact">Contact</a>
    </div>
    <div class="nav-actions">
      <button id="theme-toggle" class="theme-toggle" aria-label="Toggle theme">
        <span class="theme-icon">🌙</span>
      </button>
      <a href="contact.html" class="btn btn-primary nav-cta">Get Started</a>
    </div>
    <button class="mobile-menu-toggle" aria-label="Toggle menu">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </nav>
</header>
`;

// Header styles (to be included in global.css or separate)
window.headerStyles = `
.header {
  position: sticky;
  top: 0;
  background-color: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  z-index: 1000;
  backdrop-filter: blur(10px);
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
}

.nav-brand .logo {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--primary-color);
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  font-weight: 500;
  color: var(--text-secondary);
  position: relative;
  transition: var(--transition);
}

.nav-link:hover,
.nav-link.active {
  color: var(--primary-color);
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -0.5rem;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--primary-color);
  border-radius: 1px;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: var(--transition);
}

.theme-toggle:hover {
  background-color: var(--bg-tertiary);
}

.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.mobile-menu-toggle span {
  width: 25px;
  height: 3px;
  background-color: var(--text-primary);
  margin: 3px 0;
  transition: var(--transition);
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: var(--bg-primary);
    flex-direction: column;
    padding: 1rem;
    border-bottom: 1px solid var(--border-color);
    box-shadow: var(--shadow);
  }

  .nav-links.active {
    display: flex;
  }

  .mobile-menu-toggle {
    display: flex;
  }

  .nav-actions {
    gap: 0.5rem;
  }

  .nav-cta {
    display: none;
  }
}
`;