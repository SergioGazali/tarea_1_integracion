import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import "../App.css";


export default function Home(props) {
  return (
    <div className="seasonsFlex">
          <div className="seriesColumn">
            <h2>Breaking Bad</h2>
            <ul className="seasonsList">
              {Object.keys(props.seasons.BreakingBad).map((season, index) => (
                <Link to={`/seasons/BreakingBad/${season}`}><li key={index}>Season {season}</li></Link>
              ))}
            </ul>
          </div>
          <div className="seriesColumn">
            <h2>Better Call Saul</h2>
            <ul className="seasonsList">
              {Object.keys(props.seasons.BetterCallSaul).map((season, index) => (
                <Link to={`/seasons/BetterCallSaul/${season}`}><li key={index}>Season {season}</li></Link>
              ))}
            </ul>
          </div>
        </div>
  );
}