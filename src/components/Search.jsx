import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export const Search = (props) => {
  console.log("PROPS.name:", props.name);
  // const { searchname } = useParams();
  const [characterState, setCharacterState] = useState();
  const [nextCharacterState, setNextCharacterState] = useState();
  // const [searchNameState, setSearchNameState] = useState(searchname);
  // console.log("params:", searchname);
  // console.log("searchNameState:", searchNameState);
  const [pageState, setPageState] = useState(1);
  // console.log(searchname);
  useEffect(() => {
    fetch(`https://tarea-1-breaking-bad.herokuapp.com/api/characters?name=${props.name}&offset=${(pageState-1)*10}`)
      .then(response => response.json())
      .then(result => setCharacterState(result));
  }, [pageState, props.name])
  useEffect(() => {
    fetch(`https://tarea-1-breaking-bad.herokuapp.com/api/characters?name=${props.name}&offset=${(pageState)*10}`)
      .then(response => response.json())
      .then(result => setNextCharacterState(result));
  }, [pageState, props.name])
  useEffect(()=>{
    setPageState(1)
  }, [props.name])
  // console.log("pageState", pageState);
  console.log("characterState", characterState);
  if (nextCharacterState) console.log("nextCharacterState", nextCharacterState);
  if (characterState) console.log("compare", characterState.length >= 0);

  if (!characterState || !nextCharacterState) return (<p>procesando</p>);
  return (
    <div className="season">
          <div className="seriesColumn">
            <h2>Results</h2>
            <ul className="charactersList">
            {characterState.map((character, index) => (
              <Link to={`/characters/${character.name.split(" ").join("+")}`}><li key={index}>{character.name}</li></Link>
            ))}
            </ul>
            <p>page {pageState}</p>
            <div id="paginate">
              {pageState > 1 && <button onClick={() => setPageState(pageState - 1)}>Anterior</button>}
              {((nextCharacterState.length != 0) && (characterState.length > 1)) && <button onClick={() => setPageState(pageState + 1)}>Siguiente</button>}
            </div>
          </div>
    </div>
  );
}