const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
   userId: String,
   displayName: String,
   recipes: [{
       id: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Recipe"
       },
       name: String
   }]
});

mongoose.model('users', UserSchema);