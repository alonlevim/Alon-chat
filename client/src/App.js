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
    conversion: [],
    popupError: false,
    messagePopupError: "",
    search: ""
  };

  constructor(props) {
    super(props);

    this.socket = null;
  }

  async componentDidMount() {
    // Check if have id in localStorage
    await new Promise(this.checkLogin);

    // First time connect to sever
    server.connect(this.connect, this.getMessage, this.updateData);

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
    const userSelected = members.filter( member => member._id === selectedIdMember );

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

    if (typeof data.myDetails !== "undefined" && typeof data.members !== "undefined") {
      const { myDetails, members } = data;

      // update data at state
      this.setState({
        myId: myDetails._id,
        members: members.filter(member => member._id != (myDetails._id || this.state.myId) ),
        popupError: false,
        messagePopupError: ""
      });
    }
    else {
      this.setState({
        members: data.filter(member => member._id != this.state.myId ),
        popupError: false,
        messagePopupError: ""
      });
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

  getConversionWithMemberById = (id) => {
    const { myId } = this.state;
    
    server.getConversionWithMember({
      myId: myId,
      withId: id
    }, (status, data) => {   
      if( status === "OK" ) {
        if( typeof data.messages != "undefined" ) {
          this.setState({conversion: data.messages, selectedIdMember: id});
        }
        else
        {
          this.setState({conversion: [], selectedIdMember: id});
        }
      }
    });
  }

  getMessage = (data) => {
    if( data != null && typeof data.status !== "undefined" && data.status === "OK" ) {
      if( typeof data.result !== "undefined" && data.result && typeof data.result.messages !== "undefined" ) {
        this.setState({ conversion: data.result.messages});
      }
    }
  }

  updateSearch = (string) => {
    this.setState({search: string.trim()});
  }

  sendMessage = (message) => {
    const { myId, selectedIdMember } = this.state;
    const data = {
      message,
      from: myId,
      to: selectedIdMember
    };

    server.sendMessage(data, (status, newData)=>{
      if( status === "OK" ) {
        if( newData != null && typeof newData.messages !== "undefined" ) {
          const { messages } = newData;
          this.setState({ conversion: messages});
        }
      }
      else {
        // TODO: error alert
      }
      
    })
  }

  disableSelectedMember = () => {
    this.setState({selectedIdMember: -1})
  }

  logout = () => {
    const { myId } = this.state;
    server.logout(myId, ()=>{
      localStorage.removeId();
      this.setState({myId: -1});
    });
  }

  listMembersAfterSearchFilter = () => this.state.members.filter( member => member.name.toLowerCase().includes(this.state.search.toLowerCase()) );

  render() {
    const { loading, connectSocketFirstTime, selectedIdMember, conversion, myId, popupError, messagePopupError } = this.state;
    return (
      <div className="App">
        {loading ? <div> load </div> :
          <React.Fragment>
            <Container
              members={this.listMembersAfterSearchFilter()}
              selectedIdMember={selectedIdMember}
              updateSelectedMember={this.getConversionWithMemberById}
              popupError={popupError}
              messagePopupError={messagePopupError}
              connectSocketFirstTime={!connectSocketFirstTime}
              conversion={conversion}
              myId={myId}
              registrationMode={myId === -1}
              introductionMode={myId !== -1 && selectedIdMember === -1}
              registration={this.registration}
              sendMessage={this.sendMessage}
              getMemberSelected={this.getMemberSelected}
              updateSearch={this.updateSearch}
              disableSelectedMember={this.disableSelectedMember}
              logout={this.logout}
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
