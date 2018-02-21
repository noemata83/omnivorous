import ingredientForm from '../formPrototypes/ingredientForm';
import directionForm from '../formPrototypes/directionForm';
import recipeForm from '../formPrototypes/recipeForm';
import { checkValidity } from '../../../shared/utility';

const updateIngredients = (ingredients) => {
    const ingredientsArray = [];
    ingredients.forEach(ingredient => {
        ingredientsArray.push({
            amount: {
                ...ingredientForm.amount,
                value: ingredient.amount,
                valid: checkValidity(ingredient.amount, ingredientForm.amount.validation),
                touched: true
            },
            unit: {
                ...ingredientForm.unit,
                value: ingredient.unit,
                valid: checkValidity(ingredient.unit, ingredientForm.unit.validation),
                touched: true
            },
            ingredient: {
                ...ingredientForm.ingredient,
                value: ingredient.ingredient,
                valid: checkValidity(ingredient.ingredient, ingredientForm.ingredient.validation),
                touched: true
            },
            comment: {
                ...ingredientForm.comment,
                value: ingredient.comment,
                valid: checkValidity(ingredient.comment, ingredientForm.comment.validation),
                touched: true
            }
        });
    })
    return ingredientsArray;
}

export const updateForm = (form, recipe) => {
    if (!recipe) {
        return JSON.parse(JSON.stringify(recipeForm));
    }
    Object.keys(form).forEach(key => {
        if (key !== "ingredients" || key !== "directions") {
            form[key].value = recipe[key] || '';
            form[key].valid = checkValidity(form[key].value, form[key].validation);
            form[key].touched = true;
        }
    });
    const ingredientsArray = updateIngredients(recipe.ingredients);
    const directionsArray = [];
    recipe.directions.forEach(direction => {
        let updatedDirection = {
            element: {
                ...directionForm.element,
                value: direction
            }
        };
        console.log("updated Direction: ", updatedDirection);
        directionsArray.push(updatedDirection);
        console.log(directionsArray);
    });
    return {
        ...form,
        ingredients: [...ingredientsArray],
        directions: [...directionsArray]
    };
}

