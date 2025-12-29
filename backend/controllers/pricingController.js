const pricingService = require('../services/pricingService');

const getPackages = (req, res) => {
  try {
    const packages = pricingService.getAllPackages();
    res.json(packages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pricing packages' });
  }
};

const getPackage = (req, res) => {
  try {
    const pkg = pricingService.getPackageById(req.params.id);
    if (pkg) {
      res.json(pkg);
    } else {
      res.status(404).json({ error: 'Package not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch package' });
  }
};

module.exports = { getPackages, getPackage };