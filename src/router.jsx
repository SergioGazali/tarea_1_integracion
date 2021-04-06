import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import { useState, useEffect } from 'react';
import Home from "./components/Home";
import { Season } from "./components/Season";
import { Episode } from "./components/Episode";
import { Character } from "./components/Character";

const processData = (data) => {
  var breakingBad = {};
  var betterCallSaul = {};
  data.map((episode, index) => {
    if (episode.series === "Breaking Bad") {
      if (episode.season in breakingBad) {
        /* breakingBad[episode.season].push(episode); */
        breakingBad[episode.season][episode.episode] = episode;
      } else {
        breakingBad[episode.season] = {};
        /* breakingBad[episode.season].push(episode); */
        breakingBad[episode.season][episode.episode] = episode;
      }
    }
    else {
      if (episode.season in betterCallSaul) {
        betterCallSaul[episode.season][episode.episode] = episode;
      } else {
        betterCallSaul[episode.season] = {};
        betterCallSaul[episode.season][episode.episode] = episode;
      }
    }
  })
  const result = {"BreakingBad": breakingBad, "BetterCallSaul": betterCallSaul};
  return result;
}


export default function BasicExample() {
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
      <div>
        <ul>
          <li>
            <Link to="/tarea_1_integracion">Tarea 1</Link>
          </li>
        </ul>

        <hr />

        <Switch>
          <Route exact path="/seasons/:series/:id">
            <Season seasons={stateValue}/>
          </Route>
          <Route exact path="/tarea_1_integracion">
            <Home seasons={stateValue}/>
          </Route>
          <Route exact path="/episodes/:series/:season/:episode">
            <Episode seasons={stateValue}/>
          </Route>
          <Route exact path="/characters/:name">
            <Character />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.

function Dashboard() {
  /* let { id } = useParams(); */
  return (
    <div>
      <h2>Dashboard</h2>
      {/* <h3>ID: {id}</h3> */}
    </div>
  );
}
