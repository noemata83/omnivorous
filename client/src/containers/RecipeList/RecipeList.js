import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/';

import RecipeItem from '../../components/RecipeList/RecipeItem/RecipeItem';
import Button from '../../components/UI/Button/Button';
import RecipeNav from '../../components/RecipeList/RecipeNav/RecipeNav';

import classes from './RecipeList.css';

class RecipeList extends Component {

    state = {
        loading: true,
        recipeListDisplay: false
    }

    componentDidMount(){
        if (this.props.userId && !this.props.loading) {
            this.props.fetchRecipes(this.props.userId);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.loading) {
            this.props.fetchRecipes(nextProps.userId);
            this.setState({loading: false});
        }
    }

    toggleRecipeListHandler = () => {
        this.setState({
            recipeListDisplay: !this.state.recipeListDisplay
        })
    }

    render() {
        const recipes = this.props.recipes.map(recipe => <RecipeItem edit={()=> { this.props.onSelectRecipe(this.props.userId, recipe); this.props.setEditMode(true) }} clicked={() => {this.props.onSelectRecipe(this.props.userId, recipe); this.props.setEditMode(false);}} key={recipe._id} name={recipe.name} />);
        const recipeListClasses = this.state.recipeListDisplay ? [ classes.RecipeContent, classes.Show].join(' ') : classes.RecipeContent;
        const listBoxClasses = this.state.recipeListDisplay ? [ classes.ListBox, classes.Show ].join(' ') : classes.ListBox;
        return (
            <div className={recipeListClasses}>
                <div className={listBoxClasses}>
                    <div className={classes.ListHeader}>
                        <h2 className={classes.ListHeaderText}>My Recipes</h2>
                    </div>
                    <ul className={classes.RecipeList}>
                        {recipes}
                        <Button buttonType="Success" clicked={() => { this.props.addNewRecipe(); this.props.setEditMode(true)}}>Add Recipe</Button>
                    </ul>
                </div>
                <RecipeNav shown={this.state.recipeListDisplay} clicked={this.toggleRecipeListHandler} />
            </div>  );    

    }
    
};

const mapStateToProps = state => {
    return {
        recipes: state.recipe.recipes,
        userId: state.auth.userId || null,
        loading: state.recipe.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSelectRecipe: (user, recipe) => dispatch(actions.fetchRecipe(user, recipe)),
        addNewRecipe: () => dispatch(actions.newRecipe()),
        fetchRecipes: (user) => dispatch(actions.fetchRecipes(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList);