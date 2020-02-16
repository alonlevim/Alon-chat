import React from 'react';

import MessageView from './messageView/MessageView';
import classes from './View.module.css';

const view = (props) => {
  return <div className={classes.View}>
    {props.conversion.length ?
      props.conversion.map(mes => {
        const me = mes.from === props.myId;
        return <MessageView
          key={mes.date}
          message={mes.content}
          me={me}
        />
      })
      :
      null
    }
  </div>
};

export default view;