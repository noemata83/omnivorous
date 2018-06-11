import React from 'react';
import PropTypes from 'prop-types';
import classes from './Ingredient.css';

const ingredient = props => <li className={classes.Ingredient}>{[props.amount, props.unit, props.name].join(' ')}</li>;

ingredient.defaultProps = {
  unit: '',
};

ingredient.propTypes = {
  amount: PropTypes.string.isRequired,
  unit: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default ingredient;
