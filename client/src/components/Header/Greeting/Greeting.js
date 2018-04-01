import React from 'react';

import classes from './Greeting.css';

const greeting = (props) => {
    return (
        <li className={classes.Greeting}>
            Hi {props.displayName}! | <a className={["black-text", classes.Logout].join(" ")}  href="/api/logout">Logout</a>
        </li>
    )
}

export default greeting;