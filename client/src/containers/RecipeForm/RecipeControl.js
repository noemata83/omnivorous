import React, { Component } from 'react';
import { connect } from 'react-redux';

import RecipeForm from './RecipeForm';
import classes from './RecipeForm.css';
import * as actions from '../../store/actions';

class RecipeControl extends Component {

    handleSubmit = values => {
        if (this.props.currentRecipe) {
            this.props.onEditRecipe(this.props.user, this.props.currentRecipe._id, values);
            this.props.setEditMode(false);
        } else {
            this.props.onAddRecipe(this.props.user, values);
            this.props.setEditMode(false);
        }
    }

    handleDelete = (recipeId) => {
        let deleteContinue = window.confirm(`Are you sure you want to delete "${this.props.currentRecipe.name}"?`);
        if (deleteContinue) {
            this.props.onDeleteRecipe(this.props.user, recipeId);
        }
    }

    render() {
        return (
            <div className={classes.RecipeForm}>
                <RecipeForm initialValues={this.props.currentRecipe} onSubmit={this.handleSubmit} onDelete={this.handleDelete}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentRecipe: state.recipe.currentRecipe,
        user: state.auth.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddRecipe: (user, recipe) => dispatch(actions.addRecipe(user, recipe)),
        onEditRecipe: (user, id, recipe) => dispatch(actions.updateRecipe(user, id, recipe)),
        onDeleteRecipe: (user, id) => dispatch(actions.destroyRecipe(user, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeControl);