import React from 'react';
import PropTypes from 'prop-types';
import classes from './Direction.css';

const direction = props => <li className={classes.Direction}>{props.direction}</li>;

direction.propTypes = {
  direction: PropTypes.string.isRequired,
};

export default direction;
