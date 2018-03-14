import React from 'react';

import classes from './RecipeNav.css';

import { fa, fa_book, fa_times } from '../../../icons';

const recipeNav = (props) => {
    const tabClasses = props.shown ? [classes.RecipeTab, classes.Shown].join(' ') : classes.RecipeTab;
    const iconClasses = props.shown ? [fa, fa_times, classes.Icon].join(' ') : [fa, fa_book, classes.Icon].join(' ');
    const navClasses = props.shown ? [classes.RecipeNav, classes.Collapse].join(' ') : classes.RecipeNav;
    return (
        <div className={navClasses}>
            <div className={tabClasses} onClick={props.clicked}>
                <i className={iconClasses}></i>
            </div>
        </div>
    );
}

export default recipeNav;