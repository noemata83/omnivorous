import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';

import { recipeHeader, recipeFooter } from './formPrototypes/recipeForm';
import Input from '../../UI/Input/Input';
// import Button from '../../UI/Button/Button';
import ingredientForm from './IngredientForm/ingredientForm';
import instructionForm from './InstructionForm/instructionForm';
import validate from './helpers/validator';
import classes from './RecipeForm.css';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { white } from 'material-ui/styles/colors';
import { red500 } from 'material-ui/styles/colors';

// import * as helpers from './helpers/';

const recipeForm = (props) => {
    const { handleSubmit, onDelete, initialValues } = props;
    let recipeAction = (<div><FlatButton primary={true} label="Add Recipe"></FlatButton></div>);
    let importButton = null;
    if (initialValues) {
        recipeAction = (<div>
                        <FlatButton primary={true} onClick={handleSubmit} label="Edit Recipe" />
                        <FlatButton onClick={() => { onDelete(initialValues._id)}} label="Delete Recipe" style={{color:red500}} />
                        </div>);
    } else {
        importButton = (<RaisedButton onClick={props.onImportInit} secondary={true} labelColor={white} label="Import from the Web" style={{float: 'right', fontSize: '2rem'}} />)
    }
    return (
        <div className={classes.RecipeForm}>
            <h2 className={classes.Header}>Add a Recipe</h2>
            {importButton}
            <form onSubmit={ handleSubmit }>
            { recipeHeader.map( ({ label, name, type, style }) => (<Field component={Input} name={name} key={name} type={type} label={label} style={style} />)) }
            <FieldArray name="recipeIngredient" component={ingredientForm} />
            <FieldArray name="recipeInstructions" component={instructionForm} />
            { recipeFooter.map( ({ label, name, type, style }) => (<Field component={Input} name={name} key={name} type={type} label={label} style={style} />)) }
            <div className={classes.FormFooter}>
                {recipeAction}
            </div>
            </form>
        </div>
    )
}
export default reduxForm({
    form: 'recipeForm',
    validate,
    enableReinitialize: true
})(recipeForm);
