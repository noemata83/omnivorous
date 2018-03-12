import React from 'react';
import { Field } from 'redux-form';

import IngredientInput from '../../../UI/Input/IngredientInput/IngredientInput';
import Button from '../../../UI/Button/Button';
import classes from './ingredientForm.css';

const ingredientForm = ({fields, meta: { error, submitFailed }}) => {
    if (!fields.length) fields.push();
    const removeButton = fields.length > 1 ? <Button type="Button" buttonType="Minus" clicked={() => fields.pop()}>-</Button> : null;
    return (
    <div>
        <h3 className={classes.Header}>Ingredients</h3>
        {fields.map( (recipeIngredient, index) => (
                <div className={classes.IngredientForm} key={index}>
                        <Field
                            name={`${recipeIngredient}.amount`}
                            key={`${recipeIngredient}.amount`}
                            label="Amount"
                            component={IngredientInput}
                            type="text"
                            sort="Qty"
                        />
                        <Field
                            name={`${recipeIngredient}.unit`}
                            key={`${recipeIngredient}.unit`}
                            component={IngredientInput}
                            label="Unit"
                            type="text"
                            sort="Qty"
                       />
                        <Field
                            name={`${recipeIngredient}.name`}
                            key={`${recipeIngredient}.name`}
                            component={IngredientInput}
                            label="Ingredient"
                            type="text"
                            sort="Detail"
                        />
                        <Field
                            name={`${recipeIngredient}.comment`}
                            key={`${recipeIngredient}.comment`}
                            component={IngredientInput}
                            label="Comment"
                            type="text"
                            sort="Detail"
                        />
                </div>
            ))
        }
        <Button type="Button" buttonType="Plus" clicked={() => fields.push()}>+</Button>
        {removeButton}
    </div>
    );
}

export default ingredientForm;