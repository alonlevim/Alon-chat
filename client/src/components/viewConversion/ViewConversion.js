import React from 'react';
import Header from './header/Header';
import Chat from './chat/Chat';

import classes from './ViewConversion.module.css';


const viewConversion = (props) => {
    const registrationMode = props.myId === -1;
    return <div className={classes.ViewConversion}>
        {typeof props.conversion !== "undefined" && props.selectedIdMember !== -1 &&
            <React.Fragment>
                <Header getMemberSelected={props.getMemberSelected} />
                <Chat
                    conversion={props.conversion}
                    myId={props.myId}
                    sendMessage={props.sendMessage}
                />
            </React.Fragment>
        }
        {!registrationMode && <img className={classes.Exit} src={"http://photos.work-alon.com/exit.svg"} />}
    </div>
};

export default viewConversion;