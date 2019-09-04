import React from 'react';

class ViewTopStreamsForGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameID: '',
      gameTopStreams: [],
      cursor: null
    }
  }

  detectWindowScrollToBottom = () => {
    const pointerToThis = this;

    window.onscroll = function(ev) {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        pointerToThis.fetchStreamsForGame(pointerToThis.state.cursor);
        // console.log(document.body.offsetHeight);
      }
    }
  }

  getGameIDFromURL = () => {
    let pointerToThis = this;
    let url = document.URL;
    let urlParts = url.split('=');
    // alert(urlParts[1])

    pointerToThis.state.gameID = urlParts[1];
  }

  componentDidMount() {
    this.getGameIDFromURL();
    // alert(this.state.gameID);
    this.fetchStreamsForGame();
    this.detectWindowScrollToBottom();
  }

  fetchStreamsForGame = (previousCursor) => {
    const pointerToThis = this;
    let gameTopStreamsData = [];
    var queryAfter = '';

    if (previousCursor) {
      queryAfter = `&after=${previousCursor}`;
    }

    fetch(`https://api.twitch.tv/helix/streams?game_id=${this.state.gameID}${queryAfter}`, {
      method: 'get',
      headers: new Headers({
        'Client-ID': 's75951wp1ziumbywfpu9hyv20iz5u7'
      })
    })
      .then(
        function(response) {
          return response.json();
        }
      )
      .then(
        function(data) {
          console.log(data);
          for (var key in data.data) {
            gameTopStreamsData.push({
              // key: key,
              streamName: data.data[key].title,
              thumbnailURL: data.data[key].thumbnail_url,
              username: data.data[key].user_name,
              viewerCount: data.data[key].viewer_count,
              language: data.data[key].language,
              gameID: data.data[key].game_id
            })
          }

          pointerToThis.setState({
            gameTopStreams: [...pointerToThis.state.gameTopStreams, ...gameTopStreamsData],
            cursor: data.pagination.cursor
          });
        }
      );
  }

  render() {
    let gameTopStreamsList = [];

    // console.log(this.state.gameTopStreams);

    for (var key in this.state.gameTopStreams) {
      gameTopStreamsList.push(
        <li key={key}>
          <a href={'../view_streamer/' + this.state.gameTopStreams[key].username}>
            <img src={this.state.gameTopStreams[key].thumbnailURL.replace("{width}", "320").replace("{height}", "180")} alt=""/>
          </a><br />
          {this.state.gameTopStreams[key].username.substring(0,30)}<br />
          {this.state.gameTopStreams[key].streamName.substring(0,30)}<br />
          Viewers: {this.state.gameTopStreams[key].viewerCount}
        </li>
      )
    }

    return (
      <div id='gameStreams'>
        <h1>Top streams for game:</h1>
        <ul>
          {gameTopStreamsList}
        </ul>
        <div id='clearBoth'></div>
      </div>
    )
  }
}

export default ViewTopStreamsForGame;