import React, { Component }  from 'react';
import TextField from 'material-ui/TextField';
import { List, ListItem } from 'material-ui/List';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {addCategory, deleteCategory} from '../../../../store/actions';
import Close from 'material-ui/svg-icons/navigation/close';

class CategoryEditor extends Component {
    state = {
        input: '',
    }

    inputChangedHandler = (e) => {
        this.setState({
            input: e.target.value
        })
    }

    addCategoryHandler = (e) => {
        e.preventDefault();
        this.props.addCategory(this.state.input, this.props.currentList);
        this.setState({
            input: '',
        })
    }

    deleteCategoryHandler = (category) => {
        this.props.deleteCategory(category, this.props.currentList);
    }

    render() {
        const categories = this.props.currentList.categories.map(category => {
            if (category !== 'Uncategorized') {
            return <ListItem key={category} primaryText={category} rightIconButton={<FlatButton style={{marginTop:'.5rem'}} icon={<Close onClick={() => this.deleteCategoryHandler(category)} />} />} />
            }
            return null;
        });
        return (<div style={{padding:'0 1rem'}}>
            <div style={{maxHeight: '35vh', overflow:"auto"}}>
                <List>
                    {categories}
                </List>
            </div>
            <form onSubmit={this.addCategoryHandler} >
                <TextField floatingLabelText="Add Category" name="newcategory"  fullWidth={true} value={this.state.input} onChange={this.inputChangedHandler} floatingLabelStyle={{fontSize:'1.8rem'}} inputStyle={{marginTop:'.5rem'}} />
            </form>
            <RaisedButton onClick={this.props.onDone} label="Return to List" />
        </div>);
    }
}

const mapStateToProps = state => {
    return {
        currentList: state.shoppingList.currentList,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addCategory: (category, currentList) => dispatch(addCategory(category, currentList)),
        deleteCategory: (category, currentList) => dispatch(deleteCategory(category, currentList))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryEditor);