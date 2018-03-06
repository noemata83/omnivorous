import React from 'react';

import classes from './IngredientInput.css';

const ingredientInput = ( {input, label, type, sort, meta: { error, submitFailed }}) => {
        return (
            <div className={classes[sort]}>
                <label>{label}</label>
                <input {...input} className={classes.Input} type={type} placeholder={label} />
            </div>
        )
}

export default ingredientInput;