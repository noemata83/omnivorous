import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

import Brand from './Brand/Brand';
import Greeting from './Greeting/Greeting';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
// import classes from './Header.css';

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
                iconElementRight={<Button variant="flat"><Greeting displayName={this.renderGreeting()}/></Button>}
                showMenuIconButton={false}
                style={{zIndex: 1}}
            />
        )
    }
}

const mapStateToProps = ({ auth }) => {
    return { auth };
}

export default connect(mapStateToProps)(Header);