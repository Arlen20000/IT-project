const express = require('express');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// CORS for development (if needed)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// Routes
const servicesRouter = require('./routes/services');
const portfolioRouter = require('./routes/portfolio');
const pricingRouter = require('./routes/pricing');
const aiRouter = require('./routes/ai');
const contactRouter = require('./routes/contact');

app.use('/api/services', servicesRouter);
app.use('/api/portfolio', portfolioRouter);
app.use('/api/pricing', pricingRouter);
app.use('/api/ai', aiRouter);
app.use('/api/contact', contactRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});