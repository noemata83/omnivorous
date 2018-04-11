import React, { Component } from 'react';
// import axios from 'axios';

import { connect } from 'react-redux';

import ShoppingList from '../../components/ShoppingList/ShoppingList';
import { fetchShoppingLists } from '../../store/actions';

class ShoppingListControl extends Component {
    state = {
        loading: true,
    }

    componentDidMount() {
        if (this.props.userId && !this.props.loading) {
            this.props.fetchShoppingLists(this.props.userId);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.loading) {
            this.props.fetchShoppingLists(nextProps.userId);
            this.setState({loading: false});
        }
    }
    // toggleListDisplayHandler = () => {
    //     this.setState({
    //         shoppingListDisplay: !this.state.shoppingListDisplay
    //     })
    // }

    // getListsHandler() {
    //     axios.get('/api/shopping').then( whatsit => console.log(whatsit.data));
    // }

    render() {           
        return (
            <ShoppingList 
            listDisplay={this.state.shoppingListDisplay}
            currentList={this.props.currentList}
            />
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchShoppingLists: () => dispatch(fetchShoppingLists())
    }
}

const mapStateToProps = state => {
    return {
        currentList: state.shoppingList.currentList,
        userId: state.auth.userId || null,
        loading: state.shoppingList.loading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListControl);
