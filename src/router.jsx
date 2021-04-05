import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import App from "./App";
import { useState, useEffect } from 'react';
import Home from "./components/Home";
import { Season } from "./components/Season";

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
            <Link to="/">Tarea 1</Link>
          </li>
        </ul>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <Home seasons={stateValue}/>
          </Route>
          <Route exact path="/seasons/:series/:id">
            <Season seasons={stateValue}/>
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
