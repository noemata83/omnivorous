const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
   username: String,
   password: String,
   recipes: [{
       id: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Recipe"
       },
       title: String
   }]
});

module.exports = mongoose.model('Users', UserSchema);