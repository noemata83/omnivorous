import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateObject, checkValidity } from '../../shared/utility';

import classes from './RecipeForm.css';
import Input from '../../components/UI/Input/Input';
import IngredientInput from '../../components/UI/Input/IngredientInput/IngredientInput';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/';

import ingredientForm from './formPrototypes/ingredientForm';
import directionForm from './formPrototypes/directionForm';
import recipeForm from './formPrototypes/recipeForm';

import updateForm from './helpers/updateForm';
import validateForm from './helpers/validator';

class RecipeForm extends Component {
    state = {
        recipeForm: JSON.parse(JSON.stringify(recipeForm)), // I really, really want to deep clone this, so that the prototype always remains available
        formIsValid: false,
    };      
    
    componentWillMount() {
        // When initializing,  update the form to reflect any data loaded in.
	if (this.props.currentRecipe) {
	        const updatedRecipeForm = updateForm(this.state.recipeForm, this.props.currentRecipe);
        	this.setState({ recipeForm: updatedRecipeForm});
	}
    }

    componentWillReceiveProps(nextProps) {
        // Update the form if the user clicks to edit a different recipe.
        
	if (nextProps.currentRecipe) {    
		const updatedRecipeForm = updateForm(this.state.recipeForm, nextProps.currentRecipe);
        	this.setState({ recipeForm: updatedRecipeForm});
	}
    }

    inputChangedHandler = (event, inputIdentifier) => {

        // First, create a copy of the form element (e.g., the input) with the value updated and check its validity.
        const updatedFormElement = updateObject(this.state.recipeForm[inputIdentifier], { 
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.recipeForm[inputIdentifier].validation),
            touched: true,
        });
        
        // Second, create a copy of the form data from the state, with the updated form element in it.
        const updatedRecipeForm = updateObject(this.state.recipeForm, {
            [inputIdentifier]: updatedFormElement
        });

        // Cycle through each input in the entire form, checking for its overall validity.
        const formIsValid = validateForm(true, updatedRecipeForm);

