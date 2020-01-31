import React, { Fragment } from 'react';

import classes from './Conversions.module.css';

const conversions = (props) => {    
    return <div className={classes.Conversions}>{props.users ? props.users.map((user) => {
        const allClasses = [classes.Item];

        // is online
        user.online && allClasses.push(classes.Online);

        // is active
        user.id === props.selectedIdUser && allClasses.push(classes.Active);

        return (
        <div
        key={user.id}
        className={allClasses.join(" ")}
        onClick={()=>{
            props.updateSelectedUser(user.id);
        }}
        >
            <div className={classes.Image} style={{ backgroundImage: `url(${user.image})` }}></div>
            <div className={classes.Details}>
                <div className={classes.TopDetails}>
                    <h3 className={classes.Name}>{user.name}</h3>
                    <p className={classes.Time}>{user.time}</p>
                </div>
                <p className={classes.ShortConversions}>{user.shortText}</p>
            </div>
        </div>)

    }) : null}</div>;
};

export default conversions;