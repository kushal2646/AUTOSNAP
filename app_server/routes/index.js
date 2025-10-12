const express = require('express');
const router = express.Router();

const ctrlLocations = require('../controllers/locations');
const ctrlOthers = require('../controllers/others');

/* Location pages */
router.get('/', ctrlLocations.homelist);                 // Homepage
router.get('/services', ctrlLocations.servicesList);     // Services listing
router.get('/dashboard', ctrlLocations.dashboard);    // Dashboard page
router.get('/booking', ctrlLocations.bookingPage);        // Booking page
router.get('/booking-success', ctrlLocations.bookingSuccess); // Booking success page

/* Other pages */
router.get('/about', ctrlOthers.about);
router.get('/contact', ctrlOthers.contact);

module.exports = router;
