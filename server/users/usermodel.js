var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');


var UserSchema = mongoose.Schema({
  local : {
    username: String,
    password: String
  }
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


// UserSchema.methods.comparePasswords = function(candidatePassword) {
//   var savedPassword = this.password;
//   return Q.Promise(function(resolve, reject) {
//     bcrypt.compare(candidatePassword, savedPassword, function(err, isMatch) {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(isMatch);
//       }
//     });
//   });
// };

// UserSchema.pre('save', function(next) {
//   var user = this;

//   if (!user.isModified('password')) {
//     return next();
//   }

//   bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
//     if (err) {
//       return next(err);
//     }

//     bcrypt.hash(user.password, salt, null, function(err, hash) {
//       if (err) {
//         return next(err);
//       }
//       user.password = hash;
//       user.salt = salt;
//       next();
//     });
//   });
// });

// var userModel = mongoose.model('users', UserSchema);

// module.exports = userModel;