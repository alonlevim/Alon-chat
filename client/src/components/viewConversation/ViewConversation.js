import React from 'react';
import Header from './header/Header';
import Chat from './chat/Chat';

import classes from './ViewConversation.module.css';


const viewConversation = (props) => {
    return <div className={classes.ViewConversation}>
        {typeof props.conversation !== "undefined" && props.selectedIdMember !== -1 &&
            <React.Fragment>
                <Header
                getMemberSelected={props.getMemberSelected}
                disableSelectedMember={props.disableSelectedMember}
                />
                <Chat
                    conversation={props.conversation}
                    myId={props.myId}
                    sendMessage={props.sendMessage}
                    getMemberSelected={props.getMemberSelected}
                    readMessage={props.readMessage}
                    toScroll={props.toScroll}
                    conversationWithoutState={props.conversationWithoutState}
                />
            </React.Fragment>
        }
    </div>
};

export default viewConversation;