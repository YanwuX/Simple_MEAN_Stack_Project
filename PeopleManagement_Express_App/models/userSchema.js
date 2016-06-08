var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var userSchema   = new Schema({
    fName: String,
  	lName: String,
  	age: Number,
  	tittle: String,
  	gender: String
});

module.exports = mongoose.model('userSchema', userSchema);