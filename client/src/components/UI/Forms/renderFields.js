import React from 'react';
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
        input: classes.TextField
      }
    }}
    inputProps={{
      className: classes.TextField
    }}
    InputLabelProps={{
      classes: {
        root: classes.Label
      }
    }}
    margin="normal"
    // errorText={touched && error}
    {...input}
    {...custom}
  />
)

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
      fullWidth={true}
      {...input}
      onChange={(event, index, value) => input.onChange(value)}
      children={children}
      {...custom}
    />
  )