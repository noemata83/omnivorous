import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { getShoppingList } from '../../../store/actions';

const listControls = (props) => {
// At present, the SelectField will not be changeable: need to implement some kind of handleChange
// function, which should call the action to set the currentlist.
  const listOptions = props.lists.map(list => (
    <MenuItem
      key={list._id}
      value={list._id}
      // onClick={() => props.displayShoppingList(list._id)}
      style={{ fontSize: '1.4rem' }}
    >
      {list.name}
    </MenuItem>
  ));
  return (
    <div style={{ padding: '0 1rem', margin: '1.6rem 0' }}>
      <Select
        fullWidth
        label="Category"
        name="category"
        value={props.currentList._id || 'Default List'}
        onChange={event => props.displayShoppingList(event.target.value)}
        style={{ fontSize: '1.6rem' }}
      >
        {listOptions}
      </Select>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  displayShoppingList: id => dispatch(getShoppingList(id)),
});

const mapStateToProps = state => ({
  lists: state.shoppingList.lists,
  currentList: state.shoppingList.currentList,
});

listControls.propTypes = {
  lists: PropTypes.array.isRequired,
  currentList: PropTypes.object.isRequired,
  displayShoppingList: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(listControls);
