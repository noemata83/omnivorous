import React from 'react';
import { connect } from 'react-redux';

import classes from './Landing.css';
import Wrapper from '../../hoc/Wrapper/Wrapper';
import signin from '../../assets/img/btn_google_signin_dark_normal_web.png';

import Background from '../UI/Background/Background';

const landing = props =>
  (
    <Wrapper>
      <Background />
      <div className={['card', classes.TextBox].join(' ')}>
        <h1 className={classes.HeaderText}>
          Welcome to{' '}
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
          <strong>Current Status:</strong>{' '}
          <em>
            Full CRUD and automated recipe import; shopping list CRUD; limited
            shopping list functionality implemented. <br />Check back often for
            updates!
          </em>
        </p>
      </div>
    </Wrapper>
  );

const mapStateToProps = state => ({
  currentUser: state.auth.userId,
});

export default connect(mapStateToProps)(landing);