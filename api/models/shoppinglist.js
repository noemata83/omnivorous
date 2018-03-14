'use strict';

/* 
I want to display shopping list items sorted by category in the view.
What is the best way to achieve this? The most logical way, to my mind is the following:
the shopping list stores an array of categories and an array of items (not broken up
by category). When adding an item to a shopping list, you choose from the categories 
defined on the shopping list. Each item on the shopping list lives in the (flat) item 
array. At runtime, we will filter that array by category for each category and spit out
the items.
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shoppingListItemSchema = new Schema({
    name: { 
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        default: 0,
    },
    unit: String,
    category: String,
    source: {
        type: [String], // when adding from a recipe, keep track of where recipe came from, and how much was called for
        default: []
    },
    purchased: {
        type: Boolean,
        default: false
    }
});

const shoppingListSchema = new Schema({
    name: String,
    _ownedby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    categories: [String],
    items: {
        type: [shoppingListItemSchema],
        default: [],
    }
});

mongoose.model('ShoppingList', shoppingListSchema, 'ShoppingList');