const servicesService = require('../services/servicesService');

const getServices = (req, res) => {
  try {
    const services = servicesService.getAllServices();
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
};

const getService = (req, res) => {
  try {
    const service = servicesService.getServiceById(req.params.id);
    if (service) {
      res.json(service);
    } else {
      res.status(404).json({ error: 'Service not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch service' });
  }
};

module.exports = { getServices, getService };