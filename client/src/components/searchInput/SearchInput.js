import React from 'react';

import classes from './SearchInput.module.css';

const searchInput = (props) => {
    return <div className={classes.SearchInput}>
        <input type="text" placeholder="Search in message" onChange={(e)=>{props.updateSearch(e.target.value)}}/>
        <img
        className={classes.Exit}
        src={"http://photos.work-alon.com/exit.svg"}
        alt="exit"
        title="exit button"
        />
    </div>
};

export default searchInput;