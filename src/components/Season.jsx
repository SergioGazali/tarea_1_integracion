import React from 'react';
import { useParams } from 'react-router-dom';

export const Season = (props) => {
  const stateValue = props.seasons;
  const { series, id } = useParams();
  return (
    <div className="seasonsFlex">
          <div className="seriesColumn">
            <h2>{series}</h2>
            <h2>Season {id}</h2>
            <ol>
            {stateValue[series][id].map((episode, index) => (
              <li>{episode.title}</li>
            ))}
            </ol>
          </div>
    </div>
  );
}