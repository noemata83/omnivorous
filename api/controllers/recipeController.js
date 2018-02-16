'use strict';

const mongoose = require('mongoose'), 
Recipe = mongoose.model('Recipes'),
User = mongoose.model('users');
    
    let listRecipes = function(req, res) {
        User.findOne({ userId: req.params.userId }).populate("recipes").exec( (err, foundUser) => {
            if (err) 
             {  res.send(err);}
            else {
                res.json(foundUser);
            }
        });
    }
    
    let createRecipe = function(req, res) {
        User.findOne({ username: req.params.userId }, (err, foundUser) => {
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
                    res.json(foundUser.recipes);
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
        Recipe.findByIdAndUpdate(req.params.id, req.body, function(err, recipe) {
           if (err)
           { res.send(err); }
           else 
           { res.json(recipe); }
        });
    }
    
    let deleteRecipe = function(req, res) {
        Recipe.remove({_id: req.params.id}, function(err) {
         if (err) {
             res.send(err); }
         res.json({message: "Recipe deleted."});
        })
    }
    
    module.exports = {
        listRecipes,
        createRecipe,
        readRecipe,
        updateRecipe,
        deleteRecipe
    }