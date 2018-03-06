export const recipeHeader = [
    { label: 'Name', name: 'name', type: 'text', style: 'Input' },
    { label: 'Description', name: 'description', type: 'textarea', style: 'Input' },
    { label: 'Time to Prep', name: 'prepTime', type:'number', style: 'InlineInput' },
    { label: 'Time to Cook', name: 'cookTime', type: 'number', style: 'InlineInput'},
    { label: 'Number of Servings', name: 'recipeYield', type:'number', style: 'InlineInput' },
    { label: 'Category', name: 'recipeCategory', type: 'text', style: 'InlineInput' },
    { label: 'Cooking Method', name: 'cookingMethod', type: 'text', style: 'InlineInput' },
    { label: 'Image URL', name: 'image', type:'url', style: 'Input'},   
];

export const recipeFooter = [
    { label: 'Nutrition Information', name: 'nutrition', type: 'text', style: 'Input' },
    { label: 'Cuisine', name: 'recipeCuisine', type: 'text', style: 'InlineInput' },
    { label: 'Special Diets', name: 'suitableForDiet', type: 'text', style: 'InlineInput'}
]