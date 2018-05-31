const inlineStyle = {
    width: '30%',
    marginRight: '3%'
}
export const recipeHeader = [
    { label: 'Name', name: 'name', type: 'text', fullWidth: true },
    { label: 'Author', name: 'author', type: 'text', style: inlineStyle},
    { label: 'Description', name: 'description', fullWidth: true, multiline: true, rows: 2, rowsMax: 4},
    { label: 'Time to Prep', name: 'prepTime', type:'number', style: inlineStyle },
    { label: 'Time to Cook', name: 'cookTime', type: 'number', style: inlineStyle},
    { label: 'Recipe Yield', name: 'recipeYield', type:'text', style: inlineStyle },
    { label: 'Category', name: 'recipeCategory', type: 'text', style: inlineStyle },
    { label: 'Cooking Method', name: 'cookingMethod', type: 'text', style: inlineStyle },
    { label: 'Image URL', name: 'image', type:'url', fullWidth: false },   
];

export const recipeFooter = [
    { label: 'Nutrition Information', name: 'nutrition', type: 'text', multiline: true, rows: 2, rowsMax: 4, fullWidth: true },
    { label: 'Cuisine', name: 'recipeCuisine', type: 'text', style: {width: '30%'} },
    { label: 'Special Diets', name: 'suitableForDiet', type: 'text', style: {width: '30%'}}
]