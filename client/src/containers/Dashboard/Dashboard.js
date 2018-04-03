import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import RecipeList from '../RecipeList/RecipeList';
import RecipeDisplay from '../../components/Recipe/RecipeDisplay/RecipeDisplay';
import RecipeControl from '../RecipeForm/RecipeControl';
import ShoppingListControl from '../ShoppingListControl/ShoppingListControl';
import classes from './Dashboard.css';
import * as actions from '../../store/actions';
import {Tab, Tabs} from 'material-ui/Tabs';

// import Wrapper from '../../hoc/Wrapper/Wrapper';


class Dashboard extends Component {
    state = {
        editMode: false,
        recipeListDisplay: false,
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
            mainWindow= <RecipeControl setEditMode={this.setEditModeHandler}/>;
        }
        return (
            <div className={classes.Dashboard}>
                <div className={classes.SideDrawer}>
                    <Tabs tabItemContainerStyle={{position: "absolute", bottom:"0"}}>
                        <Tab label="Recipes">
                            <RecipeList setEditMode={this.setEditModeHandler}/>
                        </Tab>
                        <Tab label="Shopping">
                            <ShoppingListControl />
                        </Tab>
                    </Tabs>
                </div>
                <div className={classes.MainWindow}>
                    <div className={classes.MainContent}>
                        <div className={["container", classes.HeaderBox].join(" ")}>
                            <Header />
                        </div>
                        <div className={["container", classes.MainWindow].join(' ')}>
                            {mainWindow}
                        </div>
                    </div>
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