var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');


// import KcAdminClient from 'keycloak-admin'

// const adminClient = new KcAdminClient({
//     baseUrl: 'http://localhost:8080/auth',
//     realmName: 'hexadefence'
// })

// let execute = async function () {

//     await adminClient.auth({
//         username: 'user1',
//         password: '123',
//         grantType: 'password',
//         clientId: 'MATP'
//     })

//     const users = await adminClient.users.find();

//     console.log(users)
// }

// execute();


const keycloak = require('./config/keycloak-config').initKeycloak();
var testController = require('./controller/test-controller');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');

//APIs
var storesRouter = require('./routes/api/stores');
var productsAPIRouter = require('./routes/api/products');
var usersAPIRouter = require('./routes/api/users');

var mongoose = require('mongoose');
mongoose.connect('mongodb://mongodb:27017/crud', { useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'CONNECTION ERROR'));
db.once('open', function () {
  //we're connected!
  console.log('Connected');
})

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json()) 

console.log("before");
// const keycloak = require('./config/keycloak-config').initKeycloak();
console.log("after");

app.use(keycloak.middleware());  ////////////////////////////

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public',express.static(path.resolve(__dirname, 'public'))); // assets

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/api/stores', storesRouter);
app.use('/api/products', productsAPIRouter);
app.use('/api/users', usersAPIRouter);
app.use('/test', testController);


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

app.get('/', function(req, res){
  res.send("Server is up!");
});

module.exports = app;