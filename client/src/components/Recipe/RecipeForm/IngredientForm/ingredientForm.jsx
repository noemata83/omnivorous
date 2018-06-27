import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, change } from 'redux-form';
import { connect } from 'react-redux';
import axios from 'axios';

import Button from '../../../UI/Button/Button';
import classes from './ingredientForm.css';
import { renderTextField } from '../../../UI/Forms/renderFields';
import { TextField, IconButton, FormControl } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const qtyStyle = {
  display: 'inline-block',
  flexShrink: 1,
  marginRight: '3rem',
};

const detailStyle = {
  display: 'inline-block',
  // width: '30%',
  flexShrink: 1,
  marginRight: '3rem',
};

class IngredientForm extends Component {
  state = {
    ingredientInput: '',
  }

  onIngredientInput = event => this.setState({ ingredientInput: event.target.value });

  handleIngredientSubmit = (event) => {
    if (event.shiftKey && event.key === "Enter") {
      axios.post(
        'http://phrase-tagger-service.k2rqsnqehd.us-east-1.elasticbeanstalk.com/parse',
        {
          ingredients: [...this.state.ingredientInput.split('\n')],
        },
      )
        .then((response) => {
          const recipeIngredient = response.data.ingredients.map(ingredient =>
            ({ ...ingredient, amount: ingredient.qty }));
          this.props.fields.length ? 
            this.props.onChangeFieldValue('recipeIngredient', [...this.props.fields.getAll(), ...recipeIngredient])
            : this.props.onChangeFieldValue('recipeIngredient', [...recipeIngredient]);
          this.setState({ ingredientInput: '' });
        });
    }
  }

  render() {
    const { fields, meta: { error, submitFailed }} = this.props;
    console.log(this.props.fields);
    // if (!fields.length) fields.push();
    const removeButton =
      fields.length > 1 ? (
        <Button type="Button" buttonType="Minus" clicked={() => fields.pop()}>
          -
        </Button>
      ) : null;
    return (
      <div>
        <h3 className={classes.Header}>Ingredients</h3>
        {fields.map((recipeIngredient, index) => (
          <div className={classes.IngredientForm} key={index}>
            <Field
              name={`${recipeIngredient}.amount`}
              key={`${recipeIngredient}.amount`}
              label="Amount"
              component={renderTextField}
              type="text"
              style={qtyStyle}
              inputProps={{size: 4}}
            />
            <Field
              name={`${recipeIngredient}.unit`}
              key={`${recipeIngredient}.unit`}
              component={renderTextField}
              label="Unit"
              type="text"
              style={qtyStyle}
              inputProps={{size: 10}}
            />
            <Field
              name={`${recipeIngredient}.name`}
              key={`${recipeIngredient}.name`}
              component={renderTextField}
              label="Ingredient"
              type="text"
              style={detailStyle}
              inputProps={{size: 30}}
            />
            <Field
              name={`${recipeIngredient}.comment`}
              key={`${recipeIngredient}.comment`}
              component={renderTextField}
              label="Comment"
              type="text"
              style={detailStyle}
              inputProps={{size: 30}}
            />
            <FormControl style={{marginTop:'2rem'}}>
              <IconButton onClick={() => fields.remove(index)}>
                <DeleteIcon />
              </IconButton>
            </FormControl>
          </div>
        ))}
        <FormControl style={{padding:'1.5rem'}}>
          <TextField
            helperText="Enter ingredients, one per line. When you are finished, hit shift+enter to parse the ingredients and add them to the recipe"
            multiline
            rows={4}
            fullWidth
            value={this.state.ingredientInput}
            name="ingredientInput"
            onChange={this.onIngredientInput}
            onKeyPress={this.handleIngredientSubmit}
          />
        </FormControl>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onChangeFieldValue: (field, value) =>
    dispatch(change('recipeForm', field, value)),
})

IngredientForm.defaultProps = {
  meta: { error: null, submitFailed: false },
};

IngredientForm.propTypes = {
  fields: PropTypes.object.isRequired,
  meta: PropTypes.object,
  onChangeFieldValue: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(IngredientForm);
