import React from 'react';

const recipeItem = (props) => {
    return (
        <li onClick={props.clicked}>{props.title}</li>
        )
}

export default recipeItem;