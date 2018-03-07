import React from 'react';

import Button from '../../UI/Button/Button';
import classes from './recipeImport.css';

const recipeImport = (props) => {
    return (
        <div>
            <h2 className={classes.Header}>Import a Recipe from the Web</h2>
            <form onSubmit={props.import}>
                <input type="url" placeholder="Enter a URL" name="target-url" value={props.url} onChange={props.changed}/>
                <Button buttonType="Success">Import</Button>
            </form>
        </div>
    );
}

export default recipeImport;