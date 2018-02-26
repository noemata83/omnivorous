export const getRecipe = (form) => {
    const recipe = {};
    for (let formElementIdentifier in form) {
        if (formElementIdentifier === "ingredients") {
            recipe.recipeIngredient = form.ingredients.map(ingredient => { return {
                amount: ingredient.amount.value,
                unit: ingredient.unit.value,
                ingredient: ingredient.ingredient.value,
                comment: ingredient.comment.value
            }});
        } else if (formElementIdentifier === 'directions') {
            recipe.recipeDirections = form.directions.map(direction => direction.element.value);  
        } else {
            recipe[formElementIdentifier] = form[formElementIdentifier].value;
        }
    }
    return recipe;
}