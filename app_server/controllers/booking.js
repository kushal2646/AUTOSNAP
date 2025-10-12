// app_server/controllers/booking.js

/* GET Booking Form Page */
const bookingForm = (req, res) => {
  res.render('booking', {
    title: 'Schedule Appointment - AUTOSNAP'
  });
};

/* POST Booking Form Submission and Display Success Page */
const processAndShowSuccess = (req, res) => {
  console.log('New Booking Data Received:', req.body); 

  // After processing data, render the success page
  res.render('booking-success', {
    title: 'Booking Confirmed! 🎉',
  });
};

/* GET Booking Success Page (for direct access or redirect) */
const bookingSuccessPage = (req, res) => {
  res.render('booking-success', { 
    title: 'Booking Success! 🎉' 
  });
};


module.exports = {
  bookingForm,
  processAndShowSuccess,
  bookingSuccessPage 
};