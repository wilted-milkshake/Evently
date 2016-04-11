var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');


var UserSchema = mongoose.Schema({
  local : {
    username: String,
    password: String
  },
  events: []
});

// methods ======================
// generating a hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

var UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;

// var Q = require('q');
// var mongoose = require('mongoose');
// var bcrypt = require('bcrypt-nodejs');
// var SALT_WORK_FACTOR = 10;
// // var Event = require('../events/eventmodel');


// var UserSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true
//   },

//   password: {
//     type: String,
//     required: true
//   },

//   salt: String,
//   events: [{
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Event'
//     }]
// });