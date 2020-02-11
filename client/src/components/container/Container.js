import React from 'react';
import Members from '../members/Members';
import ViewConversion from '../viewConversion/ViewConversion';
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
        conversion,
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
        disableSelectedMember
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
                <SearchInput updateSearch={updateSearch} />
                <Members
                    members={members}
                    selectedIdMember={selectedIdMember}
                    updateSelectedMember={updateSelectedMember}
                    introductionMode={introductionMode}
                />
            </div>
            {
                introductionMode
                ?
                // Member didn't select conversion with another member
                <IntroductoryView />
                :
                // Member selected conversion with another member
                <ViewConversion
                    selectedIdMember={selectedIdMember}
                    conversion={conversion}
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