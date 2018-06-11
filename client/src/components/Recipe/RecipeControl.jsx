import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { change } from 'redux-form';
import { Paper } from '@material-ui/core';

import RecipeForm from './RecipeForm/RecipeForm';
import Modal from '../UI/Modal/Modal';
import RecipeImport from './RecipeImport/recipeImport';
import classes from './RecipeControl.css';
import * as actions from '../../store/actions';

class RecipeControl extends Component {
  state = {
    showImportModal: false,
    importURL: '',
  };

  handleSubmit = (values) => {
    if (this.props.currentRecipe) {
      this.props.onEditRecipe(
        this.props.user,
        this.props.currentRecipe._id,
        values,
      );
      this.props.setEditMode(false);
    } else {
      this.props.onAddRecipe(this.props.user, values);
      this.props.setEditMode(false);
    }
  };

  handleDelete = (recipeId) => {
    const deleteContinue = window.confirm(
      `Are you sure you want to delete "${this.props.currentRecipe.name}"?`,
    );
    if (deleteContinue) {
      this.props.onDeleteRecipe(this.props.user, recipeId);
    }
  };

  inputChangedHandler = e => this.setState({ importURL: e.target.value });

  initImportHandler = () => {
    this.setState({ showImportModal: true });
  };

  importCancelHandler = () => {
    this.setState({ showImportModal: false });
  };

  importRecipeHandler = (e) => {
    e.preventDefault();
    axios
      .post('/api/recipes/import', { url: this.state.importURL })
      .then((res) => {
        if (res.data.message) {
          return console.log(res.data.message);
        }
        const recipe = res.data;
        axios.post(
          'http://phrase-tagger-service.k2rqsnqehd.us-east-1.elasticbeanstalk.com/parse',
          {
            ingredients: [...recipe.recipeIngredient],
          },
        )
          .then((response) => {
            recipe.recipeIngredient = response.data.ingredients.map(ingredient =>
              ({ ...ingredient, amount: ingredient.qty }));
            Object.keys(recipe).forEach((key) => {
              this.props.onChangeFieldValue(key, recipe[key]);
              this.setState({ showImportModal: false });
            });
          });
      });
  };

  render() {
    return (
      <Paper>
        <Modal
          show={this.state.showImportModal}
          modalClosed={this.importCancelHandler}
        >
          <RecipeImport
            changed={this.inputChangedHandler}
            url={this.state.importURL}
            import={this.importRecipeHandler}
            cancel={this.importCancelHandler}
          />
        </Modal>
        <div className={classes.FormContainer}>
          <RecipeForm
            initialValues={this.props.currentRecipe}
            onSubmit={this.handleSubmit}
            onDelete={this.handleDelete}
            onImportInit={this.initImportHandler}
          />
        </div>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  currentRecipe: state.recipe.currentRecipe,
  user: state.auth.userId,
});

const mapDispatchToProps = dispatch => ({
  onAddRecipe: (user, recipe) => dispatch(actions.addRecipe(user, recipe)),
  onEditRecipe: (user, id, recipe) =>
    dispatch(actions.updateRecipe(user, id, recipe)),
  onDeleteRecipe: (user, id) => dispatch(actions.destroyRecipe(user, id)),
  onChangeFieldValue: (field, value) =>
    dispatch(change('recipeForm', field, value)),
});

RecipeControl.propTypes = {
  currentRecipe: null,
};

RecipeControl.propTypes = {
  currentRecipe: PropTypes.object,
  onEditRecipe: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
  setEditMode: PropTypes.func.isRequired,
  onAddRecipe: PropTypes.func.isRequired,
  onDeleteRecipe: PropTypes.func.isRequired,
  onChangeFieldValue: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecipeControl);
