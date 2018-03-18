import React from 'react';

import ShoppingNav from './ShoppingNav/ShoppingNav';
import ListControls from './ListControls/ListControls';
import CurrentList from './CurrentList/CurrentList';

import classes from './ShoppingList.css';

const shoppingList = (props) => {
    console.log(props.toggleDisplay);
    const shoppingListClasses = props.listDisplay ? [classes.ShoppingListContent, classes.Show].join(' ') : classes.ShoppingListContent;
    const listBoxClasses = props.listDisplay ? [classes.ListBox, classes.Show].join(' ') : classes.ListBox;
    return (
       <div className={shoppingListClasses}>
            <ShoppingNav shown={props.listDisplay} clicked={props.toggleDisplay} />
           <div className={listBoxClasses}>
                <div className={classes.ListHeader}>
                    <h2 className={classes.ListHeaderText}>Shopping List</h2>
                </div>
                <ListControls />
                <div className={classes.ShoppingList}>
                    <CurrentList currentList={props.currentList} />
                </div>
            </div>
       </div> 
    )
};

export default shoppingList;