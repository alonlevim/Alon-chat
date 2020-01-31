import React from 'react';
import Container from './components/container/Container';

import './App.css';

class App extends React.PureComponent {
  state = {
    load: true
  };

  componentDidMount(){
    var curImg = new Image();

    const thisClass = this;

    curImg.src = "http://photos.work-alon.com/3817.jpg";
    curImg.onload = function(){
        // do whatever here, add it to the background, append the image ect.
        document.body.style.backgroundImage = "url('http://photos.work-alon.com/3817.jpg')";
        thisClass.setState({load: false});
        
    }
  }

  render() {
    return (
      <div className="App">
        {this.state.load ? <div> load </div> :
          <React.Fragment>
            <Container />
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
