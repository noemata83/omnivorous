import React from 'react';
import { connect } from 'react-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

const listControls = (props) => {
    // At present, the SelectField will not be changeable: need to implement some kind of handleChange function, which should call the action to set the currentlist.
    const listOptions = props.lists.map( list  => <MenuItem key={list.id} value={list.name} primaryText={list.name} />);
    return (
        <div className="input-field">
            <SelectField fullWidth={true} label="Category" name="category" value={props.currentList.name}>{listOptions}</SelectField>
            <RaisedButton label="New List" primary={true} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        lists: state.shoppingList.lists,
        currentList: state.shoppingList.currentList
    }
}

export default connect(mapStateToProps)(listControls);