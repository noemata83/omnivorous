import React, { Component }  from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import ListCategory from './ListCategory/ListCategory';
import ListName from './ListName/listName';
import List from 'material-ui/List';
import ItemEditor from './ItemEditor/ItemEditor';
import classes from './CurrentList.css';
import TextField from 'material-ui/TextField';

class CurrentList extends Component {

    state = {
        itemInput: '',
        editItem: false,
        editId: null,
        editName: false,
        nameInput: ''
    }
    
    componentWillReceiveProps(nextprops) {
        this.setState({
            nameInput: nextprops.currentList.name
        });
    }

    addItemHandler = (e) => {
        e.preventDefault();
        const item = {
            name: this.state.itemInput,
            unit: '',
            quantity: 1,
            itemId: this.props.currentList.nextId,
            category: 'Uncategorized',
            purchased: false
        }
        this.props.addItem(item, this.props.currentList);
        this.setState({itemInput: ''});
    }

    inputChangedHandler = (e) => {
        this.setState({
            itemInput: e.target.value
        });
    }

    setEditModeHandler = (editId) => {
        this.setState({
            editItem: true,
            editId
        })
    }

    handleSubmit = values => {
        this.props.editItem(this.state.editId, values, this.props.currentList);
        this.setState({
            editItem: false,
            editId: null
        })
    }

    handleCheck = (item) => {
        this.props.editItem(item.itemId, {...item, purchased: !item.purchased}, this.props.currentList);
    }

    handleDeleteItem = () => {
        this.props.deleteItem(this.state.editId, this.props.currentList);
        this.setState({
            editItem: false,
            editId: null
        })
    }
    
    handleEditName = () => {
        this.setState({
            editName: true
        });
    }

    handleNameInputChange = (event) => {
        this.setState({
            nameInput: event.target.value
        });
    }

    handleDeleteList = (list) => {
        if (window.confirm(`Are you sure you want to delete the list?`)) {
            this.props.deleteList(list);
        }
    }

    handleNameChangeSubmit = (e) => {
        e.preventDefault();
        const list = {
            ...this.props.currentList,
            name: this.state.nameInput
        }
        this.props.updateList(list);
        this.setState({
            editName: false
        })
    }

    getItemToEdit = (itemId) => {
       return this.props.currentList.items.find(item => item.itemId === itemId);
    }

    render() {
        const categories = this.props.currentList.categories.map(category => <ListCategory 
            setEditMode={this.setEditModeHandler}
            handleCheck={this.handleCheck}
            items={
                this.props.currentList.items.filter(item => category === item.category)
            } key={category} name={category}/>);
        const shoppingDisplay = this.state.editItem ? 
            <ItemEditor initialValues={this.getItemToEdit(this.state.editId)} onSubmit={this.handleSubmit} id={this.state.editId} onDelete={this.handleDeleteItem} categories={this.props.categories} /> 
            : ( <div>
                    <ListName editName={this.state.editName} handleDeleteList={this.handleDeleteList} handleNameChangeSubmit={this.handleNameChangeSubmit} handleNameInputChange={this.handleNameInputChange} nameInput={this.state.nameInput} handleEditName={this.handleEditName} name={this.props.currentList.name} list={this.props.currentList._id}/>
                    <div className={classes.List}>
                        <List>
                            {categories}
                        </List>
                    </div>
                    <form onSubmit={this.addItemHandler} style={{padding:'0 1rem'}}>
                        <TextField name="addItem" value={this.state.itemInput} onChange={this.inputChangedHandler} fullWidth={true} floatingLabelText="Add Item" floatingLabelStyle={{fontSize:'1.8rem'}} inputStyle={{marginTop:'.5rem'}}/>
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
        categories: state.shoppingList.currentList.categories,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addItem: (item, currentList) => dispatch(actions.addListItem(item, currentList)),
        editItem: (itemId, item, currentList) => dispatch(actions.editListItem(itemId, item, currentList)),   
        deleteItem: (itemId, currentList) => dispatch(actions.deleteListItem(itemId, currentList)),
        updateList: (list, user) => dispatch(actions.updateList(list, user)),
        deleteList: (id) => dispatch(actions.deleteShoppingList(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentList);