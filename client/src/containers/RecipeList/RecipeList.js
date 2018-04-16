import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/';

import { List, ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import classes from './RecipeList.css';
import { white, green600, grey400 } from 'material-ui/styles/colors';

class RecipeList extends Component {

    state = {
        loading: true,
        recipeListDisplay: false
    }

    componentDidMount(){
        if (this.props.userId && !this.props.loading) {
            this.props.fetchRecipes(this.props.userId);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.loading) {
            this.props.fetchRecipes(nextProps.userId);
            this.setState({loading: false});
        }
    }

    toggleRecipeListHandler = () => {
        this.setState({
            recipeListDisplay: !this.state.recipeListDisplay
        })
    }

    render() {
        const recipes = this.props.recipes.map(recipe => <ListItem 
            primaryText={recipe.name} 
            rightIconButton={<IconButton onClick={()=> { this.props.onSelectRecipe(this.props.userId, recipe); this.props.setEditMode(true)}} iconStyle={{color: grey400}}><ModeEdit /></IconButton>} 
            onClick={() => {this.props.onSelectRecipe(this.props.userId, recipe); this.props.displayRecipe(); this.props.setEditMode(false);}} 
            key={recipe._id}
            innerDivStyle={{paddingLeft: 0}}
            name={recipe.name} />);
        return (
            <div className={classes.RecipeContent}>
                <h2 style={{ padding: '1rem', marginTop: 0, fontWeight: 'normal', color: white, backgroundColor: green600}}>My Recipes</h2>
                <FloatingActionButton style={{position:'absolute', top: 20, right: '20px', zIndex: '3'}} mini={true} onClick={() => {this.props.addNewRecipe(); this.props.setEditMode(true)}} secondary={true}>
                    <ContentAdd />
                </FloatingActionButton>
                <div className={classes.ListBox}>
                    <List>
                        {recipes}
                    </List>
                </div>
            </div>  );    

    }
    
};

const mapStateToProps = state => {
    return {
        recipes: state.recipe.recipes,
        userId: state.auth.userId || null,
        loading: state.recipe.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSelectRecipe: (user, recipe) => dispatch(actions.fetchRecipe(user, recipe)),
        addNewRecipe: () => dispatch(actions.newRecipe()),
        fetchRecipes: (user) => dispatch(actions.fetchRecipes(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList);