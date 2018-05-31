import React from 'react';
import { connect } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import { getShoppingList } from '../../../store/actions';
import Select from '@material-ui/core/Select';

const listControls = (props) => {
    // At present, the SelectField will not be changeable: need to implement some kind of handleChange function, which should call the action to set the currentlist.
    const listOptions = props.lists.map( list  => <MenuItem 
        key={list._id} 
        value={list._id} 
        // onClick={() => props.displayShoppingList(list._id)} 
        style={{fontSize:'1.4rem'}}>{list.name}</MenuItem>);
    return (
        <div style={{padding:'0 1rem', margin: '1.6rem 0'}}>
            <Select fullWidth label="Category" name="category" value={props.currentList._id || 'Default List'} onChange={(event) => props.displayShoppingList(event.target.value)} style={{fontSize:'1.6rem'}}>{listOptions}</Select>    
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        displayShoppingList: (id) => dispatch(getShoppingList(id))
    }
}

const mapStateToProps = (state) => {
    return {
        lists: state.shoppingList.lists,
        currentList: state.shoppingList.currentList
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(listControls);