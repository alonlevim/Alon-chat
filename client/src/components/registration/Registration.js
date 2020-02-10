import React from 'react';

import classes from './Registration.module.css';

class Registration extends React.PureComponent{
    
    state = {value : ""};

    submit = (event) => {
        event.preventDefault();
        
        this.props.registration(this.state.value);
    };

    render(){
        return <form className={classes.Registration} onSubmit={this.submit}>
        <input
        className={classes.NameInput}
        type="text"
        placeholder="Enter You Name"
        value={this.state.value}
        onChange={(event)=>{
            this.setState({value: event.target.value});
        }}
        />
        <button className={classes.LoginButton}>LOGIN</button>
    </form>
    }
}

export default Registration;