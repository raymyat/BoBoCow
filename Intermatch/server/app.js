var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//app is an express app
var app = express();
var cors = require('cors');
app.use(cors({
  //origin is the domain that you want to allow
  origin:['http://localhost:4200','http://127.0.0.1:4200'],
  credentials: true

}));
var mongoose =require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin1234:meow1234@ds046677.mlab.com:46677/intermatch',{useNewUrlParser: true});
//passport
var passport = require('passport');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
app.use(express.static(path.join(__dirname,'../dist/front-end')));
app.use(bodyParser.json());
app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname,'../dist/project/index.html'));
});
app.use(session({
  //name of cookie
  name:'myname.sid',
  resave:false,
  saveUninitialized:false,
  secret:'secret',
  cookie:{
    maxAge:36000000,
    httpOnly:false,
    secure:false
  },
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
require('./passport.config'); //passport local strategy// import strategy
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/users', usersRouter);

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
