import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
// import IconMenu from 'material-ui/IconMenu';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import classes from './ListName.css';

const listName = (props) => {
  const { anchorEl, handleOpen, handleClose } = props;
  const nameDisplay = props.editName ? (
    <form onSubmit={props.handleNameChangeSubmit}>
      <TextField
        name="name"
        value={props.nameInput}
        onChange={props.handleNameInputChange}
        fullWidth
        style={{ padding: '0 1rem' }}
      />
    </form>
  ) : (
    <div style={{ margin: '0' }}>
      <h2
        className={classes.ListName}
        onDoubleClick={props.handleEditName}
        style={{ width: '70%', display: 'inline-block' }}
      >
        {props.name}
      </h2>
      <IconButton
        aria-label="Edit List"
        aria-owns={anchorEl ? 'edit-list-menu' : null}
        aria-haspopup="true"
        onClick={handleOpen}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="edit-list-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          className={classes.MenuItem}
          onClick={() => {
            props.manageCategories();
            handleClose();
          }}
        >
          Manage Categories
        </MenuItem>
        <MenuItem className={classes.MenuItem} disabled>
          Manage Lists
        </MenuItem>
        <MenuItem
          className={classes.MenuItem}
          onClick={() => {
            props.handleDeleteList(props.list);
            handleClose();
          }}
        >
          Delete List
        </MenuItem>
      </Menu>
    </div>
  );

  return nameDisplay;
};

listName.defaultProps = {
  anchorEl: null,
};

listName.propTypes = {
  anchorEl: PropTypes.object,
  handleOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default listName;
