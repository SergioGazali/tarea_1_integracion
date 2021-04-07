import React from 'react';
import { useParams, Link } from 'react-router-dom';

export const Season = (props) => {
  const stateValue = props.seasons;
  const { series, id } = useParams();
  return (
    <div className="season">
          <div className="seriesColumn">
            <h2>{series}</h2>
            <h2>Season {id}</h2>
            <hr />
            <ol>
            {Object.values(stateValue[series][id]).map((episode, index) => (
              <Link to={`/episodes/${series}/${id}/${episode.episode}`}><li key={index}>{episode.title}</li></Link>
            ))}
            </ol>
          </div>
    </div>
  );
}