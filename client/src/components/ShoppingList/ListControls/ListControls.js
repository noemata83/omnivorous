import React from 'react';
import { connect } from 'react-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { getShoppingList } from '../../../store/actions';

const listControls = (props) => {
    // At present, the SelectField will not be changeable: need to implement some kind of handleChange function, which should call the action to set the currentlist.
    const listOptions = props.lists.map( list  => <MenuItem key={list._id} value={list._id} label={list.name} primaryText={list.name} />);
    return (
        <div style={{padding:'0 1rem'}}>
            <SelectField fullWidth label="Category" name="category" onChange={(event, key, value) => props.displayShoppingList(value)} value={props.currentList._id}>{listOptions}</SelectField>    
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