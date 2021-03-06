import React from 'react';
import { Twemoji } from 'react-emoji-render';

import classes from './MessageView.module.css';

const detectHebrewDirection = (string) => {
    var position = string.search(/[\u0590-\u05FF]/);

    return position >= 0;
}

const messageView = (props) => {
    const { member, me } = props;
    let { message } = props;

    message = message.trim();

    const allClasses = [classes.MessageView];
    me && allClasses.push(classes.Me);

    // Detect hebrew
    detectHebrewDirection(message) && allClasses.push(classes.Rtl);

    return message !== "" ?
        <div className={allClasses.join(" ")}>
            <div className={classes.Avatar} style={{ backgroundImage: `url(${member.image})` }}></div>
            <div className={classes.BorderView}>
                <Twemoji className={classes.Text} text={message} />
            </div>
        </div>
        :
        null
};
//https://github.com/banyan/emoji-emoticon-to-unicode/blob/master/emoji-emoticon-to-unicode.js#L94

export default messageView;