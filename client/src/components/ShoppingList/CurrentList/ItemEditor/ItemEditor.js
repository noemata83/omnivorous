import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { red400 } from 'material-ui/styles/colors';
import { white } from 'material-ui/styles/colors';

const renderSelectField = ({
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
 
const itemEditor = (props) => {
    const categoryOptions = props.categories.map(category => <MenuItem key={category} value={category} primaryText={category} />);
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <label htmlFor="name">Item:</label>
                <Field type="text" name="name" component='input' />
                <label htmlFor="qty">Qty:</label>
                <Field type="number" name="quantity" component='input' />
                <label htmlFor="unit">Unit:</label>
                <Field type="text" name="unit" component='input' />
                <label htmlFor="category">Category:</label> 
                <Field
                    name="category"
                    component={renderSelectField}
                    label="Category: "
                    >{categoryOptions}</Field>
                <Field type="hidden" component='input' name="purchased" />
                <RaisedButton primary={true} onClick={props.handleSubmit} label="Submit" style={{marginRight:'2rem'}} />
                <RaisedButton onClick={props.onDelete} label="Delete Item" backgroundColor={red400} labelColor={white}/>
            </form>
        </div>
    )
}

export default reduxForm({
    form: 'shoppingListItem'
})(itemEditor);