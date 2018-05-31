import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

import Brand from './Brand/Brand';
import Greeting from './Greeting/Greeting';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import classes from './Header.css';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

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
            <AppBar position="static">
                <Toolbar classes={{root: classes.ResponsiveAppBar}}>
                    <div>
                        <IconButton className={classes.menuButton} onClick={this.props.drawerToggle}>
                            <MenuIcon />
                        </IconButton>
                        <Brand />
                    </div>
                    <Greeting displayName={this.renderGreeting()}/>
                </Toolbar>
            </AppBar>
        )
    }
}

const mapStateToProps = ({ auth }) => {
    return { auth };
}

export default connect(mapStateToProps)(Header);