const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/portfolio.json');

const getAllProjects = () => {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading portfolio data:', error);
    return [];
  }
};

const getProjectById = (id) => {
  const projects = getAllProjects();
  return projects.find(project => project.id === parseInt(id));
};

module.exports = { getAllProjects, getProjectById };