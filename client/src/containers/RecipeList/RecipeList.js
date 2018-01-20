import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/';

import RecipeItem from '../../components/RecipeList/RecipeItem/RecipeItem';

import classes from './RecipeList.css';

class RecipeList extends Component {
    render() {
        const recipes = this.props.recipes.map(recipe => <RecipeItem clicked={() => this.props.onSelectRecipe(recipe)} key={recipe._id} title={recipe.title} />);
        return (
            <ul className={classes.RecipeList}>
                {recipes}
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