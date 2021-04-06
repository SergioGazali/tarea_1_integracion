import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export const Character = () => {
  const { name } = useParams();
  const name_array = name.split(" ");
  const search_name = name_array.join("+");
  const [characterState, setCharacterState] = useState();
  const [quotesState, setQuotesState] = useState();

  useEffect(() => {
    fetch(`https://tarea-1-breaking-bad.herokuapp.com/api/characters?name=${search_name}`)
      .then(response => response.json())
      .then(result => setCharacterState(result[0]));
  }, [])
  useEffect(() => {
    fetch(`https://tarea-1-breaking-bad.herokuapp.com/api/quote?author=${search_name}`)
      .then(response => response.json())
      .then(result => setQuotesState(result));
  }, [])
  console.log(characterState);
  console.log(quotesState);
  if (!characterState || !quotesState) return (<p>procesando</p>);
  return (
    <div className="seasonsFlex">
          <div className="seriesColumn">
            <h1>{characterState.name}</h1>
            <p>{characterState.category}</p> 
            <p>{characterState.status}</p>
            <p>Also known as: {characterState.nickname}</p>
            <p>Portrayed by: {characterState.portrayed}</p>

            <img id="characterImage" src={characterState.img} alt="character"></img>

            <h3>Occupation</h3>        
            <ul>
            {characterState.occupation && characterState.occupation.map((occupation, index) => (
              <li key={index}>{occupation}</li>
            ))}
            </ul>
            <h3>Breaking Bad appearance</h3>        
            <ul>
            {characterState.appearance && characterState.appearance.map((season, index) => (
              <Link to={`/seasons/BreakingBad/${season}`}><li key={index}>Season {season}</li></Link>
            ))}
            </ul>
            <h3>Better Call Saul appearance</h3>        
            <ul>
            {characterState.better_call_saul_appearance && characterState.better_call_saul_appearance.map((season, index) => (
              <Link to={`/seasons/BetterCallSaul/${season}`}><li key={index}>Season {season}</li></Link>
            ))}
            </ul>
            <h3>Quotes</h3>        
            <ul>
            {quotesState && quotesState.map((quote, index) => (
              <li key={index}>"{quote.quote}"<br/>In {quote.series}</li>
            ))}
            </ul>
          </div>
    </div>
  );
}