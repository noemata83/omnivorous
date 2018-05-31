import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import classes from './SideHeader.css';
import Background from '../../assets/img/cuttingboardsmall.jpg';

export default (props) => {
    return (
        <div className={classes.SideHeader}>
            <img src={Background} alt="" style={{width: '100%' }}/>
            <div className={classes.AvatarBox}>
                <Avatar classes={{root: classes.Avatar}}>
                    <AccountCircleIcon viewBox="2 2 20 20" style={{preserveAspectRatio: "xMidYMid meet", height: '60px', width: '60px', margin: '3px'}} />
                </Avatar>
            </div>
        </div>
    )
}