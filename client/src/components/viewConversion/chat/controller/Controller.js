import React from 'react';

import classes from './Controller.module.css';

class controller extends React.PureComponent {
  state = { value: "" };

  sendMessage = (event) => {
    event.preventDefault();
    this.props.sendMessage(this.state.value);
    this.setState({value:""});
  }

  render() {
    return <form
      className={classes.Controller}
      onSubmit={this.sendMessage}
    >
      <input
        type="text"
        placeholder="Type a message"
        value={this.state.value}
        onChange={(event) => {
          this.setState({ value: event.target.value });
        }}
      />
      <button onClick={this.sendMessage}>Send</button>
    </form>
  }
};

export default controller;