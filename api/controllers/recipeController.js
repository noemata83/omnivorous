'use strict';

var mongoose = require('mongoose'), 
    Recipe = mongoose.model('Recipes');
    
    let listRecipes = function(req, res) {
        Recipe.find({}, function(err, recipe) {
           if (err) 
             {  res.send(err);}
           res.json(recipe);
        });
    }
    
    let createRecipe = function(req, res) {
        let newRecipe = Recipe(req.body);
        newRecipe.save(function (err, recipe) {
            if (err)
            { res.send(err);}
            res.json(recipe);
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