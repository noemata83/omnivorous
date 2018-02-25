import React from 'react';

import IngredientInput from '../../../UI/Input/IngredientInput/IngredientInput';
import Button from '../../../UI/Button/Button';

const ingredientForm = (props) => {
    const ingredientForm = props.ingredients.map((ingredient, index) => {
        return (
            <IngredientInput
                key={`ingredients[${index}]`}
                amountValue={ingredient.amount.value}
                unitValue={ingredient.unit.value}
                ingValue={ingredient.ingredient.value}
                commentValue={ingredient.comment.value}
                index={index}
                changed={props.ingredientChanged} />
        );
    });
    const removeButton = props.ingredients.length > 1 ? <Button type="Button" buttonType="Minus" clicked={props.removeIngredient}>-</Button> : null;
    return (
        <div>
            <h2>Ingredients</h2>
            {ingredientForm}
            <Button type="Button" buttonType="Plus" clicked={props.addIngredient}>+</Button>
            {removeButton}
        </div>
    )

}

export default ingredientForm;