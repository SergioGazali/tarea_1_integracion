import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import { Season } from './components/Season';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const processData = (data) => {
  var breakingBad = [];
  var betterCallSaul = [];
  data.map((episode, index) => {
    if (episode.series === "Breaking Bad") {
      if (episode.season in breakingBad) {
        breakingBad[episode.season].push(episode);
      } else {
        breakingBad[episode.season] = [];
        breakingBad[episode.season].push(episode);
      }
    }
    else {
      if (episode.season in betterCallSaul) {
        betterCallSaul[episode.season].push(episode);
      } else {
        betterCallSaul[episode.season] = [];
        betterCallSaul[episode.season].push(episode);
      }
    }
  })
  const result = {"BreakingBad": breakingBad, "BetterCallSaul": betterCallSaul};
  return result;
}

function App() {
  const [stateValue, setState] = useState({"BreakingBad": {}, "BetterCallSaul": {}});
  useEffect(() => {
    // send HTTP request
    fetch("https://tarea-1-breaking-bad.herokuapp.com/api/episodes")
      .then(response => response.json())
      //.then(data => console.log(data));
      .then(data => processData(data))
      .then(result => setState(result));
    // save response to variable
  }, [])
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <p>
            Esta es la tarea de Sergio.
          </p>
            <Switch>
              <Route path="/">
                <Home seasons={stateValue}/>
              </Route>
              <Route path="/seasons/:id" component={Season}/>
            </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;
