import React, { Component } from 'react';
// import axios from 'axios';

import { connect } from 'react-redux';

import ShoppingList from '../../components/ShoppingList/ShoppingList';

class ShoppingListControl extends Component {
    state = {
        loading: true,
        shoppingListDisplay: false
    }

    toggleListDisplayHandler = () => {
        this.setState({
            shoppingListDisplay: !this.state.shoppingListDisplay
        })
    }

    // getListsHandler() {
    //     axios.get('/api/shopping').then( whatsit => console.log(whatsit.data));
    // }

    render() {           
        return (
            <ShoppingList 
            listDisplay={this.state.shoppingListDisplay}
            toggleDisplay={this.toggleListDisplayHandler}
            currentList={this.props.currentList}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        currentList: state.shoppingList.currentList
    }
}

export default connect(mapStateToProps)(ShoppingListControl);
