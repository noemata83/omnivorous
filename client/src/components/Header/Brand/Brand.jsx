import React from 'react';

import classes from './Brand.css';

const brand = () =>
  (
    <div className={['brand-logo text-accent-3 left', classes.Brand].join(' ')}>
      Omnivorous
    </div>
  );

export default brand;
