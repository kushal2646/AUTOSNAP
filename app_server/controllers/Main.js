const index = (req, res) => {
  res.render('index', { title: 'Auto Snap' });
};

module.exports = { index };
