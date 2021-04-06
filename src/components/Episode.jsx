import React from 'react';
import { useParams, Link } from 'react-router-dom';

export const Episode = (props) => {
  const stateValue = props.seasons;
  const { series, season, episode } = useParams();
  let visited_episode;
  console.log(stateValue);
  /* stateValue[series][season].forEach(iterated_episode => {
    if (iterated_episode.episode === episode) {
      console.log(iterated_episode);
      setVisited(iterated_episode);
    }
  }); */
  visited_episode = stateValue[series][season][episode];
  if (!visited_episode) return (<p>procesando</p>);
  return (
    <div className="seasonsFlex">
          <div className="seriesColumn">
            <h1>{visited_episode.title}</h1>
            <h2>{visited_episode.series}</h2>
            <h2>Season {visited_episode.season}</h2>
            <h2>Episode {visited_episode.episode}</h2>
            <p>Air date: {visited_episode.air_date}</p>
        
            <ul>
            {visited_episode.characters.map((character, index) => (
              <Link to={`/characters/${character.split(" ").join("+")}`}><li key={index}>{character}</li></Link>
            ))}
            </ul>
          </div>
    </div>
  );
}