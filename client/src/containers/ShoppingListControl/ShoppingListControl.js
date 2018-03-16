import React, { Component } from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import ShoppingList from '../../components/ShoppingList/ShoppingList';

class ShoppingListControl extends Component {
    state = {
        loading: true,
        shoppingListDisplay: false
    }

    toggleListDisplayHandler = () => {
        console.log("Time to toggle!");
        this.setState({
            shoppingListDisplay: !this.state.shoppingListDisplay
        })
    }

    makeListHandler = () => {
        axios.post('/api/shopping', {
            name: 'List',
            categories: ['Uncategorized'],
            items: [
                {
                    name: 'Thing',
                    quantity: '1',
                    unit: 'unit',
                    purchased: false
                }
            ]
        }).then ( res => {
            console.log(res.data);
        }).catch( e => console.log(e));
    }

    getListsHandler() {
        axios.get('/api/shopping').then( whatsit => console.log(whatsit.data));
    }

    render() {
        return (
           <ShoppingList 
            listDisplay={this.state.shoppingListDisplay}
            toggleDisplay={this.toggleListDisplayHandler}
            />
        );
    }
}

export default ShoppingListControl;
