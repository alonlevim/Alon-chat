import React from 'react';

import classes from './Controller.module.css';

const controller = (props) => {
    return <div className={classes.Controller}>
      <textarea placeholder="Type a message"></textarea>
      <button>Send</button>
    </div>
};

export default controller;