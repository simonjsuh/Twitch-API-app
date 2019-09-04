import React from 'react';
import ListOfTopGames from './ListOfTopGames';
import ListOfTopStreamers from './ListOfTopStreamers';
import ViewTopStreamsForGame from './ViewTopStreamsForGame';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ViewStreamer from './ViewStreamer';

class API extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/listOfTopGames">List of Top Games</Link>
              </li>
              <li>
                <Link to="/listOfTopStreamers">List of Top Streamers</Link>
              </li>
            </ul>
          </nav>
            <div id="instructions">
            <h1>Instructions</h1>
            <p>To get started, click on 'List of Top Games' or 'List of Top Streamers' links. You can view the live streams of each individual streamer via this app. Scrolling down dynamically loads more games and streams. Thank you for your time! - Simon S.</p>
          </div>
        </div>
        
        <Route path="/view_streamer/:id" exact component={ViewStreamer} />
        <Route path="/topStreamsForGame/:id" exact component={ViewTopStreamsForGame} />
        <Route path="/listOfTopGames" component={ListOfTopGames} />
        <Route path="/listOfTopStreamers" exact component={ListOfTopStreamers} />
      </Router>
    )
  }
}



export default API;