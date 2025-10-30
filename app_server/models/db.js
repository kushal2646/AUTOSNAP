// db.js
const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost/autosnap';

// Connection options (Mongoose 6+ handles most defaults well)
const options = {};

// Connect to MongoDB
const dbConnectionPromise = mongoose.connect(dbURI, options);

// Log connection result
dbConnectionPromise
  .then(() => console.log(`✅ Mongoose connected to ${dbURI}`))
  .catch((err) => console.error('❌ Mongoose connection error:', err));

// Connection events
mongoose.connection.on('connected', () => {
  console.log(`🔌 Mongoose connection open to ${dbURI}`);
});

mongoose.connection.on('error', (err) => {
  console.error('⚠️ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('🔌 Mongoose disconnected');
});

// Graceful shutdown handler
const gracefulShutdown = async (msg, callback) => {
  try {
    await mongoose.connection.close();
    console.log(`🛑 Mongoose disconnected through ${msg}`);
  } catch (err) {
    console.error('Error during Mongoose disconnection:', err);
  } finally {
    callback();
  }
};

// Handle termination signals
process.once('SIGUSR2', () =>
  gracefulShutdown('nodemon restart', () => process.kill(process.pid, 'SIGUSR2'))
);

process.on('SIGINT', () =>
  gracefulShutdown('app termination', () => process.exit(0))
);

process.on('SIGTERM', () =>
  gracefulShutdown('Heroku app shutdown', () => process.exit(0))
);

// Optional: Load models here
// require('./userModel');
// require('./locationModel');

// Export the connection promise
module.exports = { dbConnectionPromise };