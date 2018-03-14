

module.exports = (app) => {
    const recipeController = require('../controllers/recipeController');

    app.route('/api/recipes/import')
    .post(recipeController.importRecipe);
    
    app.route('/api/recipes')
        .get(recipeController.listRecipes)
        .post(recipeController.createRecipe);
        
    app.route('/api/recipes/:id')
        .get(recipeController.readRecipe)
        .put(recipeController.updateRecipe)
        .delete(recipeController.deleteRecipe);
}
