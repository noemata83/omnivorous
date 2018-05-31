import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';

import { recipeHeader, recipeFooter } from './formPrototypes/recipeForm';
import ingredientForm from './IngredientForm/ingredientForm';
import instructionForm from './InstructionForm/instructionForm';
import validate from './helpers/validator';
import classes from './RecipeForm.css';
import Button from '@material-ui/core/Button';
// import RaisedButton from 'material-ui/RaisedButton';
import { renderTextField } from '../../UI/Forms/renderFields';

// import * as helpers from './helpers/';

const recipeForm = (props) => {
    const { handleSubmit, onDelete, initialValues } = props;
    let recipeAction = (<div><Button variant="flat" color="primary" onClick={handleSubmit} >Add Recipe</Button></div>);
    let importButton = null;
    if (initialValues) {
        recipeAction = (<div>
                        <Button variant="flat" color="primary" onClick={handleSubmit}>Edit Recipe</Button>
                        <Button variant="flat" onClick={() => { onDelete(initialValues._id)}} style={{color: 'red'}}>Delete Recipe</Button>
                        </div>);
    } else {
        importButton = (<Button variant="raised" onClick={props.onImportInit} color="secondary" style={{float: 'right', fontSize: '1.5rem', }}>Import Recipe from the Web</Button>)
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
