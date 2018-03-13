import React from 'react';

import classes from './RecipeNav.css';

import { fa, fa_book, fa_times } from '../../../icons';

const recipeNav = (props) => {
    const tabClasses = props.shown ? [classes.RecipeTab, classes.Shown].join(' ') : classes.RecipeTab;
    const iconClasses = props.shown ? [fa, fa_times, classes.Icon].join(' ') : [fa, fa_book, classes.Icon].join(' ');
    return (
        <div className={classes.RecipeNav}>
            <div className={tabClasses} onClick={props.clicked}>
                <i className={iconClasses}></i>
            </div>
        </div>
    );
}

export default recipeNav;