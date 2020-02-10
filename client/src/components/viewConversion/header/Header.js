import React from 'react';

import classes from './Header.module.css';


const header = (props) => {
    const member = props.getMemberSelected();
    const isOnline = member && typeof member.online !== "undefined" ? member.online ? true : false : false;
    const classesOnline = [classes.Online];
    isOnline && classesOnline.push(classes.Active);
    return <div className={classes.Header}>
        <div className={classes.Title}>{member && member.name ? member.name : ""}</div>
        <div className={classesOnline.join(" ")}>{isOnline ? "Online" : "Offline" }</div>
    </div>
};

export default header;