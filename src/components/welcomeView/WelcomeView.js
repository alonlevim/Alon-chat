import React from 'react';

import classes from './WelcomeView.module.css';

const welcomeView = (props) => {
    return <div className={classes.WelcomeView}>
        <h1 className={classes.Title}>Welcome To <span>Alon</span> Chat</h1>
        <img className={classes.Robot} src="http://photos.work-alon.com/robot.png" />
    </div>
};

export default welcomeView;