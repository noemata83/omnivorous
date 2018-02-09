import React from 'react';

import Wrapper from '../../../hoc/Wrapper/Wrapper';
import classes from './RecipeItem.css';
import Button from '../../UI/Button/Button';
import { fa, fa_edit } from '../../../icons';

const recipeItem = (props) => {
    return (
        <Wrapper>
            <li className={classes.RecipeItem} onClick={props.clicked}>
                {props.title} 
                <Button 
                    buttonType="Inline" 
                    clicked={() => { this.props.setEditMode(true); this.props.editRecipe(props.recipe); }}>
                    <i className={[fa, fa_edit].join(' ')}></i>
                </Button>
            </li>
        </Wrapper>
        );
}

export default recipeItem;