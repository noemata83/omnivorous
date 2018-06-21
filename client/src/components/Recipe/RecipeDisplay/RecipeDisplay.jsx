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

import { addListItems } from '../../../store/actions';

class RecipeDisplay extends Component {
  state = {
    anchorEl: null,
  };

  handleOpen = event => this.setState({ anchorEl: event.currentTarget });
  handleClose = () => this.setState({ anchorEl: null });

  AddRecipeToShoppingList = () => {
    // console.log(this.props.currentList.items);
    const shoppingListItems = this.props.currentRecipe.recipeIngredient.map(ingredient => ({
      name: ingredient.name,
      unit: ingredient.unit,
      quantity: ingredient.amount,
      category: 'Uncategorized',
      purchased: false,
      }));
    this.props.addItemsToShoppingList(shoppingListItems, this.props.currentList);
    this.props.triggerShoppingList();
    this.handleClose();
  }

  render() {
    const { currentRecipe } = this.props;
    const { anchorEl } = this.state;
    let recipe = <h1>Please select a Recipe!</h1>;
    if (currentRecipe) {
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
                <MenuItem onClick={this.AddRecipeToShoppingList}>Add to Shopping List</MenuItem>
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

const mapDispatchToProps = dispatch => ({
  addItemsToShoppingList: (items, currentList) => dispatch(addListItems(items, currentList)),
})

const mapStateToProps = state => ({
  currentRecipe: state.recipe.currentRecipe,
  currentList: state.shoppingList.currentList,
});

RecipeDisplay.propTypes = {
  currentRecipe: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDisplay);