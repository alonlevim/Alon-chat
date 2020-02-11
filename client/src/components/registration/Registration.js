import React from 'react';

import classes from './Registration.module.css';

class Registration extends React.PureComponent {
    state = {value : ""};

    submit = (event) => {
        event.preventDefault();
        
        this.props.registration(this.state.value);
    };

    render() {
        return <div className={classes.Registration}>
            <h1 className={classes.Title}>Welcome To<span> Alon </span> Chat</h1>
            <img className={classes.Robot} src="http://photos.work-alon.com/robot.png" />
            <form className={classes.Registration} onSubmit={this.submit}>
                <input
                    className={classes.NameInput}
                    type="text"
                    placeholder="Enter Your Name"
                    value={this.state.value}
                    onChange={(event) => {
                        this.setState({ value: event.target.value });
                    }}
                />
                <button className={classes.LoginButton}>LOGIN</button>
            </form>
        </div>
    }
};

export default Registration;