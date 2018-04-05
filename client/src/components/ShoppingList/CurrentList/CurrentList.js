import React, { Component }  from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import ListCategory from './ListCategory/ListCategory';
import List from 'material-ui/List';
import ItemEditor from './ItemEditor/ItemEditor';
import classes from './CurrentList.css';

class CurrentList extends Component {

    state = {
        itemInput: '',
        editing: false,
        editId: null,
    }

    addItemHandler = (e) => {
        e.preventDefault();
        const item = {
            name: this.state.itemInput,
            unit: '',
            quantity: 1,
            itemId: this.props.nextId,
            category: 'Uncategorized'
        }
        this.props.addItem(item);
        this.setState({itemInput: ''});
    }

    inputChangedHandler = (e) => {
        this.setState({
            itemInput: e.target.value
        });
    }

    setEditModeHandler = (editId) => {
        this.setState({
            editing: true,
            editId
        })
    }

    handleSubmit = values => {
        this.props.editItem(this.state.editId, values);
        this.setState({
            editing: false,
            editId: null
        })
    }

    handleDelete = () => {
        this.props.deleteItem(this.state.editId);
        this.setState({
            editing: false,
            editId: null
        })
    }

    getItemToEdit = (itemId) => {
       return this.props.currentList.items.find(item => item.itemId === itemId);
    }

    render() {
        const categories = this.props.currentList.categories.map(category => <ListCategory 
            setEditMode={this.setEditModeHandler}
            items={
                this.props.currentList.items.filter(item => category === item.category)
            } key={category} name={category}/>);
        const shoppingDisplay = this.state.editing ? 
            <ItemEditor initialValues={this.getItemToEdit(this.state.editId)} onSubmit={this.handleSubmit} id={this.state.editId} onDelete={this.handleDelete} categories={this.props.categories} /> 
            : ( <div>
                   <h2 className={classes.ListTitle}>{this.props.currentList.name}</h2>
                    <div className={classes.List}>
                        <List>
                            {categories}
                        </List>
                    </div>
                    <form onSubmit={this.addItemHandler}>
                        <input className={classes.ItemInput} type="text" name="addItem" value={this.state.itemInput} onChange={this.inputChangedHandler} placeholder="Add Item" />
                    </form>
                </div>
            );
        return (
            <div>
                {shoppingDisplay}
            </div>
        )
}
}

const mapStateToProps = state => {
    return {
        nextId: state.shoppingList.nextId,
        categories: state.shoppingList.currentList.categories
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addItem: (item) => dispatch(actions.addListItem(item)),
        editItem: (itemId, item) => dispatch(actions.editListItem(itemId, item)),   
        deleteItem: (itemId) => dispatch(actions.deleteListItem(itemId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentList);