import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import { renderSelectField, renderTextField } from '../../../UI/Forms/renderFields';
import MenuItem from 'material-ui/MenuItem';
import { red400 } from 'material-ui/styles/colors';
import { white } from 'material-ui/styles/colors';

const itemEditor = (props) => {
    const categoryOptions = props.categories.map(category => <MenuItem key={category} value={category} primaryText={category} />);
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <label htmlFor="name">Item:</label>
                <Field type="text" fullWidth={true} name="name" component={renderTextField} />
                <label htmlFor="qty">Qty:</label>
                <Field type="number" fullWidth={true} name="quantity" component={renderTextField} />
                <label htmlFor="unit">Unit:</label>
                <Field type="text" fullWidth={true} name="unit" component={renderTextField} />
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