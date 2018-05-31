import React, { Component } from 'react';
import { Route, withRouter, Redirect, Switch } from 'react-router-dom';

import { connect } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard';
import * as actions from './store/actions';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const PrivateRoute = ({ component: Component, currentUser, ...rest }) =>
  <Route {...rest} render={(props) => (
    currentUser ?
      <Component {...props} />
      : <Redirect to='/' />
  )} />;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Switch>
            <Route path="/" exact render={() => this.props.currentUser ? ( <Redirect to="/recipes" />) : (<Landing /> )} />
            <PrivateRoute path="/recipes" currentUser={this.props.currentUser} component={Dashboard} />
        </Switch>
      </MuiThemeProvider>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DragDropContext(HTML5Backend)(App)));
