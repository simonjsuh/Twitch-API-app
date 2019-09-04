import React from 'react';

class ListOfTopGames extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topGames: [],
      cursor: ''
    }
  }

  componentDidMount() {
    this.fetchTopGames();
    this.detectWindowScrollToBottom();
  }

  detectWindowScrollToBottom = () => {
    const pointerToThis = this;
    window.onscroll = function(ev) {
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
    let topGamesData = [];
    var queryAfter = '';

    if (previousCursor) {
      queryAfter = `after=${previousCursor}`;
    }

    fetch(`https://api.twitch.tv/helix/games/top?${queryAfter}`, {
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
          // console.log(data);

          for (var key in data.data) {
            topGamesData.push({
              // key: key,
              gameID: data.data[key].id,
              gameName: data.data[key].name,
              gameBoxArtURL: data.data[key].box_art_url
            })
          }

          pointerToThis.setState({
            topGames: [...pointerToThis.state.topGames, ...topGamesData],
            cursor: data.pagination.cursor
          });
        }
      );
  }

  render() {
    let topGamesList = [];
    console.log(this.state.topGames)

    for (var key in this.state.topGames) {
      topGamesList.push(
        <li key={key}>
          <a href={"/topStreamsForGame/gameID=" + this.state.topGames[key].gameID}>
            <img src={this.state.topGames[key].gameBoxArtURL.replace("{width}", "285").replace("{height}", "380")} alt=""/>
          </a><br />
          {this.state.topGames[key].gameName}
        </li>
      )
    }

    return (
      <div>
        <h1>List of Top Games</h1>
        <ul>
          {topGamesList}
        </ul>
        <div id='clearBoth'></div>
      </div>
    )
  }
}

export default ListOfTopGames;