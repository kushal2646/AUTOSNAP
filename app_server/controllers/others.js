module.exports.about = (req, res) => {
  res.render('about', { title: 'About AutoSnap' });
};

module.exports.contact = (req, res) => {
  res.render('contact', { title: 'Contact AutoSnap' });
};
