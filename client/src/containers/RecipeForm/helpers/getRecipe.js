export const getRecipe = (form) => {
    const recipe = {};
    for (let formElementIdentifier in form) {
        if (formElementIdentifier === "recipeIngredient") {
            recipe.recipeIngredient = form.recipeIngredient.map(ingredient => { return {
                amount: ingredient.amount.value,
                unit: ingredient.unit.value,
                ingredient: ingredient.ingredient.value,
                comment: ingredient.comment.value
            }});
        } else if (formElementIdentifier === 'recipeInstructions') {
            recipe.recipeInstructions = form.recipeInstructions.map(direction => direction.element.value);  
        } else {
            recipe[formElementIdentifier] = form[formElementIdentifier].value;
        }
    }
    return recipe;
}