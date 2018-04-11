import React from 'react';
import { connect } from 'react-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
// import RaisedButton from 'material-ui/RaisedButton';
import { FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { createShoppingList, getShoppingList } from '../../../store/actions';

import defaultList from '../Prototype/defaultList';

const listControls = (props) => {
    // At present, the SelectField will not be changeable: need to implement some kind of handleChange function, which should call the action to set the currentlist.
    console.log(props.lists);
    const listOptions = props.lists.map( list  => <MenuItem key={list._id} value={list._id} label={list.name} primaryText={list.name} />);
    return (
        <div style={{padding:'1rem'}}>
            <SelectField style={{width: '80%'}} label="Category" name="category" onChange={(event, key, value) => props.displayShoppingList(value)} value={props.currentList._id}>{listOptions}</SelectField>    
            <FloatingActionButton style={{position:'absolute', top:'20px', right:'10px'}} mini={true} onClick={() => props.createShoppingList(defaultList)}><ContentAdd /></FloatingActionButton>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        createShoppingList: (list) => dispatch(createShoppingList(list)),
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