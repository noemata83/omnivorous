import React from 'react';

import classes from './Input.css';

const input = ({ input, type, style, label, meta: { error, touched} }) => { // 
    return (
        <div className={classes[style]}>
            <label className={classes.Label}>{label}</label>
    {type === 'textarea' ? (<textarea className={classes.TextBox} {...input} ></textarea>) : (<input className={classes.InputElement} type={type} {...input}/>)}
            <div style={{'marginBottom': '20px', 'color': 'red'}}>
            {touched && error}
            </div>
        </div>
    ) // the {...input} grabs all of the properties passed by the Field component
}

export default input;