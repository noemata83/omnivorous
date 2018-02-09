import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/';

import RecipeItem from '../../components/RecipeList/RecipeItem/RecipeItem';
import Button from '../../components/UI/Button/Button';

import classes from './RecipeList.css';

class RecipeList extends Component {
    render() {
        const recipes = this.props.recipes.map(recipe => <RecipeItem clicked={() => { this.props.onSelectRecipe(recipe); this.props.setEditMode(false);}} key={recipe._id} title={recipe.title} />);
        return (
            <ul className={classes.RecipeList}>
                {recipes}
                <Button buttonType="Success" clicked={() => this.props.setEditMode(true)}>Add Recipe</Button>
            </ul>);    
    }
    
};

const mapStateToProps = state => {
    return {
        recipes: state.recipes  
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSelectRecipe: (recipe) => dispatch(actions.displayRecipe(recipe)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList);