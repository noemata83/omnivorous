export const flattenForm = (form) => {
    console.log(form);
    const flattenedForm = {...form};
    delete flattenedForm.recipeIngredient;
    delete flattenedForm.recipeInstructions;
    form.recipeIngredient.forEach((ingredient, index) => {
        flattenedForm[`ing-${index}-amt`] = {...form.recipeIngredient[index].amount};
        flattenedForm[`ing-${index}-unit`] = {...form.recipeIngredient[index].unit};
        flattenedForm[`ing-${index}-name`] = {...form.recipeIngredient[index].ingredient};
        flattenedForm[`ing-${index}-comment`] = {...form.recipeIngredient[index].comment};
    });
    form.recipeInstructions.forEach((direction, index) => {
        flattenedForm[`direction-${index}`] = {...form.recipeInstructions[index].element};
    });
    return flattenedForm;
}