import React from 'react';

import classes from './MessageView.module.css';


const messageView = (props) => {
    
    const allClasses = [classes.MessageView];
    props.me && allClasses.push(classes.Me);

    return <div className={allClasses.join(" ")}>
        <div className={classes.BorderView}>
            <p className={classes.Text}>{props.message}</p>
        </div>
    </div>
};

export default messageView;