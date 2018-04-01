import React from 'react';

import ListItem from '../ListItem/ListItem.js';
import classes from './ListCategory.css';

const listCategory = (props) => {
    const items = props.items.map(item => <ListItem key={item.name} name={item.name} quantity={item.quantity} unit={item.unit}/>)
    return props.items.length !== 0 ?
        (<li className={classes.Category}> {props.name}
            <ul className={classes.CategoryItems}>
                {items}
            </ul>
        </li>) : null;
}

export default listCategory;