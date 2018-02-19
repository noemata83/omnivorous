const ingredientForm = {
    amount: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Amt',
            label: "Amount"
        },
        value: '',
        valueType: 'amount',
        validation: {},
        valid: true,
        touched: false
    },
    unit: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'unit',
            label: "Unit"
        },
        value: '',
        validation: {},
        valid: true,
        touched: false
    },
    ingredient: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Ingredient',
            label: 'Ingredient Name'
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
            placeholder: 'Comment',
            label: "Comments"
        },
        value: '',
        validation: {},
        valid: true,
        touched: false
    }
}

export default ingredientForm;