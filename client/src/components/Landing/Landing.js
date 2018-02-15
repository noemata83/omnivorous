import React from 'react';

import classes from "./Landing.css";

const landing = (props) => {
    return (
        <div className={classes.Landing}>
            <div className={classes.TextBox}>
                <h2 className={classes.HeaderText}>Welcome to <span className={classes.HeaderText__brand}>Omnivorous</span></h2>
                <a className={classes.Link} href="/recipes">Sign in with Google</a>
            </div>
        </div>
    )
}
export default landing;