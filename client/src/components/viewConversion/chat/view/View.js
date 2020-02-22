import React from 'react';

import MessageView from './messageView/MessageView';
import classes from './View.module.css';

class View extends React.Component {
  constructor(props) {
    super(props);

    this.toScroll = true;
  }

  scrollToBottom = () => {
    if( !this.toScroll )
      return;
      
    const scrollHeight = this.messageList.scrollHeight;
    const height = this.messageList.clientHeight;
    const maxScrollTop = scrollHeight - height;
    this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    this.messageList.scrollIntoView({ block: 'end', behavior: "smooth" });
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  onScroll = (e) => {
    const element = e.target
    if (Math.floor(element.scrollHeight - element.scrollTop) <= element.clientHeight+40)
    {
      // Bottom scroll
      this.toScroll = true;
    }
    else
    {
      this.toScroll = false;
    }
  }

  render() {
    const { conversion, myId } = this.props;
    return <div
      className={classes.View}
      ref={(el) => { this.messageList = el; }}
      onScroll={this.onScroll}
    >
      {conversion.length ?
        conversion.map(mes => {
          const me = mes.from === myId;
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
  }
};

export default View;