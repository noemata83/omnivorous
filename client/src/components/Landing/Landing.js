import React from 'react';

import classes from "./Landing.css";
import Wrapper from '../../hoc/Wrapper/Wrapper';

const landing = (props) => {
    return (
        <Wrapper>
            <div className={classes.Landing}></div>
            <div className={classes.LandingContainer}>
                <div className={classes.TextBox}>
                    <h1 className={classes.HeaderText}>Welcome to <span className={classes.HeaderText__brand}>Omnivorous</span></h1>
                    <h2 className={classes.Tagline}>The recipe manager that <em>just works</em></h2>
                    <a className={classes.Link} href="/auth/google">Sign in with Google</a>
                </div>
            </div>
        </Wrapper>
    )
}
export default landing;