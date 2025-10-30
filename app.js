var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose'); // ✅ Added

// Routers
var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var detailsRouter = require('./app_server/routes/details'); // ✅ Added

var app = express();

// ✅ MongoDB connection (Atlas or local)
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/autosnap';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected successfully');
})
.catch(err => {
  console.error('❌ Database connection failed:', err);
  process.exit(1); // exit if cannot connect
});

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'jade'); // Jade is now Pug, but alias still works

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ✅ Route registrations
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/details', detailsRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error', { title: 'Error' }); // ✅ Added title to avoid undefined error
});

module.exports = app;
