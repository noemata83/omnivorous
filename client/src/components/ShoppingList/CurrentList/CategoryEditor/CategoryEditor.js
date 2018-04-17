import React, { Component }  from 'react';
import TextField from 'material-ui/TextField';
import { List, ListItem } from 'material-ui/List';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
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
                return <ListItem key={category} primaryText={category} rightIconButton={<Close onClick={() => this.deleteCategoryHandler(category)} />} />
            }
            return null;
        });
        return (<div>
            <div style={{maxHeight: '30vh', overflow:"auto"}}>
                <List>
                    {categories}
                </List>
            </div>
            <form onSubmit={this.addCategoryHandler} >
                <TextField name="newcategory" value={this.state.input} onChange={this.inputChangedHandler} />
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