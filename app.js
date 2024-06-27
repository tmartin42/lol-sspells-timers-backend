var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var getPlayerGameRouter = require('./routes/getPlayerGame');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const corsOptions = {
  origin: 'http://localhost:8080',//(https://your-client-app.com)
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));


const championsRepo = require('./repos/champions.js')
const sSpellsRepo = require('./repos/sSpells.js')

const { getSummonerAndChampions } = require('./services/ddragonApi.js')


// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:8080"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
//   console.log(req)
//   if (req.method == "OPTIONS") {
//     res.header(response.ok)
//     return
//   }
//   next();
// });


getSummonerAndChampions().then(({champions, sSpells}) => {

  championsRepo.set(champions)
  sSpellsRepo.set(sSpells)

});

app.use('/', indexRouter);
app.use('/users', usersRouter);  
app.use('/getPlayerGame', getPlayerGameRouter);


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
