import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Landing from './components/Landing/Landing';
import Dashboard from './containers/Dashboard/Dashboard';

class App extends Component {
  render() {
    return (
      <div className="App">
            <Route path="/" exact component={Landing} />
            <Route path="/recipes" exact component={Dashboard} />
      </div>
    );
  }
}

export default App;
