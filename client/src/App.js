import React from 'react';
import Container from './components/container/Container';
import socketIOClient from "socket.io-client";

import './App.css';

class App extends React.PureComponent {
  state = {
    load: false,
    connectSocket: false,
    users: [],
    selectedIdUser: -1
  };

  constructor(props) {
    super(props);

    this.socket = null;
  }

  componentDidMount() {
    var curImg = new Image();
    this.socket = socketIOClient("http://localhost:4000");
    this.socket.on("connect", () => { this.onceGetAllDate(); });
    this.socket.on("all data", (data) => { this.setState({ users: data.users }); });
    this.socket.on("disconnect", () => { this.setState({ connectSocket: false }); });

    const thisClass = this;

    curImg.src = "http://photos.work-alon.com/3817.jpg";
    curImg.onload = function () {
      // do whatever here, add it to the background, append the image ect.
      document.body.style.backgroundImage = "url('http://photos.work-alon.com/3817.jpg')";
      thisClass.setState({ load: false });
    }
  }

  onceGetAllDate = () => {
    this.setState({ connectSocket: true });

    this.socket.emit("all data");
  };

  updateSelectedUser = (id) => {
    this.setState({ selectedIdUser: id });
  }

  render() {
    const { load, connectSocket, users, selectedIdUser } = this.state;
    return (
      <div className="App">
        {load ? <div> load </div> :
          <React.Fragment>
            <Container
            users={users}
            selectedIdUser={selectedIdUser}
            updateSelectedUser={this.updateSelectedUser}
            lostConnection={!connectSocket}
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
