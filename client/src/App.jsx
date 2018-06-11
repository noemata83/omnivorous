import React, { Component } from 'react';
import { Route, withRouter, Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import theme from './theme';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard';
import * as actions from './store/actions';

const PrivateRoute = ({ component: Component, currentUser, ...rest }) => // eslint-disable-line
  (<Route
    {...rest}
    render={props => (
      currentUser ?
        <Component {...props} />
        : <Redirect to="/" />
      )}
  />);

PrivateRoute.propTypes = {
  currentUser: PropTypes.string,
};

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Switch>
          <Route path="/" exact render={() => (this.props.currentUser ? (<Redirect to="/recipes" />) : (<Landing />))} />
          <PrivateRoute path="/recipes" currentUser={this.props.currentUser} component={Dashboard} />
        </Switch>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.userId,
});

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(actions.fetchUser()),
});

App.defaultProps = {
  currentUser: '',
};

App.propTypes = {
  currentUser: PropTypes.string,
  fetchUser: PropTypes.func.isRequired,
};

export default
withRouter(connect(mapStateToProps, mapDispatchToProps)(DragDropContext(HTML5Backend)(App)));
