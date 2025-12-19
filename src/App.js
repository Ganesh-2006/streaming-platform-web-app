import React, { useState } from 'react';
import avengers from './avengers.jpg';
import starwars from './starwars.webp';
import missionImp from './mission imp.jpg';
import inception from './inception.jpg';
import interstellar from './interstellar.jpg';
import conjuring from './conjuring.jpg';
import darkKnight from './dark knight.jpg';
import joker from './joker.jpg';
import toyStory from './toy story.webp';
import coco from './coco.jpg';
import lionKing from './the lion king.jpg';
import frozen from './frozen.jpg';
import blackPanther from './black panther.jpg';
import posterImg from './poster.jpg';
import search from './search.png';

const API_KEY = 'b8563a0d';
const BASE_URL = 'https://www.omdbapi.com/';

const Card = ({ title,image }) => {
  const [like, setLike] = useState("");
  const toggleLike = () => {
    setLike(like ? "" : "❤️");
  }
  const handleImgError = (e) => {
    e.target.onerror = null;
    e.target.src = '/logo192.png';
  };

  return (
    <div className="card">
      <img src={image} alt={title} className="cardimage" onError={handleImgError} />
      <div className="cardFooter">
        <h2>{title}</h2>
        <button className="button" onClick={toggleLike}>
          {like ? '❤️' : '🩶'}
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const[noResults,setNoResults]=useState(false);
  const[searched,setSearched]=useState(false);

  const fetchMovies = async (searchQuery) => {
    const trquery = searchQuery.trim();
    if(trquery.trim() === '') {
      setResults([]);
      setNoResults(false);
      setSearched(false);
      return;
    }
    setSearched(true);
    try {
        const response = await fetch(`${BASE_URL}?s=${encodeURIComponent(trquery)}&apikey=${API_KEY}`);
      const data = await response.json();
      console.log(data);
      if (data.Response === "True") {
        setResults(data.Search);
        setNoResults(false);
      } else {
        setResults([]);
        setNoResults(true);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setResults([]);
      setNoResults(true);
    }
  };

  return (
    <div>
      <div className="poster" style={{ backgroundImage: `url(${posterImg})` }}></div>
      <div className="container">
        <div className="searchContainer">
          <input className="searchBar" type="text" 
            placeholder="Search your movie here"
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
            onKeyDown={(e)=>{
              if(e.key==='Enter'){
                fetchMovies(query);
              }
            }}/>
          <button className="searchButton" onClick={() => fetchMovies(query)}>
            <img src={search} />
          </button>
        </div>
        <h1>Popular Movies</h1>
        <div className="movieName">
          {
            results.length > 0 &&  results.map((movie) => (
              <Card key={movie.imdbID} 
                    title={movie.Title} 
                    image={movie.Poster !== "N/A" ? movie.Poster : '/logo192.png'}
              />
            )) }
            {searched && noResults &&(
            <h2 style={{color:"red",marginTop:"20px"}}>
              😢 Oops! No movies found for "{query}"
              </h2>
          )}
          {!searched && results.length===0 && (
          <>
          <Card title="Avengers" image={avengers} />
          <Card title="Star Wars" image={starwars} />
          <Card title="Mission Impossible" image={missionImp} />
          <Card title="Inception" image={inception} />
          <Card title="Interstellar" image={interstellar} />
          <Card title="The Conjuring Last Rites" image={conjuring} />
          <Card title="The Dark Knight" image={darkKnight} />
          <Card title="Joker" image={joker} />
          <Card title="Toy Story" image={toyStory} />
          <Card title="Coco" image={coco} />
          <Card title="The Lion King" image={lionKing} />
          <Card title="Frozen" image={frozen} />
          <Card title="Black Panther" image={blackPanther} />
          </>
        )}
        </div>
      </div>
    </div>
  );
};

export default App;