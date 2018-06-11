import React from 'react';
import PropTypes from 'prop-types';

import classes from './Greeting.css';

const greeting = props =>
  (
    <div className={classes.Greeting}>
      <span className={classes.GreetingResponsive}>
        Hi {props.displayName}! |
      </span>{' '}
      <a className={classes.Logout} href="/api/logout">
        Logout
      </a>
    </div>
  );

greeting.propTypes = {
  displayName: PropTypes.string.isRequired,
};

export default greeting;
