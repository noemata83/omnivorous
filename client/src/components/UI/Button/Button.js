import React from 'react';
import classes from './Button.css';

const button = (props) => (
    <button 
    type={props.type || 'submit'}
    disabled={props.disabled}
    className={[classes.Button, classes[props.buttonType]].join(' ')}
    onClick={props.clicked}>{props.children}</button>
);

export default button;