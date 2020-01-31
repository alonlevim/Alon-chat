import React from 'react';
import WelcomeView from '../welcomeView/WelcomeView';
import Header from './header/Header';
import Chat from './chat/Chat';

import classes from './ViewConversion.module.css';

const viewConversion = (props) => {
    return <div className={classes.ViewConversion}>
        {false && <WelcomeView />}
        <Header />
        <Chat />
        <img className={classes.Exit} src={"http://photos.work-alon.com/exit.svg"} />
    </div>
};

export default viewConversion;