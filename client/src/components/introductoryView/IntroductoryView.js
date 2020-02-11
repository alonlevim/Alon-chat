import React from 'react';

import classes from './IntroductoryView.module.css';

const introductoryView = (props) => {
    return <div className = {classes.IntroductoryView} >
        <h1 className={classes.Title}>Welcome To <span> Alon </span> Chat</h1>
        <img className={classes.Robot} src="http://photos.work-alon.com/robot.png" />
        </div>
};

export default introductoryView;