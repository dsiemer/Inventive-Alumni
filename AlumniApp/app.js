var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var secret = "don't tell anyone"
const SALT_ROUNDS = 10;
var mongoosePaginate = require('mongoose-paginate');


var index = require('./routes/index');
var users = require('./routes/users');
var alumniDetails = require('./routes/alumniDetails');
var userform = require('./routes/userform');
var signIn = require('./routes/signIn');
var userform = require('./routes/userform');



var app = express();


//mongodb
var mongodbUri = 'mongodb://alumni:alumni@ds231725.mlab.com:31725/inventive_alumni';
mongoose.Promise = global.Promise;
mongoose.connect(mongodbUri, { useMongoClient: true });
let db = mongoose.connection;
//mongo error
db.on('error', console.error.bind(console, 'connection error:'));
//mongo open
<<<<<<< HEAD
db.once('open', function() {
	console.log('db readystate: '+ db.readyState);
=======
db.once('open', function() {console.log('db connection open')
                            console.log('Let the coding begin!')});

var ObjectId = require('mongodb').ObjectID;

var Schema = mongoose.Schema;
var alumniSchema = new Schema({
    name: String,
    email: String,
    descripton: String,
    bio: String,
    question1: String,
    answer1: String,
    question2: String,
    answer2: String,
    question3: String,
    answer3: String,
    graduationDate: Date,
    comments: String,
    projects: [
    	{ 
	    	image: String,
	    	name: String,
	    	description: String,
	    	repository: String,
	    	tags:[]
    	}
    ]
});
alumniSchema.plugin(mongoosePaginate);

var userSchema = new Schema({
    email: String,
    pwd: String,
    lastlogin: Date,
    isloggedin: Boolean,
    isadmin: {
        type: Boolean,
        default: false
    }
>>>>>>> 771232614a3abfe0fbceff57742f0ed3a5472b3f
});
var api = require('./controllers/api.js');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/alumniDetails', alumniDetails);
<<<<<<< HEAD
// app.use('/userform', userform);
app.use('/getUsers',api.getUsers);
app.use('/getAlumni',api.getAlumni);
=======
app.use('/signIn', signIn);
app.use('/userform', userform);

>>>>>>> 771232614a3abfe0fbceff57742f0ed3a5472b3f


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
