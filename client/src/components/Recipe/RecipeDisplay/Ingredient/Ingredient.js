import React from 'react';

import classes from './Ingredient.css';

const ingredient = (props) => {
    return (
        <li className={classes.Ingredient}>{[props.amount, props.unit, props.name].join(' ')}</li>
    );
}

export default ingredient;