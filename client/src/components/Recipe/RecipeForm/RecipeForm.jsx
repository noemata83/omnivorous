import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
} from '@material-ui/core';

import { recipeHeader, recipeFooter } from './formPrototypes/recipeForm';
import ingredientForm from './IngredientForm/ingredientForm';
import instructionForm from './InstructionForm/instructionForm';
import validate from './helpers/validator';
import classes from './RecipeForm.css';
// import RaisedButton from 'material-ui/RaisedButton';
import { renderTextField } from '../../UI/Forms/renderFields';

// import * as helpers from './helpers/';

const recipeForm = (props) => {
  const { handleSubmit, onDelete, initialValues } = props;
  let recipeAction = (
    <div>
      <Button variant="flat" color="primary" onClick={handleSubmit}>
        Add Recipe
      </Button>
    </div>
  );
  let importButton = null;
  if (initialValues) {
    recipeAction = (
      <div>
        <Button variant="flat" color="primary" onClick={handleSubmit}>
          Edit Recipe
        </Button>
        <Button
          variant="flat"
          onClick={() => {
            onDelete(initialValues._id);
          }}
          style={{ color: 'red' }}
        >
          Delete Recipe
        </Button>
      </div>
    );
  } else {
    importButton = (
      <Button
        variant="raised"
        onClick={props.onImportInit}
        color="secondary"
        style={{ float: 'right', fontSize: '1.5rem' }}
      >
        Import Recipe from the Web
      </Button>
    );
  }
  return (
    <div className={classes.RecipeForm}>
      <h2 className={classes.Header}>Add a Recipe</h2>
      {importButton}
      <form onSubmit={handleSubmit}>
        <Field
          component={renderTextField}
          label="Name"
          name="name"
          type="text"
          fullWidth
        />
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.PanelTitle}>
              Basic Recipe Details
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails classes={{ root: classes.PanelContent }}>
            {recipeHeader.map(({ label, name, style, ...custom }) => (
              <Field
                component={renderTextField}
                name={name}
                key={name}
                label={label}
                style={style}
                {...custom}
              />
            ))};
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <FieldArray name="recipeIngredient" component={ingredientForm} />
        <FieldArray name="recipeInstructions" component={instructionForm} />
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.PanelTitle}>
              Additional recipe details
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails classes={{ root: classes.PanelContent }}>
            {recipeFooter.map(({ label, name, type, style, ...custom }) => (
              <Field
                component={renderTextField}
                name={name}
                key={name}
                type={type}
                label={label}
                style={style}
                {...custom}
              />
            ))}
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <div className={classes.FormFooter}>{recipeAction}</div>
      </form>
    </div>
  );
};
export default reduxForm({
  form: 'recipeForm',
  validate,
  enableReinitialize: true,
})(recipeForm);
