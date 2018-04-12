import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';

import { recipeHeader, recipeFooter } from './formPrototypes/recipeForm';
import ingredientForm from './IngredientForm/ingredientForm';
import instructionForm from './InstructionForm/instructionForm';
import validate from './helpers/validator';
import classes from './RecipeForm.css';
import Button from 'material-ui/Button';
import { renderTextField } from '../../UI/Forms/renderFields';
import common from 'material-ui/colors/common';
import red from 'material-ui/colors/red';

const white = common.white;
const red500 = red['500'];

// import * as helpers from './helpers/';

const recipeForm = (props) => {
    const { handleSubmit, onDelete, initialValues } = props;
    let recipeAction = (<div><Button variant='flat' primary={true} onClick={handleSubmit} label="Add Recipe"></Button></div>);
    let importButton = null;
    if (initialValues) {
        recipeAction = (<div>
                        <Button variant='flat' primary={true} onClick={handleSubmit} label="Edit Recipe" />
                        <Button variant='flat' onClick={() => { onDelete(initialValues._id)}} label="Delete Recipe" style={{color:red500}} />
                        </div>);
    } else {
        importButton = (<Button variant='raised' onClick={props.onImportInit} secondary={true} labelColor={white} label="Import from the Web" style={{float: 'right', fontSize: '2rem'}} />)
    }
    return (
        <div className={classes.RecipeForm}>
            <h2 className={classes.Header}>Add a Recipe</h2>
            {importButton}
            <form onSubmit={ handleSubmit }>
            { recipeHeader.map( ({ label, name, style, ...custom }) => <Field component={renderTextField} name={name} key={name} label={label} style={style} {...custom} />)};
            <FieldArray name="recipeIngredient" component={ingredientForm} />
            <FieldArray name="recipeInstructions" component={instructionForm} />
            { recipeFooter.map( ({ label, name, type, style, ...custom }) => (<Field component={renderTextField} name={name} key={name} type={type} label={label} style={style} {...custom} />)) }
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
