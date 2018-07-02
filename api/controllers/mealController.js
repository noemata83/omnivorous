'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('users');
// const Recipe = mongoose.model('Recipes');
const Meal = mongoose.model('Meals');

const createMeal = (req, res) => {
    User.findById(req.user._id, (err, foundUser) => {
        if (err) {
            res.send(err);
        } else {
            const newMeal = req.body;
            Meal.create(newMeal, (err, meal) => {
                if (err) {
                    res.send(err);
                } else {
                    meal.save();
                    foundUser.meals.push(recipe);
                    foundUser.save();
                    res.json(meal);
                    }
                });
            }
        });
    }