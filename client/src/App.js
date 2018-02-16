import React, { Component } from 'react';
import { Route } from 'react-router-dom';

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
            <Route path="/" exact component={Landing} />
            <Route path="/recipes" exact component={Dashboard} />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchUser: () => dispatch(actions.fetchUser())
  }
}

export default connect(null, mapDispatchToProps)(App);
