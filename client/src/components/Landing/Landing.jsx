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
    </Wrapper>
  );

const mapStateToProps = state => ({
  currentUser: state.auth.userId,
});

export default connect(mapStateToProps)(landing);
