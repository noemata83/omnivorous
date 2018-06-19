import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import classes from './RecipeDisplay.css';
import Ingredient from './Ingredient/Ingredient';
import Direction from './Direction/Direction';
import { IconButton } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

class RecipeDisplay extends Component {
  state = {
    anchorEl: null,
  };

  handleOpen = event => this.setState({ anchorEl: event.currentTarget });
  handleClose = () => this.setState({ anchorEl: null });

  render() {
    const { currentRecipe } = this.props;
    const { anchorEl } = this.state;
    let recipe = <h1>Please select a Recipe!</h1>;
    if (currentRecipe) {
      console.log(currentRecipe);
      const ingredients = currentRecipe.recipeIngredient.map(ingredient => (
        <Ingredient key={ingredient.input} ingredient={ingredient} />
      ));
      const directions = currentRecipe.recipeInstructions.map(
        (direction, index) => <Direction key={index} direction={direction} />,
      );
      recipe = (
        <div>
          <div className={classes.Header}>
            <h1>{currentRecipe.name}</h1>
            <div>
              <IconButton onClick={this.handleOpen}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="recipe-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>Edit Recipe</MenuItem>
                <MenuItem onClick={this.handleClose}>Add to Shopping List</MenuItem>
                <MenuItem onClick={this.handleClose}>Delete Recipe</MenuItem>
              </Menu>
            </div>
          </div>
          <p className={classes.Description}>{currentRecipe.description}</p>
          <h3 className={classes.HeaderText}>Ingredients:</h3>
          <ul>{ingredients}</ul>
          <h3 className={classes.HeaderText}>Directions:</h3>
          <ol>{directions}</ol>
        </div>
      );
    }
    return <div className={classes.RecipeDisplay}>{recipe}</div>;
  }
}

const mapStateToProps = state => ({
  currentRecipe: state.recipe.currentRecipe,
});

RecipeDisplay.propTypes = {
  currentRecipe: PropTypes.object,
};

export default connect(mapStateToProps)(RecipeDisplay);
