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
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return `${hours}:${minutes} ${am_pm}`;
};

const unread = (conversation) => {
    if( conversation.length > 0 )
    {
        const count = conversation.filter(message => !message.saw).length;

        return count;
    }
    
    return 0;
};

const members = ({ members, selectedIdMember, updateSelectedMember, loadingMembers }) => {

    return <div className={classes.Members}>
        {members.length ? members.map((member) => {
            const allClassesItem = [classes.Item];
            const unreadConversation = unread(member.conversation);

            // is online
            member.online && allClassesItem.push(classes.Online);

            // is active
            member._id === selectedIdMember && allClassesItem.push(classes.Active);

            return (
                <div
                    key={member._id}
                    className={allClassesItem.join(" ")}
                    onClick={() => {
                        updateSelectedMember(member._id);
                    }}
                >
                    <div className={classes.Image} style={{ backgroundImage: `url(${member.image})` }}>
                        { unreadConversation > 0 && <div className={classes.Unread}>{unreadConversation}</div> }
                    </div>
                    <div className={classes.Details}>
                        <div className={classes.TopDetails}>
                            <h3 className={classes.Name}>{member.name}</h3>
                            <p className={classes.Time}>{getFormatTime(member.date)}</p>
                        </div>
                        <p className={classes.ShortConversation}>{member.conversation.length > 0 ? member.conversation[member.conversation.length-1].content : "" }</p>
                    </div>
                </div>)

        }) :
            loadingMembers ? <div className={classes.Loading}>
                <div className={classes.DoubleBounce_1}></div>
                <div className={classes.DoubleBounce_2}></div>
            </div>
                :
                <div className={classes.ThereAreNoMembers}>There are currently no members in the list</div>}</div>;
};

export default members;