import React from 'react';

import classes from './Greeting.css';

const greeting = (props) => {
    return (
        <div className={classes.Greeting}>
            <span className={classes.GreetingResponsive}>Hi {props.displayName}! |</span> <a className={classes.Logout}  href="/api/logout">Logout</a>
        </div>
    )
}

export default greeting;