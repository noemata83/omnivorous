import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import RecipeList from '../RecipeList/RecipeList';
import RecipeDisplay from '../../components/Recipe/RecipeDisplay/RecipeDisplay';
import RecipeForm from '../RecipeForm/RecipeForm';
import classes from './Dashboard.css';
import * as actions from '../../store/actions';

// import Wrapper from '../../hoc/Wrapper/Wrapper';


class Dashboard extends Component {
    state = {
        editMode: false
    }

    componentDidMount() {
        this.props.fetchUser();
    }

    setEditModeHandler = (target) => {
        this.setState({ editMode: target});
    }

    render () {
        let mainWindow = <RecipeDisplay />;
        if (this.state.editMode) {
            mainWindow= <RecipeForm setEditMode={this.setEditModeHandler}/>;
        }
        return (
            <div>
                <div className={classes.Background}>
                    <div className={classes.Layer}></div>
                </div>
                <div className={classes.HeaderBox}>
                    <Header />
                </div>
                
                <div className={classes.RecipeList}>
                    <RecipeList setEditMode={this.setEditModeHandler}/>
                </div>
                <div className={classes.MainWindow}>
                    {mainWindow}
                </div>
            </div>
            );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUser: () => dispatch(actions.fetchUser())
    }
}

export default connect(null, mapDispatchToProps)(Dashboard);