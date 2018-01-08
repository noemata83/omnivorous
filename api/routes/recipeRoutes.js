module.exports = function(app) {
    var recipeController = require('../controllers/recipeController');

    app.route('/api/:username/recipes')
        .get(recipeController.listRecipes)
        .post(recipeController.createRecipe);
        
    app.route('/api/:username/recipes/:id')
        .get(recipeController.readRecipe)
        .put(recipeController.updateRecipe)
        .delete(recipeController.deleteRecipe);
}
