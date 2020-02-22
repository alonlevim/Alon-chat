import React from 'react';

import classes from './Header.module.css';
import BackMobileButtonSVG from '../../../assets/mobile_back_button.svg';

const header = (props) => {
    const member = props.getMemberSelected();
    const isOnline = member && typeof member.online !== "undefined" ? member.online ? true : false : false;
    const classesOnline = [classes.Online];
    isOnline && classesOnline.push(classes.Active);
    return <div className={classes.Header}>
        <img
        className={classes.BackMobileButton}
        src={BackMobileButtonSVG}
        alt="back"
        title="back button"
        onClick={props.disableSelectedMember}
        />
        <div className={classes.AvatarMember} style={{ backgroundImage: `url(${member.image})` }}></div>
        <div className={classes.Column}>
            <div className={classes.Title}>{member && member.name ? member.name : ""}</div>
            <div className={classesOnline.join(" ")}>{isOnline ? "Online" : "Offline"}</div>
        </div>
    </div>
};

export default header;