import React from 'react';

import classes from './ListName.css';
import TextField from 'material-ui/TextField';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';

const listName = (props) => {
    const nameDisplay = props.editName ? 
            <form onSubmit={props.handleNameChangeSubmit}>
                <TextField name="name" value={props.nameInput} onChange={props.handleNameInputChange} fullWidth={true} style={{padding:'0 1rem'}}/>
            </form>
            : <div style={{margin:'-2rem 0 0 0'}}>
                <h2 className={classes.ListName} onDoubleClick={props.handleEditName} style={{width:'70%', display:'inline-block'}}>{props.name}</h2>
                <IconMenu
                    iconButtonElement={<IconButton style={{padding:'0'}}><MoreVertIcon /></IconButton>}
                    anchorOrigin={{horizontal:'right', vertical:'top'}}
                    targetOrigin={{horizontal:'right', vertical:'top'}}
                >
                    <MenuItem primaryText="Manage Categories" onClick={() => props.manageCategories()} />
                    <MenuItem primaryText="Manage Lists" disabled />
                    <MenuItem primaryText="Delete List" onClick={() => props.handleDeleteList(props.list)} />
                </IconMenu>
            </div>;

    return nameDisplay;
}

export default listName;