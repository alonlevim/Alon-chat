import React from 'react';

import classes from './SearchInput.module.css';

const searchInput = (props) => {
    return <div className={classes.SearchInput}>
        <input type="text" placeholder="Search in message"/>
    </div>
};

export default searchInput;