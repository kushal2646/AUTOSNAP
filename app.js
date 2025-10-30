// -------------------- Imports --------------------
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors'); // ✅ Add this line

// -------------------- Routers --------------------
var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var detailsRouter = require('./app_server/routes/details'); // ✅ Already correct

// -------------------- App Setup --------------------
var app = express();

// ✅ Enable CORS (important for frontend requests)
app.use(cors());

// ✅ Serve static files (public folder)
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Set up Jade views
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'jade');

// ✅ Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ✅ Route registrations
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/details', detailsRouter);

// ✅ Health check route (for Render and your testing)
app.get('/api/test', (req, res) => {
  res.json({ message: '✅ Autosnap backend is working fine!' });
});

// -------------------- Error Handling --------------------

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error', { title: 'Error' });
});

// -------------------- Export --------------------
module.exports = app;
