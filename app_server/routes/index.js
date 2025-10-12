// app_server/routes/index.js

const express = require('express');
const router = express.Router();

// 1. Import ALL controllers
const ctrlLocations = require('../controllers/locations');
const ctrlOthers = require('../controllers/others');
const ctrlServices = require('../controllers/services');
const ctrlBooking = require('../controllers/booking'); // New booking controller

/* --- Core Pages --- */
router.get('/', ctrlLocations.homelist); 
router.get('/dashboard', ctrlLocations.dashboard);
router.get('/about', ctrlOthers.about);
router.get('/contact', ctrlOthers.contact);

/* --- Services Routes --- */
router.get('/services', ctrlServices.servicesList); 
router.get('/preventive-maintenance-service', ctrlServices.preventiveMaintenance);
router.get('/body-repair-service', ctrlServices.bodyRepair);
router.get('/car-care-service', ctrlServices.carCare);

/* --- Booking Routes (using the dedicated ctrlBooking) --- */
router.get('/booking', ctrlBooking.bookingForm); // Renders the form
router.post('/booking-success', ctrlBooking.processAndShowSuccess); // Handles form submission
router.get('/booking-success', ctrlBooking.bookingSuccessPage); // Renders the success page

module.exports = router;