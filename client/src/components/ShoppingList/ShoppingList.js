import React, { Component } from 'react';
import { connect } from 'react-redux';

import ListControls from './ListControls/ListControls';
import CurrentList from './CurrentList/CurrentList';

import classes from './ShoppingList.css';
import { white, green600 } from 'material-ui/styles/colors';
import { FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { fetchShoppingLists, createShoppingList } from '../../store/actions';
import defaultList from './Prototype/defaultList';

class ShoppingListControl extends Component {
    state = {
        loading: true,
    }

    componentDidMount() {
        if (this.props.userId && !this.props.loading) {
            this.props.fetchShoppingLists();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.loading) {
            this.props.fetchShoppingLists(nextProps.userId);
            this.setState({loading: false});
        }
    }
    render() {           
        return ( 
       <div className={classes.ShoppingListContent}>
           <div className={classes.ListBox}>
                <h2 style={{ padding: '1rem', marginTop: 0, fontWeight: 'normal', color: white, backgroundColor: green600}}>Shopping List</h2>
                <FloatingActionButton style={{position:'absolute', top: 20, right: '20px', zIndex: '3'}} mini={true} onClick={() => this.props.createShoppingList(defaultList)} secondary={true}>
                    <ContentAdd />
                </FloatingActionButton>
                <div className={classes.ShoppingList}>
                    <ListControls />
                    <CurrentList />
                </div>
            </div>
       </div> 
        )
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchShoppingLists: () => dispatch(fetchShoppingLists()),
        createShoppingList: (list) => dispatch(createShoppingList(list)),
    }
}

const mapStateToProps = state => {
    return {
        currentList: state.shoppingList.currentList,
        loading: state.shoppingList.loading,
        userId: state.auth.userId || null
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListControl);