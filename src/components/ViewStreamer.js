import React from 'react';

class ViewStreamer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      streamerName: ''
    }
  }

  getStreamerNameFromURL = () => {
    let pointerToThis = this;
    const url = document.URL;
    let partsOfURL = url.split('/');
    let streamerName = partsOfURL[partsOfURL.length - 1];

    pointerToThis.state.streamerName = streamerName;
    console.log(pointerToThis.state.streamerName);
    
  }

  componentWillMount() {
    this.getStreamerNameFromURL();
  }

  render() {
    return (
      <div id='streamer'>
        <h1>You are viewing {this.state.streamerName}'s stream</h1>
          <div id="streameriFrame">
          <iframe src={"https://player.twitch.tv/?channel=" + this.state.streamerName} frameborder="0" allowfullscreen="true" scrolling="no" height="500" width="720"></iframe>
          <iframe src={"https://www.twitch.tv/embed/" + this.state.streamerName + "/chat"} frameborder="0" scrolling="no" height="500" width="350"></iframe>
        </div>
      </div>
    )
  }
}

export default ViewStreamer;