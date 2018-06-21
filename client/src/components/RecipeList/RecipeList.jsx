import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ModeEdit from '@material-ui/icons/ModeEdit';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import { white, green600 } from 'material-ui/styles/colors';

import * as actions from '../../store/actions';

import classes from './RecipeList.css';

class RecipeList extends Component {
  state = {
    loading: true,
    recipeListDisplay: false,
  };

  componentDidMount() {
    if (this.props.userId && !this.props.loading) {
      this.props.fetchRecipes(this.props.userId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.loading) {
      this.props.fetchRecipes(nextProps.userId);
      this.setState({ loading: false });
    }
  }

  toggleRecipeListHandler = () => {
    this.setState({
      recipeListDisplay: !this.state.recipeListDisplay,
    });
  };

  render() {
    const recipes = this.props.recipes.map(recipe => (
      <ListItem
        name={recipe.name}
        key={recipe._id}
        button
        onClick={() => {
          this.props.onSelectRecipe(this.props.userId, recipe);
          this.props.displayRecipe();
          this.props.setEditMode(false);
        }}
      >
        <ListItemText
          primary={recipe.name}
          classes={{ root: classes.Recipe }}
        />
        <ListItemSecondaryAction>
          <IconButton
            onClick={() => {
              this.props.onSelectRecipe(this.props.userId, recipe);
              this.props.setEditMode(true);
            }}
          >
            <ModeEdit />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ));
    return (
      <div className={classes.RecipeContent}>
        <h2
          style={{
            padding: '1rem',
            marginTop: 0,
            fontWeight: 'normal',
            color: white,
            backgroundColor: '#4caf50',
          }}
        >
          My Recipes
        </h2>
        <Button
          variant="fab"
          style={{
            position: 'absolute',
            top: 20,
            right: '20px',
            zIndex: '3',
        }}
          mini
          onClick={() => {
            this.props.addNewRecipe();
            this.props.setEditMode(true);
          }}
          color="secondary"
        >
          <Add />
        </Button>
        <div className={classes.ListBox}>
          <List>{recipes}</List>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  recipes: state.recipe.recipes,
  userId: state.auth.userId || null,
  loading: state.recipe.loading,
});

const mapDispatchToProps = dispatch => ({
  onSelectRecipe: (user, recipe) =>
    dispatch(actions.fetchRecipe(user, recipe)),
  addNewRecipe: () => dispatch(actions.newRecipe()),
  fetchRecipes: user => dispatch(actions.fetchRecipes(user)),
});

RecipeList.propTypes = {
  recipes: PropTypes.array.isRequired,
  displayRecipe: PropTypes.func.isRequired,
  setEditMode: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  onSelectRecipe: PropTypes.func.isRequired,
  addNewRecipe: PropTypes.func.isRequired,
  fetchRecipes: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecipeList);
