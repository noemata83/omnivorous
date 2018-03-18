import React from 'react';

import ListItem from '../ListItem/ListItem.js';

const listCategory = (props) => {
    const items = props.items.map(item => <ListItem name={item.name} quantity={item.quantity} unit={item.unit}/>)
    return (
        <li> {props.name}
            <ul>
                {items}
            </ul>
        </li>
    )
}

export default listCategory;