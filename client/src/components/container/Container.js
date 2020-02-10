import React from 'react';
import Members from '../members/Members';
import ViewConversion from '../viewConversion/ViewConversion';
import SearchInput from '../searchInput/SearchInput';

import classes from './Container.module.css';
import Alert from '../alert/Alert';


const container = (props) => {
    const {
        members,
        selectedIdMember,
        updateSelectedMember,
        conversion,
        messagePopupError,
        popupError,
        myId,
        registration,
        sendMessage,
        connectSocketFirstTime,
        getMemberSelected,
        updateSearch
    } = props;
    
    return <div className={classes.Container}>
        {myId !== -1 ? <div className={classes.Side}>
            <SearchInput updateSearch={updateSearch} />
            <Members
            members={members}
            selectedIdMember={selectedIdMember}
            updateSelectedMember={updateSelectedMember}
            />
        </div> : null}
        
        <ViewConversion
        selectedIdMember={selectedIdMember}
        conversion={conversion}
        myId={myId}
        registration={registration}
        sendMessage={sendMessage}
        getMemberSelected={getMemberSelected}
        />
        {popupError && <Alert message={messagePopupError} />}
        {connectSocketFirstTime && <Alert message="Connection..."/>}
    </div>
};

export default container;