import React from 'react';

const listItem = (props) => {
    const qty = props.unit ? `(${props.quantity} ${props.unit})` : null;
    return (
        <li><input type="checkbox" />{props.name} {qty}</li>
    )
}

export default listItem;