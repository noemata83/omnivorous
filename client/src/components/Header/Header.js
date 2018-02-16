import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

import Brand from './Brand/Brand';
import Greeting from './Greeting/Greeting';
import classes from './Header.css';

class Header extends Component {

    renderGreeting() {
        switch(this.props.auth) {
            case null:
                return "";
            default:
                return this.props.auth.displayName;
        }
    }

    render () {
        return (
            <nav className={classes.Header}>
                    <Brand />
                    <Greeting displayName={this.renderGreeting()} />
            </nav>
        )
    }
}

const mapStateToProps = ({ auth }) => {
    return { auth };
}

export default connect(mapStateToProps)(Header);