import React from 'react';

import Input from '../../../UI/Input/Input';
import Button from '../../../UI/Button/Button';

const directionForm = (props) => {
    let directionsArray = props.directions.map((direction, index) => ({
        id: `directions[${index}]`,
        config: {...direction.element}
    }));
    const directionsForm = directionsArray.map((direction, index) => {
        return (
        <li key={index}>
            <Input
            elementType={direction.config.elementType}
            elementConfig={direction.config.elementConfig}
            value={direction.config.value}
            valueType={direction.config.valueType}
            invalid={!direction.config.valid}
            shouldValidate={direction.config.validation}
            touched={direction.config.touched}
            changed={(event) => props.directionChanged(event, index)} />
        </li>
    )});
    console.log(directionsForm);
    const removeButton = props.directions.length > 1 ? <Button type="Button" buttonType="Minus" clicked={props.removeDirection}>-</Button> : null;
    return (
        <div>
        <h2>Directions:</h2>
        <ol>
            {directionsForm}
        </ol>
        <Button type="Button" buttonType="Plus" clicked={props.addDirection}>+</Button>
        {removeButton}
        </div>
    )
}

export default directionForm;