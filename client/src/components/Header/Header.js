import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

import Brand from './Brand/Brand';
import Greeting from './Greeting/Greeting';
import AppBar from 'material-ui/AppBar';
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
            <AppBar
                title={<Brand />}
                iconElementRight={<Greeting displayName={this.renderGreeting()}/>}
                showMenuIconButton={false}
                style={{zIndex: 1}}
                className={classes.ResponsiveAppBar}
            />
        )
    }
}

const mapStateToProps = ({ auth }) => {
    return { auth };
}

export default connect(mapStateToProps)(Header);