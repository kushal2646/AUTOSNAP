module.exports.homelist = (req, res) => {
  res.render('index', { title: 'Auto Snap' });
};

module.exports.servicesList = (req, res) => {
  res.render('services', { title: 'Services' });
};

module.exports.dashboard = (req, res) => {
  res.render('dashboard', { title: 'Dashboard' });
  
};



module.exports.bookingPage = (req, res) => {
  res.render('booking', { title: 'Booking' });
};

module.exports.bookingSuccess = (req, res) => {
  res.render('booking-success', { title: 'Booking Success' });
};
