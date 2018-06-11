import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import TextField from '@material-ui/core/TextField';
import classes from './fields.css';

export const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    label={label}
    InputProps={{
      classes: {
        root: classes.TextField,
        input: classes.TextField,
      },
    }}
    // eslint complains about the next line because its duplicate props filter is case insensitive
    // eslint-disable-next-line
    inputProps={{
      className: classes.TextField,
    }}
    InputLabelProps={{
      classes: {
        root: classes.Label,
      },
    }}
    margin="normal"
    error={touched && error}
    {...input}
    {...custom}
  />
);

renderTextField.defaultProps = {
  meta: {
    touched: false,
    error: '',
  },
  input: {},
};

renderTextField.propTypes = {
  input: PropTypes.any,
  label: PropTypes.string.isRequired,
  meta: PropTypes.object,
};

export const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <SelectField
    label={label}
    errorText={touched && error}
    fullWidth
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    {...custom}
  />
);

renderSelectField.defaultProps = {
  meta: {
    touched: false,
    error: '',
  },
  input: {},
  children: [],
};

renderSelectField.propTypes = {
  input: PropTypes.any,
  meta: PropTypes.object,
  label: PropTypes.string.isRequired,
  children: PropTypes.any,
};
