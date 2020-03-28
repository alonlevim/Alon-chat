import React from 'react';
import Container from './components/container/Container';
import * as event from './eventsString';
import localStorage from './localStorage';
import server from './socketEvents';

import './App.css';

class App extends React.PureComponent {
  state = {
    loading: false,
    connectSocketFirstTime: false,
    members: [],
    selectedIdMember: -1,
    myId: -1,
    conversation: [],
    popupError: false,
    messagePopupError: "",
    search: "",
    modeDevelopment: typeof process.env.NODE_ENV != "undefined" && process.env.NODE_ENV.trim() === "development",
    loadingMembers: true
  };

  constructor(props) {
    super(props);

    this.socket = null;
    this.toScroll = true;
    this.conversation = [];
  }

  async componentDidMount() {
    server.modeDevelopment(this.state.modeDevelopment);

    // Check if have id in localStorage
    await new Promise(this.checkLogin);

    // First time connect to sever
    const callbacksToResponse = {
      memberOnline: this.memberOnline,
      connect: this.connect,
      getMessage: this.getMessage,
      updateData: this.updateData,
      memberOffline: this.memberOffline,
      addMember: this.addMember
    };
    server.connect(callbacksToResponse);

    // load image and show chat
    this.loadImages(() => {
      this.setState({ loading: false });
    });
  }

  connect = () => {
    const { myId } = this.state;
    // Disable connect pop-up
    let newState = { connectSocketFirstTime: true };

    if (myId !== -1)
      server.signIn(myId, (status, data) => {
        if (status === "OK") {
          // update data at state
          this.updateData(data);
        }
        else {
          // remove id from localStorage
          localStorage.removeId();
          // remove id from state
          newState.myId = -1;

          this.setState(newState);
          newState = null;
        }
      });
    // Update state if is not login
    newState && this.setState(newState);
  }

  getMemberSelected = () => {
    const { members, selectedIdMember } = this.state;
    const userSelected = members.filter(member => member._id === selectedIdMember);

    return userSelected.length > 0 ? userSelected[0] : null;
  }

  registration = (name) => {
    server.registration(name, (status, data) => {
      if (status === "OK") {
        // update id in local storage
        const { myDetails } = data;
        localStorage.setId(myDetails._id);

        // update data at state
        this.updateData(data);

      }
      else {
        // show pop up - error
        this.setState({
          popupError: true,
          messagePopupError: data
        });
      }
    });
  };

  updateData = (data) => {
    if (data == null)
      return;

    if (typeof data.members !== "undefined") {
      const newMembers = [];
      // Unread message each member
      data.members.forEach((member, index) => {
        const unread = this.unreadMessageUpdate({ conversation: member.conversation, indexMember: index, myId: data.myDetails._id || this.state.myId }, false);
        const newMember = { ...member, unread };
        newMembers.push(newMember);
      });
      if (typeof data.myDetails !== "undefined") {
        const { myDetails, members } = data;
        
        // update data at state
        this.setState({
          myId: myDetails._id,
          members: newMembers.filter(member => member._id != (myDetails._id || this.state.myId)),
          popupError: false,
          messagePopupError: "",
          loadingMembers: false
        });
      }
      else {
        // update data at state
        this.setState({
          members: newMembers.filter(member => member._id != this.state.myId),
          popupError: false,
          messagePopupError: "",
          loadingMembers: false
        });
      }
    }
  }

  loadImages = (callback) => {
    const curImg = new Image();
    curImg.src = "http://photos.work-alon.com/3817.jpg";
    curImg.onload = function () {
      // do whatever here, add it to the background, append the image ect.
      document.body.style.backgroundImage = "url('http://photos.work-alon.com/3817.jpg')";

      if (callback) {
        callback();
      }
    }
  }

  checkLogin = (resolve, reject) => {
    if (localStorage.haveId()) {
      this.setState({ myId: localStorage.getId() }, () => {
        resolve();
      });
    }
    else {
      resolve();
    }
  }

  findMemberById = (id) => {
    const result = this.state.members.filter(member => member._id === id);
    return result.length > 0 ? result[0] : null;
  }

  getIndexOfMemberById = (id) => {
    let indexById = -1;

    this.state.members.forEach((item, index, arr) => {
      if (item._id === id) {
        indexById = index;
      }

    });

    return indexById;
  };

  getConversationWithMemberById = (id) => {
    const member = this.findMemberById(id);

    this.conversation = [...member.conversation];
    member != null && this.setState({
      conversation: member.conversation.map(con => {
        return {
          _id: con._id,
          from: con.from,
          to: con.to,
          content: con.content,
          date: con.date
        }
      }),
      selectedIdMember: id
    });
  };

  addMember = (member) => {
    const { members } = this.state;
    const newMembers = [...members];
    // Add
    newMembers.push(member);
    // Update state
    this.setState({ members: newMembers });
  };

  removeMember = (member) => {
    const { members } = this.state;
    // Find by id
    this.getIndexOfMemberById(member._id);
    // Remove from array
    const newMembers = members.splice(member, 1);
    // Update state
    this.setState({ members: newMembers });
  };

