'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ingredientSchema = new Schema({
   amount: Number,
   unit: String,
   ingredient: String,  // This should be converted, ultimately, to a reference to the ingredient model.
   comment: String
});

let ingredient = mongoose.model('Ingredients', ingredientSchema);

var RecipeSchema = new Schema({
   title: {
       type: String,
       required: 'Please enter the name of the recipe'
   },
   description: String,
   prepTime: Number,        // Let us plan to store the preparation time in minutes. We can always convert to a human readable format in implementation.
   ingredients: [ingredientSchema],
   directions: [String],
   history: [{              // Store the history of when the user has cooked this recipe, and what they thought of it.
       date: Date,
       notes: String
   }],
   imgURL: String,
});

module.exports = mongoose.model('Recipes', RecipeSchema);