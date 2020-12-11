var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var userRouter = require('./routes/user');
var adminRouter = require('./routes/admin');
var employerRouter = require('./routes/employer');

var hbs = require('express-handlebars');

var app = express();
var db=require('./config/connection');
var session = require('express-session')

// view engine setup
app.set('views', path.join(__dirname, 'views'));

// app engine for hbs
app.set('view engine', 'hbs');
app.engine('hbs', hbs({extname:'hbs',defaultLayout:'layouts',layoutsDir:__dirname+'/views/layouts/',partialsDir:__dirname+'/views/partials/'}));

// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//db connection
db.connect((err)=>{
  if(err) console.log('connection error '+ err);
  else
  console.log('Database connected');
})
//sessions

app.use(session({ secret: 'key', cookie: { maxAge: 600000 }}))


app.use('/', userRouter);
app.use('/admin', adminRouter);
app.use('/employer',employerRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
