import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { white, green600 } from 'material-ui/styles/colors';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';

import ListControls from './ListControls/ListControls';
import CurrentList from './CurrentList/CurrentList';

import classes from './ShoppingList.css';

import { fetchShoppingLists, createShoppingList } from '../../store/actions';
import defaultList from './Prototype/defaultList';

class ShoppingListControl extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    if (this.props.userId && !this.props.loading) {
      this.props.fetchShoppingLists();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.loading) {
      this.props.fetchShoppingLists(nextProps.userId);
      this.setState({ loading: false });
    }
  }
  render() {
    return (
      <div className={classes.ShoppingListContent}>
        <div className={classes.ListBox}>
          <h2
            style={{
              padding: '1rem',
              marginTop: 0,
              fontWeight: 'normal',
              color: white,
              backgroundColor: green600,
            }}
          >
            Shopping List
          </h2>
          <Button
            variant="fab"
            style={{
              position: 'absolute',
              top: 20,
              right: '20px',
              zIndex: '3',
            }}
            mini
            onClick={() => this.props.createShoppingList(defaultList)}
            color="secondary"
          >
            <Add />
          </Button>
          <div className={classes.ShoppingList}>
            <ListControls />
            <CurrentList />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchShoppingLists: () => dispatch(fetchShoppingLists()),
  createShoppingList: list => dispatch(createShoppingList(list)),
});

const mapStateToProps = state => ({
  currentList: state.shoppingList.currentList,
  loading: state.shoppingList.loading,
  userId: state.auth.userId || null,
});

ShoppingListControl.defaultProps = {
  userId: null,
};

ShoppingListControl.propTypes = {
  userId: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  fetchShoppingLists: PropTypes.func.isRequired,
  createShoppingList: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShoppingListControl);
