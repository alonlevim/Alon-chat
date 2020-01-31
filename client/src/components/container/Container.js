import React from 'react';
import Conversions from '../conversions/Conversions';
import ViewConversion from '../viewConversion/ViewConversion';
import SearchInput from '../searchInput/SearchInput';

import classes from './Container.module.css';
import Alert from '../alert/Alert';


const container = (props) => {
    return <div className={classes.Container}>
        <div className={classes.Side}>
            <SearchInput />
            <Conversions
            users={props.users}
            selectedIdUser={props.selectedIdUser}
            updateSelectedUser={props.updateSelectedUser}
            />
        </div>
        <ViewConversion />
        {props.lostConnection && <Alert message="Lost connection..."/>}
    </div>
};

export default container;