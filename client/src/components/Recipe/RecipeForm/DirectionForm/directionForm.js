import React from 'react';

import Input from '../../../UI/Input/Input';
import Button from '../../../UI/Button/Button';
import Field from 'redux-form/lib/Field';
import classes from './directionForm.css';

const directionForm = ({fields, meta: { error }}) => {
    if (!fields.length) fields.push();
    const removeButton = fields.length > 1 ? <Button type="Button" buttonType="Minus" clicked={() => fields.pop()}>-</Button> : null;
    return (
        <div>
            <h3 className={classes.Header}>Instructions</h3>
            <ol>
                {fields.map( (recipeInstruction, index) => (
                    <li key={index}>
                        <Field
                            name={`recipeInstructions[${index}]`}
                            component={Input}
                            type="textarea"
                        />
                    </li>
                ))}
            </ol>
            <Button type="Button" buttonType="Plus" clicked={() => fields.push()}>+</Button>
            {removeButton}
        </div>
    );
}

export default directionForm;