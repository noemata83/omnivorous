import React, { Component } from 'react';
import { Route, withRouter, Redirect, Switch } from 'react-router-dom';

import { connect } from 'react-redux';

import Landing from './components/Landing/Landing';
import Dashboard from './containers/Dashboard/Dashboard';
import * as actions from './store/actions';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className="App">
        <Switch>
            <Route path="/" exact render={() => this.props.currentUser ? ( <Redirect to="/recipes" />) : (<Landing /> )} />
            <Route path="/recipes" component={Dashboard} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: () => dispatch(actions.fetchUser())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
