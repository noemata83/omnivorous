import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';

import { recipeHeader, recipeFooter } from './formPrototypes/recipeForm';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import ingredientForm from './IngredientForm/ingredientForm';
import instructionForm from './InstructionForm/instructionForm';
import validate from './helpers/validator';
import classes from './RecipeForm.css';

// import * as helpers from './helpers/';

const recipeForm = (props) => {
    const { handleSubmit, onDelete, initialValues } = props;
    let recipeAction = (<div><Button buttonType="Success">Add Recipe</Button></div>);
    let importButton = null;
    if (initialValues) {
        recipeAction = (<div>
                        <Button buttonType="Success">Edit Recipe</Button>
                        <Button buttonType="Danger" clicked={() => { onDelete(initialValues._id)}}>Delete Recipe</Button>
                        </div>);
    } else {
        importButton = (<Button buttonType="OpenImport" clicked={props.onImportInit}>Import from the Web</Button>)
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
            {recipeAction}
            </form>
        </div>
    )
}
export default reduxForm({
    form: 'recipeForm',
    validate,
    enableReinitialize: true
})(recipeForm);
