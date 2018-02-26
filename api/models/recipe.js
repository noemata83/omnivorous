'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
   amount: String,
   unit: String,
   ingredient: String,  // This should be converted, ultimately, to a reference to the ingredient model.
   comment: String
});

let ingredient = mongoose.model('Ingredients', ingredientSchema);

var RecipeSchema = new Schema({
   name: {
       type: String,
       required: 'Please enter the name of the recipe'
   },
   author: String,
   description: String,
   prepTime: Number,        // Let us plan to store the preparation time in seconds. We can always convert to a human readable format in implementation.
   cookTime: Number,
   totalTime: Number,
   recipeIngredient: [ingredientSchema],
   recipeInstructions: [String],
   recipeYield: String,
   history: [{              // Store the history of when the user has cooked this recipe, and what they thought of it.
       date: Date,
       notes: String
   }],
   image: String,
   datePublished: {
       type: Date,
       default: Date.now()
   },

});

module.exports = mongoose.model('Recipes', RecipeSchema);