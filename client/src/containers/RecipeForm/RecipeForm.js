import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateObject, checkValidity } from '../../shared/utility';

import Input from '../../components/UI/Input/Input';
import IngredientInput from '../../components/UI/Input/IngredientInput/IngredientInput';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/';

const ingredientForm = {
    amount: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Amt'
        },
        value: '',
        valueType: 'amount',
        validation: {
            required: true,
            isNumber: true
        },
        valid: false,
        touched: false
    },
    unit: {
        elementType: 'select',
        elementConfig: {
            options: [{value: 'tsp'}, {value: 'Tbsp'}, {value: 'C'}],
        },
        value: 'tsp',
        validation: {},
        valid: true
    },
    ingredient: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Ingredient'
        },
        value: '',
        validation: {
            required: true,
        },
        valid: false,
        touched: false
    },
    comment: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Comment'
        },
        value: '',
        validation: {},
        valid: true,
        touched: false
    }
}

const directionForm = {
        elementType: 'textarea',
        elementConfig: {
            placeholder: 'Enter the next recipe direction.'
        },
        value: '',
        valueType: 'direction',
        validation: {},
        valid: true,
        touched: false
}

class NewRecipe extends Component {
    state = {
        recipeForm: {
            title: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Recipe Name'
                },
                value: '',
                valueType: 'title',
                validation: {
                    required: 'true'
                },
                valid: false,
                touched: false,
            },
            description: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Description'
                },
                value: '',
                valueType: 'description',
                validation: {},
                valid: true,
                touched: false,
            },
            prepTime: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                },
                value: '0',
                valueType: 'prep time',
                validation: {},
                valid: true,
                touched: false
            },
            imageURL: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Image URL'
                },
                value: '',
                valueType: 'prep time',
                validation: {},
                valid: true,
                touched: false
            },
            ingredients: [
                {
                    ...ingredientForm,
                }
            ],
            directions: [
                {
                    ...directionForm,
                }
            ],
        },
        formIsValid: false,
    }

    inputChangedHandler = (event, inputIdentifier) => {

        const updatedFormElement = updateObject(this.state.recipeForm[inputIdentifier], { 
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.recipeForm[inputIdentifier].validation),
            touched: true,
        });
        const updatedRecipeForm = updateObject(this.state.recipeForm, {
            [inputIdentifier]: updatedFormElement
        });
        
        let formIsValid = true;
        for (let inputIdentifier in updatedRecipeForm) {
            formIsValid = updatedRecipeForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ recipeForm: updatedRecipeForm, formIsValid: formIsValid });
    }

    ingredientChangedHandler = (event, index, inputIdentifier) => {
        const updatedIngredients = [...this.state.recipeForm.ingredients];
        const updatedIngredientElement = updateObject(this.state.recipeForm.ingredients[index][inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.recipeForm.ingredients[index][inputIdentifier]),
            touched: true
        });
        const updatedIngredient = updateObject(this.state.recipeForm.ingredients[index], {
            [inputIdentifier]: updatedIngredientElement
        });

        updatedIngredients[index] = updatedIngredient;
        console.log(updatedIngredients);

        const updatedRecipeForm = updateObject(this.state.recipeForm, {
            ingredients: updatedIngredients
        });
        let formIsValid = true;
        updatedRecipeForm.ingredients.forEach(ingredient => {
            for (let input in ingredient) {
                formIsValid = updatedRecipeForm.ingredients[index][input].valid && formIsValid;
            }
        });
        this.setState({ recipeForm: updatedRecipeForm, formIsValid: formIsValid });
    }

    directionChangedHandler = (event, index) => {
        const updatedDirection = updateObject(this.state.recipeForm.directions[index], {
            value: event.target.value,
        });
        const updatedDirections = [...this.state.recipeForm.directions];
        updatedDirections[index] = updatedDirection;
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
                recipe.directions = this.state.recipeForm.directions.map(direction => direction.value);  
            } else {
                recipe[formElementIdentifier] = this.state.recipeForm[formElementIdentifier].value;
            }
        }
        this.props.onAddRecipe(recipe);
    }


    render() {
        const formElementsArray = [];
        const ingredientsArray = [];
        const directionsArray = [];
        for (let key in this.state.recipeForm) {
            if (key === 'ingredients') {
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
        this.state.recipeForm.directions.forEach((direction, index) => {
            directionsArray.push({
                id: `directions[${index}]`,
                config: this.state.recipeForm.directions[index]
            })
        })
        let form =(<form onSubmit={this.recipeHandler}>
            {formElementsArray.map(formElement => {
                return (
            <Input 
                key={formElement.id}
                label={formElement.id}
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
                        index={index}
                        changed={this.ingredientChangedHandler} />
                );
            })}
            <Button type="Button" buttonType="Success" clicked={this.addIngredientHandler}>+</Button>
            {directionsArray.map((direction, index) => {
                return (
                    <Input
                        key={direction.id}
                        value={direction.config.value}
                        valueType={direction.config.valueType}
                        invalid={!direction.config.valid}
                        shouldValidate={direction.config.validation}
                        touched={direction.config.touched}
                        changed={(event) => this.directionChangedHandler(event, index)} />
                );
            })}
            <Button type="button" buttonType="Success" clicked={this.addDirectionHandler}>+</Button>
            <Button buttonType="Success" disabled={!this.state.formIsValid}>ADD RECIPE</Button>
        </form>);
        return (
            <div>
                <h4>Enter a new recipe</h4>
                {form}
                </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddRecipe: (recipe) => dispatch(actions.addRecipe(recipe))
    }
}

export default connect(null, mapDispatchToProps)(NewRecipe);