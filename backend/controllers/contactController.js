const contactService = require('../services/contactService');

const submitContact = (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }
    const result = contactService.saveContact({ name, email, message });
    if (result.success) {
      res.json({ message: 'Contact form submitted successfully' });
    } else {
      res.status(500).json({ error: result.message });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
};

module.exports = { submitContact };