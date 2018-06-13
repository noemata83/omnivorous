import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { red400, white } from 'material-ui/styles/colors';
import {
  renderSelectField,
  renderTextField,
} from '../../../UI/Forms/renderFields';

const itemEditor = (props) => {
  const categoryOptions = props.categories.map(category => (
    <MenuItem style={{ fontSize: '1.4rem' }} key={category} value={category}>{category}</MenuItem>
  ));
  return (
    <div style={{ padding: '1rem' }}>
      <form onSubmit={props.handleSubmit}>
        <Field
          type="text"
          fullWidth
          name="name"
          label="Item"
          component={renderTextField}
        />
        <label htmlFor="qty">Qty:</label>
        <Field
          type="number"
          fullWidth
          name="quantity"
          label="Qty"
          component={renderTextField}
        />
        <Field
          type="text"
          fullWidth
          name="unit"
          label="Unit"
          component={renderTextField}
        />
        <Field name="category" component={renderSelectField} label="Category">
          {categoryOptions}
        </Field>
        <Field type="hidden" component="input" name="purchased" />
        <div style={{ marginTop: '1rem' }}>
          <Button
            variant="raised"
            color="primary"
            onClick={props.handleSubmit}
            style={{ marginRight: '2rem' }}
          >
            Submit
          </Button>
          <Button
            variant="raised"
            onClick={props.onDelete}
            style={{ backgroundColor: red400 }}
          >
            Delete Item
          </Button>
        </div> 
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
