import React from 'react';
import { Field, reduxForm } from 'redux-form';
 
const itemEditor = (props) => {
    const categoryOptions = props.categories.map(category => <option key={category} value={category}>{category}</option>);
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
                <Field type="select" component='select' name="category" style={{display:'block'}}>{categoryOptions}</Field>
                <Field type="hidden" component='input' name="purchased" />
                <button type="submit" >Submit</button>
            </form>
        </div>
    )
}

export default reduxForm({
    form: 'shoppingListItem'
})(itemEditor);