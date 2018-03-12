'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
   amount: String,
   unit: String,
   name: String,  // This should be converted, ultimately, to a reference to the ingredient model.
   comment: String
});

let ingredient = mongoose.model('Ingredients', ingredientSchema);

var RecipeSchema = new Schema({
   name: {
       type: String,
       required: 'Please enter the name of the recipe'
   },
   author: String,
   source: String,
   description: String,
   prepTime: String,
   cookTime: String,
   totalTime: String,
   recipeCategory: String,
   cookingMethod: String,
   recipeIngredient: [ingredientSchema],
   recipeInstructions: [String],
   recipeYield: String,
   history: [{              // Store the history of when the user has cooked this recipe, and what they thought of it.
       date: Date,
       notes: String
   }],
   image: String,
   nutrition: String,
   recipeCuisine: String,
   suitableForDiet: String,
   datePublished: {
       type: Date,
       default: Date.now()
   },

});

module.exports = mongoose.model('Recipes', RecipeSchema);