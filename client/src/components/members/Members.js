import React, { Fragment } from 'react';

import classes from './Members.module.css';

const getFormatTime = (timeString) => {
    // parse string to date
    const date = new Date(timeString);

    let hours = date.getHours();
    let minutes = date.getMinutes();

    // am or pm
    const am_pm = hours >= 12 ? 'pm' : 'am';
    hours = hours > 12 ? hours - 12 : hours;
    // 2 digit number to minutes
    minutes = minutes < 10 ? "0"+minutes : minutes;
    
    return `${hours}:${minutes} ${am_pm}`;
};

const members = (props) => {  
    return <div className={classes.Members}>{props.members ? props.members.map((member) => {
        const allClasses = [classes.Item];

        // is online
        member.online && allClasses.push(classes.Online);

        // is active
        member._id === props.selectedIdMember && allClasses.push(classes.Active);

        return (
        <div
        key={member._id}
        className={allClasses.join(" ")}
        onClick={()=>{
            props.updateSelectedMember(member._id);
        }}
        >
            <div className={classes.Image} style={{ backgroundImage: `url(${member.image})` }}>
                {typeof props.unread !== "undefined" && props.unread > 0 && <div className={classes.Unread}>{props.unread}</div> }
            </div>
            <div className={classes.Details}>
                <div className={classes.TopDetails}>
                    <h3 className={classes.Name}>{member.name}</h3>
                    <p className={classes.Time}>{getFormatTime(member.date)}</p>
                </div>
                <p className={classes.ShortConversion}>{member.shortText}</p>
            </div>
        </div>)

    }) : null}</div>;
};

export default members;