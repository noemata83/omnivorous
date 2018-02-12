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
        },
        valid: false,
        touched: false
    },
    unit: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'unit'
        },
        value: 'tsp',
        validation: {},
        valid: true,
        touched: false
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

export default ingredientForm;