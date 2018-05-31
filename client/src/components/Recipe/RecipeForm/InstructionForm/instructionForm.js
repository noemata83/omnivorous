import React from 'react';

import Button from '../../../UI/Button/Button';
import Field from 'redux-form/lib/Field';
import classes from './instructionForm.css';
import { renderTextField } from '../../../UI/Forms/renderFields';

const instructionForm = ({fields, meta: { error }}) => {
    if (!fields.length) fields.push();
    const removeButton = fields.length > 1 ? <Button type="Button" buttonType="Minus" key="Minus" clicked={() => fields.pop()}>-</Button> : null;
    let buttons = [
        <Button type="Button" key="Plus" buttonType="Plus" clicked={() => fields.push()}>+</Button>,
        removeButton
    ]
    return (
        <div>
            <h3 className={classes.Header}>Instructions</h3>
            <div className={classes.InstructionBox}>
                <ol className={classes.InstructionList}>
                    {fields.map( (recipeInstruction, index) => (
                            <li key={`Instruction#$${index}`}>
                                <Field
                                    name={`recipeInstructions[${index}]`}
                                    component={renderTextField}
                                    label={`${index+1}.`}
                                    hintText={null}
                                    multiline
                                    fullWidth
                                    rows={2}
                                    rowsMax={4}
                                />
                            </li>       
                    ))}
                </ol>
            </div>
            <div className={classes.Buttons}>
                {buttons}
            </div>
        </div>
    );
}

export default instructionForm;