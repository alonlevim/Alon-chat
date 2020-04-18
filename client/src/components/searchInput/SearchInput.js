import React from 'react';

import classes from './SearchInput.module.css';

const searchInput = (props) => {
    return <div className={classes.SearchInput}>
        <input type="text" placeholder="Search in message" onChange={(e)=>{props.updateSearch(e.target.value)}}/>
        <p className={classes.Logout} onClick={props.logout}>Log Out</p>
    </div>
};

export default searchInput;