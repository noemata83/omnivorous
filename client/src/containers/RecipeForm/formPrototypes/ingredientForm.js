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

export default ingredientForm;