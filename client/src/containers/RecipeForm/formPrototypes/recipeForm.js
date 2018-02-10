import ingredientForm from './ingredientForm';
import directionForm from './directionForm';

const recipeForm = {
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
};

export default recipeForm;