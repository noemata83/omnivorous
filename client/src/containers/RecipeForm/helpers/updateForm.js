import ingredientForm from '../formPrototypes/ingredientForm';
import directionForm from '../formPrototypes/directionForm';
import recipeForm from '../formPrototypes/recipeForm';

const updateIngredients = (ingredients) => {
    const ingredientsArray = [];
    ingredients.forEach(ingredient => {
        ingredientsArray.push({
            amount: {
                ...ingredientForm.amount,
                value: ingredient.amount
            },
            unit: {
                ...ingredientForm.unit,
                value: ingredient.value
            },
            ingredient: {
                ...ingredientForm.ingredient,
                value: ingredient.ingredient
            },
            comment: {
                ...ingredientForm.comment,
                value: ingredient.comment
            }
        });
    })
    return ingredientsArray;
}

const updateForm = (form, recipe) => {
    if (!recipe) {
        return JSON.parse(JSON.stringify(recipeForm));
    }
    Object.keys(form).forEach(key => {
        if (key !== "ingredients" || key !== "directions") {
            form[key].value = recipe[key] || '';
        }
    });
    const ingredientsArray = updateIngredients(recipe.ingredients);
    const directionsArray = [];
    recipe.directions.forEach(direction => {
        directionsArray.push({
            ...directionForm,
            value: direction
        });
    });
    return {
        ...form,
        ingredients: [...ingredientsArray],
        directions: [...directionsArray]
    };
}

export default updateForm;