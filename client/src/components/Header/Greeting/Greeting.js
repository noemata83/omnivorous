import React from 'react';

import classes from './Greeting.css';

const greeting = (props) => {
    return (
        <span className={classes.Greeting}>
            Hi {props.displayName}! | <a className={classes.Logout}  href="/api/logout">Logout</a>
        </span>
    )
}

export default greeting;