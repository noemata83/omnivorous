import React, { Component }  from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import ListCategory from './ListCategory/ListCategory';
import classes from './CurrentList.css';

class CurrentList extends Component {

    state = {
        itemInput: '',

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

    render() {
        const categories = this.props.currentList.categories.map(category => <ListCategory items={
            this.props.currentList.items.filter(item => category === item.category)
        } key={category} name={category}/>);
        return (
            <div>
                <h2 className={classes.ListTitle}>{this.props.currentList.name}</h2>
                <div className={classes.List}>
                    <ul className={classes.ShoppingList}>
                        {categories}
                    </ul>
                </div>
                <form onSubmit={this.addItemHandler}>
                    <input className={classes.ItemInput} type="text" name="addItem" value={this.state.itemInput} onChange={this.inputChangedHandler} placeholder="Add Item" />
                </form>
            </div>
        )
}
}

const mapStateToProps = state => {
    return {
        nextId: state.shoppingList.nextId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addItem: (item) => dispatch(actions.addListItem(item))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentList);