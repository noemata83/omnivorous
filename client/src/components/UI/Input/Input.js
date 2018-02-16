import React from 'react';

import classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    let inputClasses = [];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }
    console.log(props.elementType);

    switch (props.elementType) {
        case('input'):
            inputElement = <input className={[classes.InputElement, inputClasses].join(' ')}
                                {...props.elementConfig}
                                onChange={props.changed}
                                value={props.value} />
            break;
        case('textarea'):
            inputElement = <textarea className={[classes.TextInput, ...inputClasses].join(' ')}
                                {...props.elementConfig}
                                onChange={props.changed}
                                value={props.value}>{props.value}</textarea>
            break;
        case('select'):
            inputElement = <select className={inputClasses.join(' ')}
                                onChange={props.changed}
                                value={props.value}>
                                {props.elementConfig.options.map(option => (<option key={option.value} value={option.value}>{option.value}</option>))}
                                </select>;
            break;
        default:
            inputElement =  <input className={inputClasses.join(' ')} 
                                {...props.elementConfig} 
                                onChange={props.changed}
                                value={props.value}/>
    }
    
    let validationError = null;
    if (props.invalid && props.touched) {
        validationError = <p className={classes.validationError}>{`Please enter a valid ${props.valueType}.`}</p>
    }

    console.log(props.elementConfig);
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.elementConfig ? props.elementConfig.label : null}</label>
            {inputElement}
            {validationError}
        </div>
    );
}

export default input;