const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the structure for an Appointment document.
// The fields here correspond to the 'name' attributes in your booking form (booking.jade).
const appointmentSchema = new Schema({
  // Contact Info
  name: { 
    type: String, 
    required: [true, 'Full Name is required'] 
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'] 
  },
  phone: String,
  
  // Service Info
  service: { 
    type: String, 
    required: [true, 'Service selection is required'] 
  },
  
  // Vehicle Details
  carMake: String,
  carModel: String,
  kilometersRan: Number, // Stored as a Number
  fuelType: String,
  
  // Time and Notes
  preferredDate: { 
    type: Date, // Stored as a Date object
    required: [true, 'Preferred Date is required'] 
  },
  preferredTimeSlot: { 
    type: String, 
    required: [true, 'Preferred Time Slot is required'] 
  },
  specialNotes: String
  
}, { 
  timestamps: true // Adds 'createdAt' and 'updatedAt' fields automatically
});

// Create the Model. Mongoose will create a collection named 'appointments' from this.
const Appointment = mongoose.model('Appointment', appointmentSchema);

// Export the Model so other files (like booking.js) can use it.
module.exports = Appointment;