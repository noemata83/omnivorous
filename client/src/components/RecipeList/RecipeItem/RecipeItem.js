import React from 'react';

import classes from './RecipeItem.css';
// import Button from '../../UI/Button/Button';
import { fa, fa_edit } from '../../../icons';

const recipeItem = (props) => {
    return (
            <li className={classes.RecipeItem}>
                <span onClick={props.clicked}>{props.name}</span>
                <button
                    className={classes.Edit}
                    onClick={props.edit}>
                    <i className={[fa, fa_edit].join(' ')}></i>
                </button>
            </li>
        );
}

export default recipeItem;