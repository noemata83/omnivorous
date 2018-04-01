import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './RecipeDisplay.css';
import Ingredient from './Ingredient/Ingredient';
import Direction from './Direction/Direction';

class RecipeDisplay extends Component {
    render () {
        let recipe = <h1>Please select a Recipe!</h1>;
        if (this.props.currentRecipe) {
            const ingredients = this.props.currentRecipe.recipeIngredient.map((ingredient,index) => (
                <Ingredient 
                    key={index} 
                    amount={ingredient.amount}
                    unit={ingredient.unit}
                    name={ingredient.name}
                    />));
            const directions = this.props.currentRecipe.recipeInstructions.map((direction,index) => (
                <Direction
                    key={index}
                    direction={direction} />));                   
            recipe = (
                <div>
                    <h1>{this.props.currentRecipe.name}</h1>
                    <p className={classes.Description}>{this.props.currentRecipe.description}</p>
                    <h3 className={classes.HeaderText}>Ingredients:</h3>
                        <ul>
                            {ingredients}
                        </ul>
                    <h3 className={classes.HeaderText}>Directions:</h3>
                        <ol>
                            {directions}
                        </ol>
                </div>
                )
        }
        return (
            <div className={["card", classes.RecipeDisplay].join(' ')}>
                {recipe}
            </div>
            );
    }
}

const mapStateToProps = state => {
    return {
        currentRecipe: state.recipe.currentRecipe
    }
}

export default connect(mapStateToProps)(RecipeDisplay);
