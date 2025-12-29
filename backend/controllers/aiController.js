const aiService = require('../services/aiService');

const chat = (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    const response = aiService.generateResponse(message);
    res.json({ response, timestamp: new Date().toISOString() });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process AI request' });
  }
};

module.exports = { chat };