import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from 'material-ui/Button';
import { renderSelectField, renderTextField } from '../../../UI/Forms/renderFields';
import { MenuItem } from 'material-ui/Menu';
import red from 'material-ui/colors/red';
import common from 'material-ui/colors/common';
const white = common.white;
const red400 = red['400'];

const itemEditor = (props) => {
    const categoryOptions = props.categories.map(category => <MenuItem key={category} value={category} primaryText={category} />);
    return (
        <div style={{padding: '1rem'}}>
            <form onSubmit={props.handleSubmit}>
                <label htmlFor="name">Item:</label>
                <Field type="text" fullWidth={true} name="name" component={renderTextField} />
                <label htmlFor="qty">Qty:</label>
                <Field type="number" fullWidth={true} name="quantity" component={renderTextField} />
                <label htmlFor="unit">Unit:</label>
                <Field type="text" fullWidth={true} name="unit" component={renderTextField} />
                <Field
                    name="category"
                    component={renderSelectField}
                    label="Category: "
                    >{categoryOptions}</Field>
                <Field type="hidden" component='input' name="purchased" />
                    <Button variant='raised' primary={true} onClick={props.handleSubmit} label="Submit" style={{marginRight:'2rem'}} />
                    <Button variant='raised' onClick={props.onDelete} label="Delete Item" backgroundColor={red400} labelColor={white}/>
            </form>
        </div>
    )
}

export default reduxForm({
    form: 'shoppingListItem'
})(itemEditor);