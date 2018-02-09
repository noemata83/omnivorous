import React, { Component } from 'react';

import RecipeList from '../RecipeList/RecipeList';
import RecipeDisplay from '../../components/Recipe/RecipeDisplay/RecipeDisplay';
import RecipeForm from '../RecipeForm/RecipeForm';
import classes from './Dashboard.css';
import Wrapper from '../../hoc/Wrapper/Wrapper';

class Dashboard extends Component {
    state = {
        editMode: false
    }

    setEditModeHandler = (target) => {
        console.log("I'm setting it!");
        this.setState({ editMode: target});
    }

    render () {
        let mainWindow = <RecipeDisplay />;
        if (this.state.editMode) {
            mainWindow= <RecipeForm />;
        }
        return (
            <Wrapper>
                <div className={classes.RecipeList}>
                    <RecipeList setEditMode={this.setEditModeHandler}/>
                </div>
                <div className={classes.MainWindow}>
                    {mainWindow}
                </div>
            </Wrapper>
            );
    }
}


export default Dashboard;