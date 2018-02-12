import React from 'react';

import classes from './IngredientInput.css';

const ingredientInput = (props) => {
        return (
            <div className={classes.IngredientInput}>
                <input className={classes.Amount}
                onChange={(event) => props.changed(event, props.index, 'amount')}
                value={props.amountValue} />
                <input className={classes.Unit}
                onChange={(event) => props.changed(event, props.index, 'unit')}
                value={props.unitValue} />
                <input className={classes.Ingredient}
                onChange={(event) => props.changed(event, props.index, 'ingredient')}
                value={props.ingValue} />
                <input className={classes.Comment}
                onChange={(event) => props.changed(event, props.index, 'comment')}
                value={props.commentValue} />
            </div>
        )
}

export default ingredientInput;