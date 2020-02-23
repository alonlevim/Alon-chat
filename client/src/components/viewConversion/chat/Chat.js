import React from 'react';
import View from './view/View'
import Controller from './controller/Controller';

import classes from './Chat.module.css';


const chat = (props) => {
    return <div className={classes.Chat}>
        <View
        conversion={props.conversion}
        myId={props.myId}
        getMemberSelected={props.getMemberSelected}
        />
        <Controller sendMessage={props.sendMessage} />
    </div>
};

export default chat;