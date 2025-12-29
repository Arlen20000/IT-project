const portfolioService = require('../services/portfolioService');

const getProjects = (req, res) => {
  try {
    const projects = portfolioService.getAllProjects();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

const getProject = (req, res) => {
  try {
    const project = portfolioService.getProjectById(req.params.id);
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project' });
  }
};

module.exports = { getProjects, getProject };