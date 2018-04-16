import React from 'react';
import { connect } from 'react-redux';

import ListControls from './ListControls/ListControls';
import CurrentList from './CurrentList/CurrentList';

import classes from './ShoppingList.css';
import { white, green600 } from 'material-ui/styles/colors';
import { FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { createShoppingList } from '../../store/actions';
import defaultList from './Prototype/defaultList';


const shoppingList = (props) => {
    return (
       <div className={classes.ShoppingListContent}>
           <div className={classes.ListBox}>
                <h2 style={{ padding: '1rem', marginTop: 0, fontWeight: 'normal', color: white, backgroundColor: green600}}>Shopping List</h2>
                <FloatingActionButton style={{position:'absolute', top: 20, right: '20px', zIndex: '3'}} mini={true} onClick={() => props.createShoppingList(defaultList)} secondary={true}>
                    <ContentAdd />
                </FloatingActionButton>
                <div className={classes.ShoppingList}>
                    <ListControls />
                    <CurrentList 
                        currentList={props.currentList} />
                </div>
            </div>
       </div> 
    )
};

const mapDispatchToProps = (dispatch) => {
    return {
        createShoppingList: (list) => dispatch(createShoppingList(list)),
    }
}

export default connect(null, mapDispatchToProps)(shoppingList);