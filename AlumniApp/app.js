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


var app = express();

//mongodb
var mongodbUri = 'mongodb://alumni:alumni@ds231725.mlab.com:31725/inventive_alumni';
mongoose.Promise = global.Promise;
mongoose.connect(mongodbUri, { useMongoClient: true });
let db = mongoose.connection;
//mongo error
db.on('error', console.error.bind(console, 'connection error:'));
//mongo open
db.once('open', function() {console.log('db connection open')});

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
});
userSchema.plugin(mongoosePaginate);

var Alumni = mongoose.model('Alumni', alumniSchema);
var User = mongoose.model('User', userSchema);



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
app.use('/signIn', signIn);
app.use('/userform', userform);



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

function hashpassword(pwd) {
    return new Promise(function(resolve, reject) {
        bcrypt.hash(pwd, SALT_ROUNDS, function(err, hash) {
            if (err) reject(err)
            resolve(hash)
        })
    })
}

function comparepasswords(hash1, hash2) {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(hash1, hash2, function(err, tf) {
            if (err) reject(err)
            resolve(tf)
        })
    })
}

function getAlumniByQuery(req, res, next) {
    // res.setHeader('Access-Control-Allow-Origin','*');
    query = req.query
    console.log("get: by query params " + JSON.stringify(query))
    Alumni.find(query, function(err, alumni) {
        if (err) {
            console.log(err)
            res.send(500, err)
        } else {
            //console.log(alumnis)
            res.send(alumni)
        }
    })
}

function getUserByEmail(req, res, next) {
    // res.setHeader('Access-Control-Allow-Origin','*');
    query = req.query
    console.log("get: by query params " + JSON.stringify(query))
    Alumni.find(query, function(err, alumni) {
        if (err) {
            console.log(err)
            res.send(500, err)
        } else {
            //console.log(alumnis)
            res.send(alumni)
        }
    })
}

function postAlumni(req, res, next) {
    // res.setHeader('Access-Control-Allow-Origin','*');
    console.log("post")
    var alumni = new Alumni()
    // var dateformatted = formatNow()
    var date = new Date()

    alumni.name = req.body.name
    alumni.email = req.body.email
    alumni.description = req.body.description
    alumni.bio = req.body.bio
    alumni.projects = req.body.projects
    alumni.question = req.body.question
    alumni.answer = req.body.answer
    alumni.graduationDate = req.body.graduationDate
    alumni.comments = req.body.comments

    alumni.save(function(err, result) {
        if (err) {
            console.log(err)
            res.send(500, err)
        } else {
            console.log(alumni.firstname + ' ' + alumni.lastname + ' saved to database')
            res.send(result)
        }
    })
}