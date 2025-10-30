const mongoose = require('mongoose');
const dbURI = 'mongodb://localhost/autosnap'; // Check this if your connection string is different

// Helper function to handle connection options
const options = {
  // Removed deprecated options: useNewUrlParser and useUnifiedTopology
  // The Mongoose driver handles these settings correctly starting in v4.x
};

// 1. Capture the promise returned by mongoose.connect()
const dbConnectionPromise = mongoose.connect(dbURI, options);

// 2. Use the captured promise for internal logging
dbConnectionPromise
  .then(() => console.log('Mongoose connection open to ' + dbURI))
  .catch(err => console.log('Mongoose connection error:', err));

// CONNECTION EVENTS
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// --- FIX START ---
// The mongoose.connection.close() method no longer accepts a callback. 
// It now returns a Promise, so we use .then() for logging.
const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close() // *** CHANGE 1: Removed the callback argument ***
    .then(() => {
        console.log('Mongoose disconnected through ' + msg);
        callback(); // Now the callback is executed after the close Promise resolves
    })
    .catch((err) => {
        console.error('Error during Mongoose disconnection:', err);
        callback(); // Ensure callback is called even on error to continue shutdown
    });
};
// --- FIX END ---

// For nodemon restarts
process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});

// For app termination
process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});

// For Heroku app termination
process.on('SIGTERM', () => {
  gracefulShutdown('Heroku app shutdown', () => {
    process.exit(0);
  });
});

// *** MODEL REQUIRES (Keep only models you still use) ***
// require('./userModel'); 
// require('./locationModel');

// 3. Export the connection promise so bin/www can wait for the database connection
module.exports.dbConnectionPromise = dbConnectionPromise;