import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

const processData = (data) => {
  var breakingBad = [];
  var betterCallSaul = [];
  data.map((episode, index) => {
    if (episode.series == "Breaking Bad") {
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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Esta es la tarea de Sergio.
        </p>
        <div className="seasonsFlex">
          <div className="seriesColumn">
            <h2>Breaking Bad</h2>
            <ul>
              {Object.keys(stateValue.BreakingBad).map((season, index) => (
                <li key={index}>Season {season}</li>
              ))}
            </ul>
          </div>
          <div className="seriesColumn">
            <h2>Better Call Saul</h2>
            <ul>
              {Object.keys(stateValue.BetterCallSaul).map((season, index) => (
                <li key={index}>Season {season}</li>
              ))}
            </ul>
          </div>
        </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
