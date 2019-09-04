import React from 'react';
// import $ from 'jquery';

class ListOfTopStreamers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topStreams: [],
      cursor: null
    }
  }

  componentDidMount() {
    this.fetchTopGames();
    this.detectWindowScrollToBottom();
  }

  // checkCursorVariable = () => {
  //   const pointerToThis = this;

  //   if (pointerToThis.state.cursor != null) {
  //     pointerToThis.fetchTopGames(pointerToThis.state.cursor);
  //   } else {
  //     window.setTimeout('checkCursorVariable();', 100);
  //   }
  // }

  detectWindowScrollToBottom = () => {
    const pointerToThis = this;

    // check if scrollbar is visible. If so, detect scrollbar change to bottom. If scrollbar is not visible, load the next 20 streamers automatically.
    // if (document.getElementById('listOfTopStreamers').scrollHeight > document.getElementById('listOfTopStreamers').offsetHeight) {
    //   // this.checkCursorVariable();
    //   pointerToThis.fetchTopGames(pointerToThis.state.cursor);
    // } 

    window.onscroll = function() {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        // alert(pointerToThis.state.cursor);
        // console.log(document.body.offsetHeight);
        pointerToThis.fetchTopGames(pointerToThis.state.cursor);
        // pointerToThis.fetchTopGamesWithViewerCount();
      }
    }
  }

  fetchTopGames = (previousCursor) => {
    const pointerToThis = this;
    let topStreamsData = [];
    var queryAfter = '';

    if (previousCursor) {
      queryAfter = `after=${previousCursor}`;
    }

    // console.log(queryAfter);

    fetch(`https://api.twitch.tv/helix/streams?${queryAfter}`, {
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
            topStreamsData.push({
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
            topStreams: [...pointerToThis.state.topStreams, ...topStreamsData],
            cursor: data.pagination.cursor
          });
        }
      );
  }

  render() {
    let topStreamsList = [];

    for (var key in this.state.topStreams) {
      topStreamsList.push(
        <li key={key}>
          <a href={'view_streamer/' + this.state.topStreams[key].username}>
            <img src={this.state.topStreams[key].thumbnailURL.replace("{width}", "320").replace("{height}", "180")} alt=""/>
          </a><br />
          {this.state.topStreams[key].username.substring(0,30)}<br />
          {this.state.topStreams[key].streamName.substring(0,30)}<br />
          Viewers: {this.state.topStreams[key].viewerCount}
        </li>
      )
    }

    return (
      <div id='listOfTopStreamers'>
        <h1>List of Top Streamers</h1>
        <ul>
          {topStreamsList}
        </ul>
        <div id='clearBoth'></div>
      </div>
    )
  }
}

export default ListOfTopStreamers;