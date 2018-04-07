import React from 'react';
import { Field } from 'redux-form';

import Button from '../../../UI/Button/Button';
import classes from './ingredientForm.css';
import { renderTextField } from '../../../UI/Forms/renderFields';

const qtyStyle = {
    display: 'inline-block',
    width: '15%',
    marginRight: '.5rem',
}

const detailStyle = {
    display: 'inline-block',
    width: '30%',
    marginRight: ' .5rem'
}

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
                            component={renderTextField}
                            type="text"
                            style={qtyStyle}
                        />
                        <Field
                            name={`${recipeIngredient}.unit`}
                            key={`${recipeIngredient}.unit`}
                            component={renderTextField}
                            label="Unit"
                            type="text"
                            style={qtyStyle}
                       />
                        <Field
                            name={`${recipeIngredient}.name`}
                            key={`${recipeIngredient}.name`}
                            component={renderTextField}
                            label="Ingredient"
                            type="text"
                            style={detailStyle}
                        />
                        <Field
                            name={`${recipeIngredient}.comment`}
                            key={`${recipeIngredient}.comment`}
                            component={renderTextField}
                            label="Comment"
                            type="text"
                            style={detailStyle}
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