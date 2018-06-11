import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import { red400, white } from 'material-ui/styles/colors';
import {
  renderSelectField,
  renderTextField,
} from '../../../UI/Forms/renderFields';

const itemEditor = (props) => {
  const categoryOptions = props.categories.map(category => (
    <MenuItem key={category} value={category} primaryText={category} />
  ));
  return (
    <div style={{ padding: '1rem' }}>
      <form onSubmit={props.handleSubmit}>
        <label htmlFor="name">Item:</label>
        <Field
          type="text"
          fullWidth
          name="name"
          component={renderTextField}
        />
        <label htmlFor="qty">Qty:</label>
        <Field
          type="number"
          fullWidth
          name="quantity"
          component={renderTextField}
        />
        <label htmlFor="unit">Unit:</label>
        <Field
          type="text"
          fullWidth
          name="unit"
          component={renderTextField}
        />
        <Field name="category" component={renderSelectField} label="Category: ">
          {categoryOptions}
        </Field>
        <Field type="hidden" component="input" name="purchased" />
        <RaisedButton
          primary
          onClick={props.handleSubmit}
          label="Submit"
          style={{ marginRight: '2rem' }}
        />
        <RaisedButton
          onClick={props.onDelete}
          label="Delete Item"
          backgroundColor={red400}
          labelColor={white}
        />
      </form>
    </div>
  );
};

itemEditor.propTypes = {
  categories: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'shoppingListItem',
})(itemEditor);
