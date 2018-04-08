import React from 'react';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';

export const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    // underlineShow={false}
    floatingLabelStyle={{fontSize:'1.2rem'}}
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
      floatingLabelText={label}
      errorText={touched && error}
      fullWidth={true}
      {...input}
      onChange={(event, index, value) => input.onChange(value)}
      children={children}
      {...custom}
    />
  )