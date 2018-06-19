import React from 'react';
import PropTypes from 'prop-types';
import classes from './Ingredient.css';

const ingredient = ({ingredient}) => <li className={classes.Ingredient}>{ingredient.input}</li>;

ingredient.propTypes = {
  ingredient: PropTypes.object.isRequired,
};

export default ingredient;
