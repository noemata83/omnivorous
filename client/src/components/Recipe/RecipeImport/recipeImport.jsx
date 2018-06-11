import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../UI/Button/Button';
import classes from './recipeImport.css';

const recipeImport = props =>
  (
    <div>
      <h2 className={classes.Header}>Import a Recipe from the Web</h2>
      <form onSubmit={props.import}>
        <input
          className={classes.Input}
          type="url"
          placeholder="Enter a URL"
          name="target-url"
          value={props.url}
          onChange={props.changed}
        />
        <Button buttonType="Success">Import</Button>
        <Button type="button" buttonType="Danger" clicked={props.cancel}>
          Cancel
        </Button>
      </form>
    </div>
  );

recipeImport.propTypes = {
  import: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  changed: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
};

export default recipeImport;
