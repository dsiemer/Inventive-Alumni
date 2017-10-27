/* The API controller
   exports methods
   * postUser - Creates a new User
   * login - login to app
   * getUserByEmail - returns a user by email
   * list - Returns a list of threads
   * show - Displays a thread and its posts
*/

var mongoose = require('mongoose');


var Alumni = require('../models/alumni.js');
var User = require('../models/user.js');

exports.getAlumni = function (req, res, next) {
   
    // res.setHeader('Access-Control-Allow-Origin','*');
    console.log("get all alumni")
    
    Alumni.find({}, function(err, alumni) {
        if (!err){ 
            console.log(alumni);
        } else {throw err;}
    });
};

exports.getUsers = function (req, res, next) {
    // res.setHeader('Access-Control-Allow-Origin','*');
    console.log("get all users");
    
    User.find({}, function(err, users) {
        if (!err){ 
            console.log(users);
            console.log(mongoose.connection.readyState);
            res.status(200).send(users);
        } else {throw err;}
    });

    // User.find(function(err, users) {
    //     if (err) {
    //         console.log(err)
    //         res.status(500).send(err)
    //         // res.send(500, err)
    //     } else {
    //         //res.status(200).send(users)
    //         // res.send(200,users);
    //         console.log(users);

    //     }
    // })
    // return next()
}

exports.postUser = function (req, res) {
    return new Promise(function(resolve, reject) {
        bcrypt.hash(req.body.pwd, SALT_ROUNDS, function(err, hash) {
            try {
                console.log('hashed pwd: ' + hash)
                if (hash) {
                    var user = new User()
                    user.email = req.body.email
                    user.pwd = hash
                    if (typeof req.body.isadmin != 'undefined') {
                        user.isadmin = req.body.isadmin
                    } else {
                        user.isadmin = false
                    }
                    
                    user.save(function(err1, result) {
                        if (err) {
                            console.log(err1)
                            reject(err1)
                        } else {
                            console.log(user.user + ' ' + ' user saved to database')
                            resolve(result)
                        }
                    })
                } else {
                    console.log('no password hash')
                    reject('no password hash')
                }
            } catch (err2) {
                console.error(err2)
                reject(err2)
            }
        })
    })
}

// exports.postUser = function(req, res) {
//     new User({email: req.body.email, pwd: req.body.pwd, isadmin: req.body.isadmin}).save();
// }

exports.login = function (req, res, next) {
    // res.setHeader('Access-Control-Allow-Origin','*');
    var pwd = req.body.pwd
    console.log("trying user: " + req.body.user  )
    User.findOne({ "user": req.body.user  }, async function(err,user) {
        if (user) {
            var tf = await comparepasswords(pwd, user.pwd)
            if (tf) {

                user.lastlogin = new Date()
                user.isloggedin = true
                user.save()

                console.log(user.user + ' logged in')
                res.send(200,user)
            } else {
                console.log('no login')
                res.send(500, 'login error')
            }
        } else {
            console.log('no login')
            res.send(500, 'login error')
        }
        return next()
    })
}


// exports.list = function(req, res) {
//   Thread.find(function(err, threads) {
//     res.send(threads);
//   });
// }

// first locates a thread by title, then locates the replies by thread ID.
// exports.show = (function(req, res) {
//     Thread.findOne({title: req.params.title}, function(error, thread) {
//         var posts = Post.find({thread: thread._id}, function(error, posts) {
//           res.send([{thread: thread, posts: posts}]);
//         });
//     })
// });


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

exports.getAlumniByQuery = function (req, res, next) {
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

exports.getUsersByEmail = function (req, res, next) {
    // res.setHeader('Access-Control-Allow-Origin','*');
    let email = req.params.email
    console.log("lookup user: " + user  )
    User.findOne({ "email": email }, function(err,user) {
        if (err) {
            console.log('ERR: '+ err)
            res.send(500, err)
        }
        if (user) {
            res.send(200,user)
        } else {
            console.log(user+' not Found')
            res.send(500, user+' not Found')
        }
        return next()
    })
}

exports.postAlumni = function (req, res, next) {
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
    alumni.question1 = req.body.question1
    alumni.answer1 = req.body.answer1
    alumni.question2 = req.body.question2
    alumni.answer2 = req.body.answer2
    alumni.question3 = req.body.question3
    alumni.answer3 = req.body.answer3
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

