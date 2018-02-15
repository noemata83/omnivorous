import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

import Brand from './Brand/Brand';
import classes from './Header.css';

class Header extends Component {


    render () {
        return (
            <nav className={classes.Header}>
                    <Brand />
            </nav>
        )
    }
}

export default Header;