import React from 'react';

import classes from './Greeting.css';

const greeting = (props) => {
    return (
        <div className={classes.Greeting}>
            Hi {props.displayName}!
        </div>
    )
}

export default greeting;