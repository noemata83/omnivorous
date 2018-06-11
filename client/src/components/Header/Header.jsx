import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
// import { Link } from 'react-router-dom';

import Brand from './Brand/Brand';
import Greeting from './Greeting/Greeting';
import classes from './Header.css';

class Header extends Component {
  renderGreeting() {
    switch (this.props.auth) {
      case null:
        return '';
      default:
        return this.props.auth.displayName;
    }
  }

  render() {
    return (
      <AppBar position="static">
        <Toolbar classes={{ root: classes.ResponsiveAppBar }}>
          <div>
            <IconButton
              className={classes.menuButton}
              onClick={this.props.drawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Brand />
          </div>
          <Greeting displayName={this.renderGreeting()} />
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = ({ auth }) =>
  ({ auth });

Header.propTypes = {
  drawerToggle: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Header);
