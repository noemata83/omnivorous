import React from 'react';

import classes from './Brand.css';

const brand = (props) => {
    return (
        <div className={["brand-logo text-accent-3 left", classes.Brand].join(' ')}>
            Omnivorous
        </div>
    )
}

export default brand;
