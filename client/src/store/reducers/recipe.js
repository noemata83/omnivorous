import * as actionTypes from '../actions/actionTypes';

const initialState = {
        recipes: [
            {
                _id: 1,
                title: "Hot Buttered Toast",
                description: "Warm toast with a great deal of butter on it.",
                prepTime: 5,
                ingredients: [{
                    amount: 1,
                    unit: "slice",
                    ingredient: "bread"
                },
                {
                    amount: 1,
                    unit: "dollop",
                    ingredient: "butter"
                }],
                directions: [
                    "Place bread in toaster, toast to desired toastiness",
                    "Spread butter copiously on bread. Enjoy."]
            },
            {
                _id: 2,
                title: "Soup from a can",
                description: "Moving up in the world",
                prepTime: 10,
                ingredients: [{
                    amount: 1,
                    unit: "can",
                    ingredient: "soup"
                }],
                directions: [
                    "Place can of soup in a saucepan over medium heat.",
                    "Heat to desired warmth and serve"]
            }
        ],
        currentRecipe: null,
    };

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.DISPLAY_RECIPE):
            return {
                ...state,
                currentRecipe: action.recipe
            }
        case (actionTypes.ADD_RECIPE):
            return {
                ...state,
                recipes: state.recipes.concat(action.recipe)
            }
        case (actionTypes.NEW_RECIPE):
            return {
                ...state,
                currentRecipe: null,
            }
        case (actionTypes.EDIT_RECIPE):
            const recipes = [...state.recipes];
            recipes.forEach((recipe, index) => {
                if (recipe._id === action.id) {
                    console.log("Let's update the recipe!")
                    recipes[index] = { ...action.updatedRecipe,
                                        _id: action.id }
                }
            });
            console.log(recipes);
            return {
                ...state,
                recipes: recipes
            }
        default:
            return state;
    }
}

export default reducer;