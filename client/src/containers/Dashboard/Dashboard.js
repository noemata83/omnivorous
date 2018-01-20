import React, { Component } from 'react';

import RecipeList from '../RecipeList/RecipeList';
import RecipeDisplay from '../../components/RecipeDisplay/RecipeDisplay';
import classes from './Dashboard.css';
import { connect } from 'react-redux';
import Wrapper from '../../hoc/Wrapper/Wrapper';

class Dashboard extends Component {
    
    render () {
        return (
            <Wrapper>
                <div>
                    <RecipeList />
                </div>
                <div>
                    <RecipeDisplay />
                </div>
            </Wrapper>
            );
    }
}


export default Dashboard;