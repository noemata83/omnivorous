import React from 'react';

import classes from './Direction.css';

const direction = (props) => {
    return (
        <li className={classes.Direction}>{props.direction}</li>
    );
}

export default direction;