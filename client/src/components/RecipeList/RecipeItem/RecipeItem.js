import React from 'react';

import Wrapper from '../../../hoc/Wrapper/Wrapper';
import classes from './RecipeItem.css';
import Button from '../../UI/Button/Button';
import { fa, fa_edit } from '../../../icons';

const recipeItem = (props) => {
    return (
        <Wrapper>
            <li className={classes.RecipeItem}>
                <span onClick={props.clicked}>{props.title}</span>
                <Button 
                    buttonType="Inline" 
                    clicked={props.edit}>
                    <i className={[fa, fa_edit].join(' ')}></i>
                </Button>
            </li>
        </Wrapper>
        );
}

export default recipeItem;