  memberOnline = (id) => {
    this.memberOnlineOrOffline(true, id);
  };

  memberOffline = (id) => {
    this.memberOnlineOrOffline(false, id);
  }

  memberOnlineOrOffline = (online, id) => {
    const index = this.getIndexOfMemberById(id);

    // Not fount member
    if (index === -1) {
      return;
    }

    const { members } = this.state;
    // Copy array
    const newMembers = [...members];
    // update item
    newMembers[index].online = online;
    // Update state
    this.setState({ member: newMembers });
  }

  getMessage = (data) => {
    if (data != null && typeof data.content !== "undefined") {
      const { selectedIdMember } = this.state;
      // When conversation with member
      if (typeof data.from !== "undefined" && data.from === selectedIdMember) {
        const { conversation } = this.state;
        const newConversation = [...conversation];
        newConversation.push(data);

        this.setState({ conversation: newConversation });
      }
      // When conversation is not with the member
      else if (typeof data.from !== "undefined") {

        const indexMember = this.getIndexOfMemberById(data.from);
        if (indexMember !== -1) {
          const { members } = this.state;
          const newMembers = [...members];
          newMembers[indexMember].conversation.push(data);

          this.setState({ members: newMembers });
        }
        else {
          console.log("Can't found member");
        }
      }
    }
  }

  updateSearch = (string) => {
    this.setState({ search: string.trim() });
  }

  sendMessage = (message) => {
    const { myId, selectedIdMember } = this.state;
    const data = {
      message,
      from: myId,
      to: selectedIdMember
    };

    server.sendMessage(data, (status, error, data) => {
      if (status === "OK") {
        if (data != null && typeof data.content !== "undefined") {
          const { conversation } = this.state;
          const newConversation = [...conversation];
          newConversation.push(data);
          this.conversation.push(data);

          this.setState({ conversation: newConversation });
        }
      }
      else {
        console.log(error);
      }

    })
  }

  readMessage = (data) => {
    const { idMessage, idMember } = data;
    const indexMember = this.getIndexOfMemberById(idMember);

    if (indexMember === -1)
      return;

    const member = this.state.members[indexMember];
    const listMessage = member.conversation.map((item, index) => item._id === idMessage ? index : false).filter(item=> item !== false);
    const indexMessage = listMessage.length > 0 ? listMessage[0] : false;

    if (indexMessage === false)
      return;

    const message = member.conversation[indexMessage];
    // When not saw the message
    if (!message.saw) {
      // Data to server
      const data = {
        from: message.from,
        to: message.to,
        id: message._id
      };

      // Send to server
      server.sawMessage(data, () => {
        // Update read message in state
        const { conversation } = this;
        const index = conversation.findIndex(mess => mess._id == data.id);
        conversation[index].saw = true;

        this.unreadMessageUpdate({ conversation, indexMember }, true);
      });
    }
  }

  unreadMessageUpdate = ({ conversation, indexMember, myId = this.state.myId }, updateState) => {
    const count = conversation.filter(item => !item.saw && (item.from !== "undefined" && myId != "undefined" && item.from !== myId)).length

    if (updateState === true) {
      const { members } = this.state;
      const newMembers = [...members];
      if (indexMember > -1 && typeof newMembers[indexMember] != "undefined") {
        newMembers[indexMember].unread = count;
        this.setState({ members: newMembers });
      }
    }

    return count;
  };

  disableSelectedMember = () => {
    this.setState({ selectedIdMember: -1 })
  }

  logout = () => {
    const { myId } = this.state;
    server.logout(myId, () => {
      localStorage.removeId();
      this.setState({ myId: -1 });
    });
  }

  listMembersAfterSearchFilter = () => this.state.members.filter(member => member.name.toLowerCase().includes(this.state.search.toLowerCase()));

  render() {
    const {
      loading,
      connectSocketFirstTime,
      selectedIdMember,
      conversation,
      myId,
      popupError,
      messagePopupError,
      loadingMembers
    } = this.state;

    return (
      <div className="App">
        {loading ? <div> load </div> :
          <React.Fragment>
            <Container
              members={this.listMembersAfterSearchFilter()}
              selectedIdMember={selectedIdMember}
              updateSelectedMember={this.getConversationWithMemberById}
              popupError={popupError}
              messagePopupError={messagePopupError}
              connectSocketFirstTime={!connectSocketFirstTime}
              conversation={conversation}
              conversationWithoutState={this.conversation}
              myId={myId}
              registrationMode={myId === -1}
              introductionMode={myId !== -1 && selectedIdMember === -1}
              registration={this.registration}
              sendMessage={this.sendMessage}
              getMemberSelected={this.getMemberSelected}
              updateSearch={this.updateSearch}
              disableSelectedMember={this.disableSelectedMember}
              logout={this.logout}
              loadingMembers={loadingMembers}
              readMessage={this.readMessage}
              toScroll={this.toScroll}
            />

            <div className="customLink">
              <div>Icons made by <a href="https://www.flaticon.com/authors/mynamepong" title="mynamepong">mynamepong</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
              <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            </div>
          </React.Fragment>
        }
      </div>
    );
  }
}

export default App;
