import React, { Component } from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

class ShoppingListControl extends Component {

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
            <div>
                <button onClick={this.makeListHandler}>Make List</button>
                <button onClick={this.getListsHandler}>Get List</button>
            </div>
        );
    }
}

export default ShoppingListControl;
