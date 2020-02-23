import React from 'react';
import Members from '../members/Members';
import ViewConversation from '../viewConversation/ViewConversation';
import SearchInput from '../searchInput/SearchInput';
import IntroductoryView from '../introductoryView/IntroductoryView';
import Registration from '../registration/Registration';

import classes from './Container.module.css';
import Alert from '../alert/Alert';


const container = (props) => {
    const {
        members,
        selectedIdMember,
        updateSelectedMember,
        conversation,
        messagePopupError,
        popupError,
        myId,
        registration,
        sendMessage,
        connectSocketFirstTime,
        getMemberSelected,
        updateSearch,
        registrationMode,
        introductionMode,
        disableSelectedMember,
        logout,
        loadingMembers
    } = props;

    const allClassesSide = [classes.Side];

    // introduction mode
    !introductionMode && allClassesSide.push(classes.IntroductionMode);

    return <div className={classes.Container}>
        { registrationMode
        ?
        // Member need to registration 
        <Registration registration={props.registration} />
        :
        // Member is signed in
        <React.Fragment>
            <div className={allClassesSide.join(" ")}>
                <SearchInput
                updateSearch={updateSearch}
                logout={logout}
                />
                <Members
                    members={members}
                    selectedIdMember={selectedIdMember}
                    updateSelectedMember={updateSelectedMember}
                    introductionMode={introductionMode}
                    loadingMembers={loadingMembers}
                />
            </div>
            {
                introductionMode
                ?
                // Member didn't select conversation with another member
                <IntroductoryView />
                :
                // Member selected conversation with another member
                <ViewConversation
                    selectedIdMember={selectedIdMember}
                    conversation={conversation}
                    myId={myId}
                    registration={registration}
                    sendMessage={sendMessage}
                    getMemberSelected={getMemberSelected}
                    disableSelectedMember={disableSelectedMember}
                />
            }
            
        </React.Fragment>
         }
        {popupError && <Alert message={messagePopupError} />}
        {connectSocketFirstTime && <Alert message="Connection..." />}
    </div>
};

export default container;