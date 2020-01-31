import React from 'react';

import classes from './Alert.module.css';


const alert = (props) => {
    return <div className={classes.Alert}>
        <div className={classes.Content}>
            {props.message}
        </div>
    </div>
};

export default alert;