import React from 'react';

import ListControls from './ListControls/ListControls';
import CurrentList from './CurrentList/CurrentList';

import classes from './ShoppingList.css';

const shoppingList = (props) => {
    return (
       <div className={ classes.ShoppingListContent}>
           <div className={classes.ListBox}>
                <div className={classes.ShoppingList}>
                    <ListControls />
                    <CurrentList 
                        currentList={props.currentList} />
                </div>
            </div>
       </div> 
    )
};

export default shoppingList;