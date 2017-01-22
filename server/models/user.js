console.log('Users model');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
  name: {
    type: String
  }
}, {
    timestamps:true
});

mongoose.model('User', UserSchema);
