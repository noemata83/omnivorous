import ingredientForm from './ingredientForm';
import directionForm from './directionForm';

const recipeForm = {
    title: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Recipe Name',
            label: 'Recipe Name'
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
            placeholder: 'Description',
            label: 'Description'
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
            label: 'Time to Prepare'
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
            placeholder: 'Image URL',
            label: 'Image URL'
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