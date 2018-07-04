"use strict";

const mongoose = require("mongoose");
const User = mongoose.model("users");
// const Recipe = mongoose.model('Recipes');
const Meal = mongoose.model("Meals");

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
};

const getMeals = (req, res) => {
  User.findById(req.user._id).then(user => {
    User.populate(user, { path: "meals", populate: "meal" }, (err, user) => {
      res.json(user.meals);
    });
  });
};

const deleteMeal = (req, res) => {
  User.findById(req.user._id).then(user => {
    if (!user) {
      res.send("Something went wrong.");
    } else {
      user.meals = user.meals.filter(
        meal => meal.toHexString() !== req.params.id
      );
      user.save();
    }
    Meal.findByIdAndRemove(req.params.id, err => {
      if (err) {
        return res.send(err);
      }
      res.json({ message: "Meal Deleted." });
    });
  });
}
