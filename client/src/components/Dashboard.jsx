import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { cyan400 } from 'material-ui/styles/colors';
import withSizes from 'react-sizes';
import { Drawer } from '@material-ui/core';

import Header from './Header/Header';
import SideHeader from './SideHeader/SideHeader';
import RecipeList from './RecipeList/RecipeList';
import RecipeDisplay from './Recipe/RecipeDisplay/RecipeDisplay';
import RecipeControl from './Recipe/RecipeControl';
import ShoppingListControl from './ShoppingList/ShoppingList';
import classes from './Dashboard.css';
import * as actions from '../store/actions';
import CookBook from '../assets/img/noun_51422_cc.svg'; // Cookbook Icon by Marcella Cigarini for the Noun Project
import RecipeIcon from '../assets/img/noun_1142064_cc.svg'; // Cooking Icon by Dinosoft Labs for the Noun Project
import ShoppingListIcon from '../assets/img/noun_1351304_cc.svg'; // Shopping List Icon by Gregor Cresnar for the Noun Project
import MealPlanIcon from '../assets/img/noun_689869_cc.svg'; // Calendar Icon by Smidt Sergey, US for the Noun Project

// import Wrapper from '../../hoc/Wrapper/Wrapper';

class Dashboard extends Component {
  state = {
    editMode: false,
    // recipeListDisplay: false,
    tab: 'recipe',
    nav: 'recipe',
    drawer: true,
  };
  
  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.isMobile) {
      return {
        ...prevState,
        nav: 'recipe',
      };
    }
    return {
      ...prevState,
      drawer: false,
    };
  }
  componentDidMount() {
    this.props.fetchUser();
  }

  onToggleDrawer = () =>
    this.setState({
      drawer: !this.state.drawer,
    });

  setEditModeHandler = target => 
    this.setState({ 
      nav: 'recipe', 
      editMode: target,
      drawer: false,
    });

  handleNavChange = (event, value) => {
    this.setState({
      nav: value,
    });
  };

  handleTabChange = (event, value) => {
    this.setState({
      tab: value,
    });
  };

  displayRecipe = () => {
    this.setState({
      nav: 'recipe',
    });
  };


  render() {
    let mainWindow = <RecipeDisplay />;
    if (this.state.editMode) {
      mainWindow = <RecipeControl setEditMode={this.setEditModeHandler} />;
    }
    return (
      <div className={classes.Dashboard}>
        {/* <div className={classes.SideDrawer}> */}
        <Drawer 
          variant="persistent"
          anchor="left"
          open={this.state.drawer}
          onClose={this.onToggleDrawer}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <SideHeader onClose={this.onToggleDrawer} />
          <Tabs
            value={this.state.tab}
            onChange={this.handleTabChange}
            fullWidth
          >
            <Tab
              value="recipe"
              label="Recipes"
              style={{ backgroundColor: cyan400 }}
            />
            <Tab
              value="shopping"
              label="Shopping"
              style={{ backgroundColor: cyan400 }}
            />
          </Tabs>
          {this.state.tab === 'recipe' && (
            <RecipeList
              setEditMode={this.setEditModeHandler}
              displayRecipe={this.displayRecipe}
            />
          )}
          {this.state.tab === 'shopping' && <ShoppingListControl />}
        </Drawer>
        {/* </div> */}
        <div className={classnames(classes.MainWindow, {
          [classes.MainWindowShift]: this.state.drawer,
        })}>
          <div className={classes.MainContent}>
            <div className={classes.HeaderBox}>
              <Header drawerToggle={this.onToggleDrawer} drawerOpen={this.state.drawer} />
            </div>
            <div className={classes.MainWindow}>
              {this.state.nav === 'recipe' && mainWindow}
              {this.state.nav === 'list' && (
                <RecipeList
                  setEditMode={this.setEditModeHandler}
                  displayRecipe={this.displayRecipe}
                />
              )}
              {this.state.nav === 'shopping' && <ShoppingListControl />}
              {this.state.nav === 'plan' && (
                <div>Some day, I will be a meal plan!</div>
              )}
              <BottomNavigation
                value={this.state.nav}
                onChange={this.handleNavChange}
                style={
                  this.props.isMobile
                    ? {
                        position: 'fixed',
                        bottom: 0,
                        width: '100%',
                        zIndex: 100,
                      }
                    : { display: 'none' }
                }
              >
                <BottomNavigationAction
                  value="recipe"
                  classes={{ iconOnly: classes.BottomNavIcon }}
                  style={{ backgroundColor: cyan400 }}
                  icon={
                    <img
                      src={RecipeIcon}
                      alt="Recipe Icon"
                      style={{ height: '36px', width: '36px' }}
                    />
                  }
                />
                <BottomNavigationAction
                  value="list"
                  classes={{ iconOnly: classes.BottomNavIcon }}
                  style={{ backgroundColor: cyan400 }}
                  icon={
                    <img
                      src={CookBook}
                      alt="CookBook icon"
                      style={{ height: '36px', width: '36px' }}
                    />
                  }
                />
                <BottomNavigationAction
                  value="shopping"
                  classes={{ iconOnly: classes.BottomNavIcon }}
                  style={{ backgroundColor: cyan400 }}
                  icon={
                    <img
                      src={ShoppingListIcon}
                      alt="Shopping List Icon"
                      style={{ height: '36px', width: '36px' }}
                    />
                  }
                />
                <BottomNavigationAction
                  value="plan"
                  classes={{ iconOnly: classes.BottomNavIcon }}
                  style={{ backgroundColor: cyan400 }}
                  icon={
                    <img
                      src={MealPlanIcon}
                      alt="Meal Plan Icon"
                      style={{ height: '36px', width: '36px' }}
                    />
                  }
                />
              </BottomNavigation>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(actions.fetchUser()),
});

const mapSizesToProps = ({ width }) => ({
  isMobile: width < 750,
});

Dashboard.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  fetchUser: PropTypes.func.isRequired,
};

export default withSizes(mapSizesToProps)(connect(null, mapDispatchToProps)(Dashboard));
