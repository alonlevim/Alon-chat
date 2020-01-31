import React from 'react';

import MessageView from './messageView/MessageView';
import classes from './View.module.css';

const view = (props) => {
    return <div className={classes.View}>
      <MessageView message="Hi, My name is Alon!" />
      <MessageView message="Hi" me={true}/>
    </div>
};

export default view;