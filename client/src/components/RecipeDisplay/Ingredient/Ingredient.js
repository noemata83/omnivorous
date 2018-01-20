import React from 'react';

const ingredient = (props) => {
    return (
        <li>{props.amount} {props.unit} {props.name}</li>
    );
}

export default ingredient;