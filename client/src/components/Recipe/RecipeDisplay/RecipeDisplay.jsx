import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import classes from './RecipeDisplay.css';
import Ingredient from './Ingredient/Ingredient';
import Direction from './Direction/Direction';

const RecipeDisplay = (props) => {
  const { currentRecipe } = props;
  let recipe = <h1>Please select a Recipe!</h1>;
  if (currentRecipe) {
    const ingredients = currentRecipe.recipeIngredient.map(ingredient => (
      <Ingredient
        key={ingredient.name}
        amount={ingredient.amount}
        unit={ingredient.unit}
        name={ingredient.name}
      />
    ));
    const directions = currentRecipe.recipeInstructions.map((direction, index) =>
      <Direction key={index} direction={direction} />);
    recipe = (
      <div>
        <h1>{currentRecipe.name}</h1>
        <p className={classes.Description}>
          {currentRecipe.description}
        </p>
        <h3 className={classes.HeaderText}>Ingredients:</h3>
        <ul>{ingredients}</ul>
        <h3 className={classes.HeaderText}>Directions:</h3>
        <ol>{directions}</ol>
      </div>
    );
  }
  return <div className={classes.RecipeDisplay}>{recipe}</div>;
};

const mapStateToProps = state => ({
  currentRecipe: state.recipe.currentRecipe,
});

RecipeDisplay.propTypes = {
  currentRecipe: PropTypes.object,
};

export default connect(mapStateToProps)(RecipeDisplay);
