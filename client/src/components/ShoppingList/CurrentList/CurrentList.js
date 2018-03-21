import React from 'react';

import ListCategory from './ListCategory/ListCategory';

const currentList = (props) => {
    const categories = props.currentList.categories.map(category => <ListCategory items={
        props.currentList.items.filter(item => category === item.category)
    } key={category} name={category}/>);
    return (
        <div>
            <h2>{props.currentList.name}</h2>
            {categories}
        </div>
    )
}

export default currentList;