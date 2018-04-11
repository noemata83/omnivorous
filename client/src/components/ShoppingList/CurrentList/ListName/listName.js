import React from 'react';

import classes from './ListName.css';
import TextField from 'material-ui/TextField';

const listName = (props) => {
    const nameDisplay = props.editName ? 
            <form onSubmit={props.handleNameChangeSubmit}>
                <TextField name="name" value={props.nameInput} onChange={props.handleNameInputChange} fullWidth={true} style={{padding:'0 1rem'}}/>
            </form>
            : <h2 className={classes.ListName} onDoubleClick={props.handleEditName}>{props.name}</h2>;

    return nameDisplay;
}
export default listName;