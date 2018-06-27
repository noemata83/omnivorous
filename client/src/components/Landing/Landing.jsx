import React from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

import classes from './Landing.css';
import Wrapper from '../../hoc/Wrapper/Wrapper';
import signin from '../../assets/img/btn_google_signin_dark_normal_web.png';
import addRecipe from '../../assets/img/add-recipe.gif';
import addToShoppingList from '../../assets/img/add-to-shopping-list.gif';

import Background from '../UI/Background/Background';

const landing = props =>
  (
    <div className={classes.LandingPage}>
    <div className={classes.Header}>
      <Background />
      <div className={['card', classes.TextBox].join(' ')}>
        <h1 className={classes.HeaderText}>
          Welcome to
          <span className={classes.HeaderText__brand}>Omnivorous</span>
        </h1>
        <h2 className={classes.Tagline}>
          The recipe manager that <em>just works</em> (someday)
        </h2>
        <a className={classes.Link} href="/auth/google">
          <img src={signin} alt="Sign in with Google" />
        </a>
        <br />
        <p style={{ fontSize: '1.4rem', textAlign: 'left' }}>
          <strong>Current Status:</strong>
          <em>
            Migrated Presentational Components to Material UI v1.0; shopping list and (mobile) sidebar
            need fixes. Recipe Import now features CRF microservice-powered intelligent ingredient parsing.
            <br />Check back often for updates!
          </em><br />
          {/* <strong>Current Progress:</strong>{' '}
          <em>
            Finished Multicolored meringues recipe!!!
            <br />Check back often for new recipes!
          </em> */}
        </p>
      </div>
    </div>
    <div>
    <div style={{background:"-webkit-linear-gradient(top, #80DEEA, #FFF)"}}>
      <section className={classes.Description} style={{paddingTop: '20rem'}}>
          <Card className={classes.MarketingCard}>
            <div className={classes.Graphic}>
              <img
                src={addRecipe}
                alt="Importing Recipes is Easy!"
                style={{width: '100%'}}
                />
            </div>
            <div className={classes.Text}>
              <h2 className={classes.TextHeader}>Manage Your Recipes</h2>
              <p style={{fontSize:'2.4rem', fontWeight: 'bold'}}>Omnivorous helps you gather recipes and organize them, so your next meal is only a few clicks away.</p>
            </div>
          </Card>
      </section>
      <section className={classes.Description}>
          <Card className={classes.MarketingCard}>
            <div className={classes.Text}>
                <h2 className={classes.TextHeader}>Streamline Your Shopping</h2>
                <p style={{fontSize:'1.8rem'}}>Omnivorous lets you easily build and organize shopping lists. Add recipe ingredients to your shopping list with one click, and drag and drop
                  to organize them.</p>
            </div>
              <div className={classes.Graphic}>
                <img 
                  src={addToShoppingList}
                  alt="Add ingredients to the shopping list with a single click!"
                  style={{width: '100%'}}
                />
              </div>
          </Card>
      </section>
      <section className={classes.Description}>
        <Card className={classes.MarketingCard}>
          <div className={classes.Graphic}>
            Coming Soon!
          </div>
          <div className={classes.Text}>
            <h2 className={classes.TextHeader}>Plan Your Week</h2>
            <p style={{fontSize:'1.8rem'}}>Drag and drop recipes onto your weekly meal plan. Build a shopping list from your meal plan in seconds!</p>
          </div>
        </Card>
      </section>
    </div>
      <footer>
        An app by Tucker McKinney. Last updated: {new Date(Date.now()).toLocaleDateString()}
      </footer>
    </div>
  </div>
  );

const mapStateToProps = state => ({
  currentUser: state.auth.userId,
});

export default connect(mapStateToProps)(landing);
