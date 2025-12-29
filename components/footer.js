// Footer component
window.footerHTML = `
<footer class="footer">
  <div class="container">
    <div class="footer-content grid grid-4">
      <div class="footer-section">
        <h4>TechFlow Solutions</h4>
        <p>Transforming businesses through innovative IT solutions and cutting-edge technology.</p>
        <div class="social-links">
          <a href="#" aria-label="LinkedIn">💼</a>
          <a href="#" aria-label="Twitter">🐦</a>
          <a href="#" aria-label="GitHub">💻</a>
        </div>
      </div>
      <div class="footer-section">
        <h4>Services</h4>
        <ul>
          <li><a href="services.html">Web Development</a></li>
          <li><a href="services.html">Mobile Apps</a></li>
          <li><a href="services.html">Cloud Solutions</a></li>
          <li><a href="services.html">AI Integration</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>Company</h4>
        <ul>
          <li><a href="about.html">About Us</a></li>
          <li><a href="portfolio.html">Portfolio</a></li>
          <li><a href="contact.html">Contact</a></li>
          <li><a href="#">Careers</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>Support</h4>
        <ul>
          <li><a href="#">Help Center</a></li>
          <li><a href="#">Documentation</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Service</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2024 TechFlow Solutions. All rights reserved.</p>
      <p>Made with ❤️ for innovation</p>
    </div>
  </div>
</footer>
`;

// Footer styles
window.footerStyles = `
.footer {
  background-color: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
  margin-top: auto;
}

.footer-content {
  padding: 3rem 0 2rem;
}

.footer-section h4 {
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.footer-section p {
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.footer-section ul {
  list-style: none;
}

.footer-section ul li {
  margin-bottom: 0.5rem;
}

.footer-section ul a {
  color: var(--text-secondary);
  transition: var(--transition);
}

.footer-section ul a:hover {
  color: var(--primary-color);
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.social-links a {
  font-size: 1.25rem;
  transition: var(--transition);
}

.social-links a:hover {
  transform: scale(1.1);
}

.footer-bottom {
  border-top: 1px solid var(--border-color);
  padding: 1.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
}
`;