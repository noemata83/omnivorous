export const flattenForm = (form) => {
    console.log(form);
    const flattenedForm = {...form};
    delete flattenedForm.ingredients;
    delete flattenedForm.directions;
    form.ingredients.forEach((ingredient, index) => {
        flattenedForm[`ing-${index}-amt`] = {...form.ingredients[index].amount};
        flattenedForm[`ing-${index}-unit`] = {...form.ingredients[index].unit};
        flattenedForm[`ing-${index}-name`] = {...form.ingredients[index].ingredient};
        flattenedForm[`ing-${index}-comment`] = {...form.ingredients[index].comment};
    });
    form.directions.forEach((direction, index) => {
        flattenedForm[`direction-${index}`] = {...form.directions[index].element};
    });
    return flattenedForm;
}