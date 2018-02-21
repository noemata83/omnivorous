'use strict';

const mongoose = require('mongoose'), 
Recipe = mongoose.model('Recipes'),
User = mongoose.model('users');
    
    let listRecipes = function(req, res) {
        User.findOne({ userId: req.params.userId }, (err, foundUser) => {
            if (err) 
             {  res.send(err);}
            else {
                res.json(foundUser.recipes);
            }
        });
    }
    
    let createRecipe = function(req, res) {
        User.findOne({ userId: req.params.userId }, (err, foundUser) => {
            if (err) {
                res.send(err);
            } else {
                let newRecipe = req.body;
                Recipe.create(newRecipe, (err, recipe) => {
                   if (err) {
                       res.send(err);
                   } else {
                    recipe.save();
                    foundUser.recipes.push(recipe);
                    foundUser.save();
                    res.json(recipe);
                    }
                });
            }
        });
    }
    
    let readRecipe = function(req, res) {
        Recipe.findById(req.params.id, function (err, recipe) {
            if (err)
            { res.send(err);}
            res.json(recipe);
        });
    }
    
    let updateRecipe = function(req, res) {
        Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, recipe) {
           if (err)
           { res.send(err); }
           else 
           { res.json(recipe); }
        });
    }
    
    let deleteRecipe = function(req, res) {
        /* Ultimately this route will need to be refactored substantially, depending upon how the "social"
         component of the app gets implemented. I would love to have it that one recipe can be held by 
         multiple users. In that case, we'd need to do a few things: check that the recipe is owned by the
         user accessing the route; delete the recipe from the user's recipe list; then check to see if any
         other user owns the recipe. If not, delete it from the database. */
         User.findOne({ userId: req.params.userId}, (err, foundUser) => {
             if (err) {
                 res.send("Something went wrong: ", err);
             } else {
                 const targetIndex = foundUser.recipes.map(recipe => recipe._id).indexOf(req.params.id);
                 foundUser.recipes.splice(targetIndex, 1);
                 foundUser.save();
                 Recipe.findByIdAndRemove(req.params.id, function(err) {
                    if (err) {
                        res.send(err); }
                    res.json({message: "Recipe deleted."});
                   });
             }
         } )
        
    }
    
    module.exports = {
        listRecipes,
        createRecipe,
        readRecipe,
        updateRecipe,
        deleteRecipe
    }