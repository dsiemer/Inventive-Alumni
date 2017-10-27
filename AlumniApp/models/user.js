// The User model

var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;
// var mongoosePaginate = require('mongoose-paginate');

var userSchema = new Schema({
    email: String,
    pwd: String,
    lastlogin: Date,
    isadmin: {
        type: Boolean,
        default: false
    }
});
// userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', userSchema,'user');