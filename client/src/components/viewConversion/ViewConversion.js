import React from 'react';
import WelcomeView from '../welcomeView/WelcomeView';
import Header from './header/Header';
import Chat from './chat/Chat';
import Registration from '../registration/Registration';

import classes from './ViewConversion.module.css';


const viewConversion = (props) => {
    const registrationMode = props.myId === -1;
    return <div className={classes.ViewConversion}>
        {typeof props.conversion !== "undefined" && props.selectedIdMember !== -1 ?
            <React.Fragment>
                <Header getMemberSelected={props.getMemberSelected} />
                <Chat
                    conversion={props.conversion}
                    myId={props.myId}
                    sendMessage={props.sendMessage}
                />
            </React.Fragment>
            :
            <React.Fragment>
                <WelcomeView registrationMode={registrationMode} />
                {props.myId === -1 && <Registration registration={props.registration} />}
            </React.Fragment>
        }
        <img className={classes.Exit} src={"http://photos.work-alon.com/exit.svg"} />
    </div>
};

export default viewConversion;