const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
   googleId: String,
   recipes: [{
       id: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Recipe"
       },
       title: String
   }]
});

mongoose.model('users', UserSchema);