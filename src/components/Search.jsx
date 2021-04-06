import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export const Search = () => {
  const { searchname } = useParams();
  const [characterState, setCharacterState] = useState();
  console.log(searchname);
  useEffect(() => {
    fetch(`https://tarea-1-breaking-bad.herokuapp.com/api/characters?name=${searchname}`)
      .then(response => response.json())
      .then(result => setCharacterState(result));
  }, [])
  if (!characterState) return (<p>procesando</p>);
  return (
    <div className="seasonsFlex">
          <div className="seriesColumn">
            <h2>Results</h2>
            <ol>
            {characterState.map((character, index) => (
              <Link to={`/characters/${character.name.split(" ").join("+")}`}><li key={index}>{character.name}</li></Link>
            ))}
            </ol>
          </div>
    </div>
  );
}