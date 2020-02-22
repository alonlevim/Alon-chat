import React from 'react';
import { Twemoji } from 'react-emoji-render';

import classes from './MessageView.module.css';


const messageView = (props) => {

    const allClasses = [classes.MessageView];
    props.me && allClasses.push(classes.Me);

    return props.message.trim() !== "" ?
        <div className={allClasses.join(" ")}>
            <div className={classes.BorderView}>
                <Twemoji className={classes.Text} text={props.message.trim()} />
            </div>
        </div>
        :
        null
};
//https://github.com/banyan/emoji-emoticon-to-unicode/blob/master/emoji-emoticon-to-unicode.js#L94

export default messageView;