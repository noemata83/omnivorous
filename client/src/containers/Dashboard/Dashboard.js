import React, { Component } from 'react';

import RecipeList from '../RecipeList/RecipeList';
import RecipeDisplay from '../../components/RecipeDisplay/RecipeDisplay';
import classes from './Dashboard.css';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux/Aux';

class Dashboard extends Component {
    
    render () {
        return (
            <Aux>
                <div>
                    <RecipeList />
                </div>
                <div>
                    <RecipeDisplay />
                </div>
            </Aux>
            );
    }
}


export default Dashboard;