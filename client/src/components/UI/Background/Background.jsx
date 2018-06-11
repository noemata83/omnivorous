import React from 'react';

import classes from './Background.css';

export default props => (
  <div className={classes.Background}>
    {props.children}
  </div>
);
