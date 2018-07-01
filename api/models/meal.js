const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MealSchema = new Schema({
    date: {
        type: Date,
        default: Date.now(),
    },
    meal: {
        type: String,
        enum: ['breakfast', 'brunch', 'lunch', 'snack', 'appetizer', 'dinner', 'dessert']
    },
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    }
});

module.exports = mongoose.model('Meals', MealSchema);
