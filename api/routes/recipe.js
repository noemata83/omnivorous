module.exports = (app) => {
    const recipeController = require('../controllers/recipeController');

    app.route('/api/:userId/recipes')
        .get(recipeController.listRecipes)
        .post(recipeController.createRecipe);
        
    app.route('/api/:userId/recipes/:id')
        .get(recipeController.readRecipe)
        .put(recipeController.updateRecipe)
        .delete(recipeController.deleteRecipe);
}
