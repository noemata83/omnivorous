import React, { Component }  from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import ListCategory from './ListCategory/ListCategory';
import ListName from './ListName/listName';
import List from 'material-ui/List';
import ItemEditor from './ItemEditor/ItemEditor';
import classes from './CurrentList.css';
import TextField from 'material-ui/TextField';
import CategoryEditor from './CategoryEditor/CategoryEditor';
import * as R from 'ramda';

const MODES = {
    EDIT_ITEM: 'EDIT_ITEM',
    EDIT_CATEGORIES: 'EDIT_CATEGORIES',
    DISPLAY_LIST: 'DISPLAY_LIST'    
}

class CurrentList extends Component {

    state = {
        itemInput: '',
        editItem: false,
        mode: MODES.DISPLAY_LIST,
        editId: null,
        editName: false,
        nameInput: '',
        items: [],
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const nameInput = nextProps.currentList.name;
        const items = nextProps.currentList.items;
        return {
            ...prevState,
            nameInput,
            items
        }
    }

    addItemHandler = (e) => {
        // This method appends a new item to the list with the default category of "Uncategorized"
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
        // This method syncs the 'Add Item' input value with the local UI state
        this.setState({
            itemInput: e.target.value
        });
    }

    setItemEditModeHandler = (editId) => {
        // This method receives the .itemId of a shopping list item, toggles the editItem mode to in turn trigger the ItemEditor component to load in place of the list
        this.setState({
            mode: MODES.EDIT_ITEM,
            editId
        })
    }

    setCategoryEditModeHandler = () => {
        this.setState({
            mode: MODES.EDIT_CATEGORIES
        })
    }

    setDisplayModeHandler = () => {
        this.setState({
            mode: MODES.DISPLAY_LIST
        })
    }

    moveItem = (dragIndex, hoverIndex, category=null) => {
        const { items } = this.props.currentList;
        const dragItem = items[dragIndex];
        if (!category) category = items[hoverIndex].category;
        const updatedDragItem = {...dragItem,
                                 category};
        const updatedItems = R.insert(hoverIndex, updatedDragItem, R.remove(dragIndex, 1, items));
        this.setState({
            items: updatedItems
        });
    }

    setItem = () => {
        const list = {...this.props.currentList, items: this.state.items};
        this.props.updateList(list);
    }

    handleSubmit = values => {
        // This method handles the ItemEditor form submission, passing the needed values to the editItem action, nulling out the id of the item to be edited, and setting item edit mode to false.
        this.props.editItem(this.state.editId, values, this.props.currentList);
        this.setState({
            mode: MODES.DISPLAY_LIST,
            editId: null
        })
    }

    handleCheck = (item) => {
        // This method calls the editItem action to toggle the purchased status of a shopping list item when the checkbox for that item is checked.
        this.props.editItem(item.itemId, {...item, purchased: !item.purchased}, this.props.currentList);
    }

    handleDeleteItem = () => {
        // This method handles the user option to delete an item from the shopping list.
        this.props.deleteItem(this.state.editId, this.props.currentList);
        this.setState({
            mode: MODES.DISPLAY_LIST,
            editId: null
        })
    }
    
    handleEditName = () => {
        // This method updates the editName property to toggle the rendering of an input field to change the name of the current list.
        this.setState({
            editName: true
        });
    }

    handleNameInputChange = (event) => {
        // This method syncs the Name form to local UI state
        this.setState({
            nameInput: event.target.value
        });
    }

    handleDeleteList = (list) => {
        // This method allows the user to delete a list.
        if (window.confirm(`Are you sure you want to delete the list?`)) {
            this.props.deleteList(list);
        }
    }

    handleNameChangeSubmit = (e) => {
        // This method handles the submisssion of the name change form.
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
        // This method retrieves the detailed data for a shopping list item.
       return this.props.currentList.items.find(item => item.itemId === itemId);
    }
    
    getAbsoluteIndex = (itemId) => {
        return R.findIndex(R.propEq('itemId', itemId))(this.props.currentList.items);
    }

    render() {
        const categories = R.map(category => <ListCategory 
            setEditMode={this.setItemEditModeHandler}
            moveItem={this.moveItem}
            setItem = {this.setItem}
            handleCheck={this.handleCheck}
            getAbsoluteIndex={this.getAbsoluteIndex}
            items={
                this.state.items.filter(item => category === item.category)
            } key={category} name={category}/>, [...this.props.currentList.categories].sort());
        switch(this.state.mode) {
            case(MODES.EDIT_ITEM):
                return <ItemEditor initialValues={this.getItemToEdit(this.state.editId)} onSubmit={this.handleSubmit} id={this.state.editId} onDelete={this.handleDeleteItem} categories={this.props.currentList.categories} />;
            case(MODES.EDIT_CATEGORIES):
                return <CategoryEditor onDone={this.setDisplayModeHandler} />;
            default:
                return (<div>
                    <ListName manageCategories={this.setCategoryEditModeHandler} editName={this.state.editName} handleDeleteList={this.handleDeleteList} handleNameChangeSubmit={this.handleNameChangeSubmit} handleNameInputChange={this.handleNameInputChange} nameInput={this.state.nameInput} handleEditName={this.handleEditName} name={this.props.currentList.name} list={this.props.currentList._id}/>
                    <div className={classes.List}>
                        <List>
                            {categories}
                        </List>
                    </div>
                    <form onSubmit={this.addItemHandler} style={{padding:'0 1rem'}}>
                        <TextField name="addItem" style={{height:'50px'}} value={this.state.itemInput} onChange={this.inputChangedHandler} fullWidth={true} floatingLabelText="Add Item" floatingLabelStyle={{fontSize:'1.8rem', lineHeight: '22px', top: '18px'}} floatingLabelShrinkStyle={{transform: 'scale(0.75) translate(0px, -16px)'}} inputStyle={{marginTop:'1.5rem', height: '50px'}} underlineStyle={{bottom:'0px'}}/>
                    </form>
                </div>);
        }
    }
        
}

const mapStateToProps = state => {
    return {
        nextId: state.shoppingList.nextId,
        currentList: state.shoppingList.currentList,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addItem: (item, currentList) => dispatch(actions.addListItem(item, currentList)),
        editItem: (itemId, item, currentList) => dispatch(actions.editListItem(itemId, item, currentList)),   
        deleteItem: (itemId, currentList) => dispatch(actions.deleteListItem(itemId, currentList)),
        updateList: (list) => dispatch(actions.updateList(list)),
        deleteList: (id) => dispatch(actions.deleteShoppingList(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentList);