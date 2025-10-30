// app_server/controllers/booking.js

// 1. Import the Appointment Model
// The path assumes appointmentModel.js is one directory up (../models/)
const Appointment = require('../models/appointmentModel'); 

/* GET Booking Form Page */
const bookingForm = (req, res) => {
  res.render('booking', {
    title: 'Schedule Appointment - AUTOSNAP'
  });
};

/* POST Booking Form Submission and Display Success Page */
const processAndShowSuccess = (req, res) => {
  console.log('New Booking Data Received:', req.body); 

  // Capture all the form data from the request body
  const formData = req.body;
  
  // *** 🌟 CRITICAL FIX: Date Parsing (Replaces original preferredDate line) 🌟 ***
  let preferredDateObject = null;
  // Check if the date is in DD/MM/YYYY format (e.g., 23/10/2025)
  if (formData.preferredDate) {
    const dateParts = formData.preferredDate.split('/');
    // Reformat to YYYY-MM-DD for reliable parsing: 2025-10-23
    const reliableDateString = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
    // Create the Date object
    preferredDateObject = new Date(reliableDateString);
  }
  // *************************************************************************
  
  // 2. Create a new Appointment document instance from the form data
  const newAppointment = new Appointment({
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    service: formData.service,
    
    // IMPORTANT: Use the safely parsed Date object
    preferredDate: preferredDateObject, 
    preferredTimeSlot: formData.preferredTimeSlot,
    
    carMake: formData.carMake,
    carModel: formData.carModel,
    
    // IMPORTANT: Convert kilometersRan string to a Number
    kilometersRan: parseInt(formData.kilometersRan), 
    fuelType: formData.fuelType,
    specialNotes: formData.specialNotes
  });

  // 3. Save the document to the database
  newAppointment.save()
    .then((result) => {
      console.log('Booking successfully saved to database:', result);
      
      // 4. After successful saving, render the success page
      res.render('booking-success', {
        title: 'Booking Confirmed! 🎉',
      });
    })
    .catch((err) => {
      console.error('Error saving booking to database:', err);
      
      // 5. Handle errors (e.g., missing required field)
      // Render the booking page again, optionally passing an error message
      res.render('booking', { 
        title: 'Schedule Appointment - AUTOSNAP',
        error: 'There was an error processing your booking. Please ensure all required fields are filled.',
        // Optionally pass req.body back so user doesn't lose input
        formData: formData 
      });
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