        // Update the state with the updated Recipe form and the status of its validity.
        this.setState({ recipeForm: updatedRecipeForm, formIsValid: formIsValid });
    }

    ingredientChangedHandler = (event, index, inputIdentifier) => {
        // First, create a copy of the array of ingredient form elements.
        const updatedIngredients = [...this.state.recipeForm.ingredients];
        
        // Update the relevant input from the correct index of the array with the inputted value; check its validity.
        const updatedIngredientElement = updateObject(this.state.recipeForm.ingredients[index][inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.recipeForm.ingredients[index][inputIdentifier].validation),
            touched: true
        });

        // Copy the ingredients array at the given index, replace the element configuration at that index with the updated value.
        const updatedIngredient = updateObject(this.state.recipeForm.ingredients[index], {
            [inputIdentifier]: updatedIngredientElement
        });
        // Update the array at the given index
        updatedIngredients[index] = updatedIngredient;

        const updatedRecipeForm = updateObject(this.state.recipeForm, {
            ingredients: updatedIngredients
        });
        const formIsValid = validateForm(true, updatedRecipeForm);
        this.setState({ recipeForm: updatedRecipeForm, formIsValid: formIsValid });
    }

    directionChangedHandler = (event, index) => {
        const updatedDirection = updateObject(this.state.recipeForm.directions[index].element, {
            value: event.target.value,
        });
        const updatedDirections = [...this.state.recipeForm.directions];
        updatedDirections[index].element = updatedDirection;
        const updatedRecipeForm = updateObject(this.state.recipeForm, {
            directions: updatedDirections
        })
        this.setState({ recipeForm: updatedRecipeForm });
    }

    addIngredientHandler = () => {
        this.setState({ 
            recipeForm: {
                        ...this.state.recipeForm,
                        ingredients: this.state.recipeForm.ingredients.concat({ ...ingredientForm })
        }})
    }

    addDirectionHandler = () => {
        this.setState({
            recipeForm: {
                ...this.state.recipeForm,
                directions: this.state.recipeForm.directions.concat({ ...directionForm })
            }
        })
    }

    recipeHandler = (event) => {
        event.preventDefault();
        const recipe = {};
        for (let formElementIdentifier in this.state.recipeForm) {
            if (formElementIdentifier === "ingredients") {
                recipe.ingredients = this.state.recipeForm.ingredients.map(ingredient => { return {
                    amount: ingredient.amount.value,
                    unit: ingredient.unit.value,
                    ingredient: ingredient.ingredient.value,
                    comment: ingredient.comment.value
                }});
            } else if (formElementIdentifier === 'directions') {
                recipe.directions = this.state.recipeForm.directions.map(direction => direction.element.value);  
            } else {
                recipe[formElementIdentifier] = this.state.recipeForm[formElementIdentifier].value;
            }
        }
        if (this.props.currentRecipe) {
            this.props.onEditRecipe(this.props.user,this.props.currentRecipe._id, recipe);
            this.props.setEditMode(false);
        } else {
            this.props.onAddRecipe(this.props.user, recipe);
            this.props.setEditMode(false);
        }

    }


    render() {
        let recipeAction = 'ADD RECIPE';
        if (this.props.currentRecipe) {
            recipeAction = 'EDIT RECIPE';
        }
        const formElementsArray = [];
        const ingredientsArray = [];
        const directionsArray = [];
        for (let key in this.state.recipeForm) {
            if (key === 'ingredients' || key === 'directions') {
                break;
            } else {
                formElementsArray.push({
                    id: key,
                    config: this.state.recipeForm[key]
                })
            }
        }
        this.state.recipeForm.ingredients.forEach((ingredient, index) => {
            ingredientsArray.push({
                ...this.state.recipeForm.ingredients[index]
            });
        });
        this.state.recipeForm.directions.forEach((directionItem, index) => {
            console.log(this.state.recipeForm.directions[index]);
            directionsArray.push({
                id: `directions[${index}]`,
                config: {...this.state.recipeForm.directions[index].element}
            });
        })
        let form =(<form onSubmit={this.recipeHandler}>
            {formElementsArray.map(formElement => {
                return (
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig} 
                value={formElement.config.value}
                valueType={formElement.config.valueType}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} /> );})}
            {ingredientsArray.map((ingredient, index) => {
                return (
                    <IngredientInput
                        key={`ingredients[${index}]`}
                        amountValue={ingredient.amount.value}
                        unitValue={ingredient.unit.value}
                        ingValue={ingredient.ingredient.value}
                        commentValue={ingredient.comment.value}
                        index={index}
                        changed={this.ingredientChangedHandler} />
                );
            })}
            <Button type="Button" buttonType="Plus" clicked={this.addIngredientHandler}>+</Button>
            <ol>
                {directionsArray.map((direction, index) => {
                    return (
                        <li key={index}>
                            <Input
                            elementType={direction.config.elementType}
                            value={direction.config.value}
                            valueType={direction.config.valueType}
                            invalid={!direction.config.valid}
                            shouldValidate={direction.config.validation}
                            touched={direction.config.touched}
                            changed={(event) => this.directionChangedHandler(event, index)} />
                        </li>
                    );
                })}
            </ol>
            <Button type="button" buttonType="Success" clicked={this.addDirectionHandler}>+</Button>
            <Button buttonType="Success" disabled={!this.state.formIsValid}>{recipeAction}</Button>
        </form>);
        return (
            <div className={classes.RecipeForm}>
                <h2 className={classes.FormHeader}>Enter a new recipe</h2>
                {form}
                </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentRecipe: state.recipe.currentRecipe,
        user: state.auth.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddRecipe: (user, recipe) => dispatch(actions.addRecipe(user, recipe)),
        onEditRecipe: (user, id, recipe) => dispatch(actions.updateRecipe(user, id, recipe))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeForm);
