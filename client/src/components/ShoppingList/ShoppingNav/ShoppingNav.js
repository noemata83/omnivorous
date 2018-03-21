import React from 'react';

import classes from './ShoppingNav.css';

import {fa, fa_times, fa_shopping_cart} from '../../../icons';

 const shoppingNav = (props) => {
    const tabClasses = props.shown ? [classes.ShoppingTab, classes.Shown].join(' ') : classes.ShoppingTab;
    const iconClasses = props.shown ? [fa, fa_times, classes.Icon].join(' ') : [fa, fa_shopping_cart, classes.Icon].join(' ');
    const navClasses = props.shown ? [classes.ShoppingNav, classes.Collapse].join(' ') : classes.ShoppingNav;
    return (
        <div className={navClasses}>
            <div className={tabClasses} onClick={props.clicked}> 
                <i className={iconClasses}></i>
            </div>
        </div>
    );
}

export default shoppingNav;