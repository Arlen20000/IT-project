const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/services.json');

const getAllServices = () => {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading services data:', error);
    return [];
  }
};

const getServiceById = (id) => {
  const services = getAllServices();
  return services.find(service => service.id === parseInt(id));
};

module.exports = { getAllServices, getServiceById };