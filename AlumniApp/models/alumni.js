// The Alumni model

var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;
var mongoosePaginate = require('mongoose-paginate');


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

module.exports = mongoose.model('Alumni', alumniSchema,'alumni');