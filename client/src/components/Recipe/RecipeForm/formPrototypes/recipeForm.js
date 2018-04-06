export const recipeHeader = [
    { label: 'Name', name: 'name', type: 'text', fullWidth: true, style: {} },
    { label: 'Author', name: 'author', type: 'text', style: {width: '30%'}},
    { label: 'Description', name: 'description', type: 'textarea', fullWidth: true },
    { label: 'Time to Prep', name: 'prepTime', type:'number', style: {width: '30%'} },
    { label: 'Time to Cook', name: 'cookTime', type: 'number', style: {width: '30%'}},
    { label: 'Recipe Yield', name: 'recipeYield', type:'text', style: {width: '30%'} },
    { label: 'Category', name: 'recipeCategory', type: 'text', style: {width: '30%'} },
    { label: 'Cooking Method', name: 'cookingMethod', type: 'text', style: {width: '30%'} },
    { label: 'Image URL', name: 'image', type:'url', fullWidth: false, style: {}},   
];

export const recipeFooter = [
    { label: 'Nutrition Information', name: 'nutrition', type: 'text', style: 'Input' },
    { label: 'Cuisine', name: 'recipeCuisine', type: 'text', style: 'InlineInput' },
    { label: 'Special Diets', name: 'suitableForDiet', type: 'text', style: 'InlineInput'}
]