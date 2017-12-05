module.exports = function(app) {
    var recipeController = require('../controllers/recipeController');

    app.route('/recipes')
        .get(recipeController.listRecipes)
        .post(recipeController.createRecipe);
        
    app.route('/recipes/:id')
        .get(recipeController.readRecipe)
        .put(recipeController.updateRecipe)
        .delete(recipeController.deleteRecipe);
}
