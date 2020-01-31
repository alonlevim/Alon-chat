import React from 'react';

import classes from './Header.module.css';


const header = (props) => {
    return <div className={classes.Header}>
        <div className={classes.Title}>Alon Levi</div>
        <div className={classes.Online}>Online</div>
    </div>
};

export default header;