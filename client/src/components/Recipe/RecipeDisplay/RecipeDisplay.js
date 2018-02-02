import React, { Component } from 'react';
import { connect } from 'react-redux';

import Ingredient from './Ingredient/Ingredient';
import Direction from './Direction/Direction';

class RecipeDisplay extends Component {
    render () {
        let recipe = <h1>Please select a Recipe!</h1>;
        if (this.props.currentRecipe) {
            const ingredients = this.props.currentRecipe.ingredients.map((ingredient,index) => (
                <Ingredient 
                    key={index} 
                    amount={ingredient.amount}
                    unit={ingredient.unit}
                    name={ingredient.ingredient}
                    />));
            const directions = this.props.currentRecipe.directions.map((direction,index) => (
                <Direction
                    key={index}
                    direction={direction} />));                   
            recipe = (
                <div>
                    <h1>{this.props.currentRecipe.title}</h1>
                    <p><em>{this.props.currentRecipe.description}</em></p>
                    <h3>Ingredients</h3>
                        <ul>
                            {ingredients}
                        </ul>
                    <h3>Directions:</h3>
                        <ol>
                            {directions}
                        </ol>
                </div>
                )
        }
        return recipe;
    }
}

const mapStateToProps = state => {
    return {
        currentRecipe: state.currentRecipe
    }
}

export default connect(mapStateToProps)(RecipeDisplay);