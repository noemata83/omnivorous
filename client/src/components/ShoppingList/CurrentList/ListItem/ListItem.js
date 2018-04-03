import React from 'react';

const listItem = (props) => {
    const qty = props.unit ? `(${props.quantity} ${props.unit})` : null;
    return (
        <li><label><input type="checkbox" /><span>&nbsp;</span></label> <span onDoubleClick={() => props.setEditMode(props.itemId)}>{props.name} {qty}</span></li>
    )
}

export default listItem;