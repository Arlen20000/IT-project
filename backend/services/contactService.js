const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/contacts.json');

// Initialize contacts file if it doesn't exist
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, '[]');
}

const saveContact = (contactData) => {
  try {
    const contacts = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    contacts.push({
      id: Date.now(),
      ...contactData,
      timestamp: new Date().toISOString()
    });
    fs.writeFileSync(dataPath, JSON.stringify(contacts, null, 2));
    return { success: true, message: 'Contact saved successfully' };
  } catch (error) {
    console.error('Error saving contact:', error);
    return { success: false, message: 'Failed to save contact' };
  }
};

module.exports = { saveContact };