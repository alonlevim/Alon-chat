import React from 'react';

import classes from './WelcomeView.module.css';

const welcomeView = (props) => {
    const welcomeViewClasses = [classes.WelcomeView];
    props.registrationMode && welcomeViewClasses.push(classes.RegistrationMode)
    return <div className={welcomeViewClasses.join(" ")}>
        <h1 className={classes.Title}>Welcome To <span>Alon</span> Chat</h1>
        <img className={classes.Robot} src="http://photos.work-alon.com/robot.png" />
    </div>
};

export default welcomeView;