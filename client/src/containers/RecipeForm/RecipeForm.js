import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';

import { recipeHeader, recipeFooter } from './formPrototypes/recipeForm';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import validate from './helpers/validator';
import ingredientForm from '../../components/Recipe/RecipeForm/IngredientForm/ingredientForm';
import directionForm from '../../components/Recipe/RecipeForm/DirectionForm/directionForm';

// import * as helpers from './helpers/';

const recipeForm = (props) => {
    const { handleSubmit, onDelete, initialValues } = props;
    let recipeAction = <Button buttonType="Success">Add Recipe</Button>;
    if (initialValues) {
        recipeAction = (<div>
                        <Button buttonType="Success">Edit Recipe</Button>
                        <Button buttonType="Danger" clicked={() => { onDelete(initialValues._id)}}>Delete Recipe</Button>
                        </div>);
    }
    return (
        <form onSubmit={ handleSubmit }>
        { recipeHeader.map( ({ label, name, type, style }) => (<Field component={Input} name={name} key={name} type={type} label={label} style={style} />)) }
        <FieldArray name="recipeIngredient" component={ingredientForm} />
        <FieldArray name="recipeInstructions" component={directionForm} />
        { recipeFooter.map( ({ label, name, type, style }) => (<Field component={Input} name={name} key={name} type={type} label={label} style={style} />)) }
        {recipeAction}
        </form>
    )
}
export default reduxForm({
    form: 'recipeForm',
    validate,
    enableReinitialize: true
})(recipeForm);
