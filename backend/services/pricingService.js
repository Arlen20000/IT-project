const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/pricing.json');

const getAllPackages = () => {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading pricing data:', error);
    return [];
  }
};

const getPackageById = (id) => {
  const packages = getAllPackages();
  return packages.find(pkg => pkg.id === parseInt(id));
};

module.exports = { getAllPackages, getPackageById };