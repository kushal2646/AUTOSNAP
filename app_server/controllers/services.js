// app_server/controllers/services.js

/* GET main Services list page */
const servicesList = (req, res) => {
  res.render('services', { 
    title: 'Our Services - AUTOSNAP' 
  });
};

/* GET Body Repair Service detail page */
const bodyRepair = (req, res) => {
  res.render('body-repair-service', { 
    title: 'Body Repair Service - AUTOSNAP' 
  });
};

/* GET Car Care Service detail page */
const carCare = (req, res) => {
  res.render('car-care-service', { 
    title: 'Car Care Service - AUTOSNAP' 
  });
};

/* GET Preventive Maintenance Service detail page */
const preventiveMaintenance = (req, res) => {
  res.render('preventive-maintenance-service', { 
    title: 'Preventive Maintenance - AUTOSNAP' 
  });
};

module.exports = {
  servicesList,
  bodyRepair,
  carCare,
  preventiveMaintenance,
};