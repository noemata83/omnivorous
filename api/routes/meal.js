module.exports = (app) => {
    const mealController = require('../controllers/mealController');

    app.route('api/meals/')
        .get(mealController.getMeals)
        .post(mealController.createMeal);
    
    app.route('/api/meals/:id')
        .put(mealController.updateMeal)
        .delete(mealController.deleteMeal);
}