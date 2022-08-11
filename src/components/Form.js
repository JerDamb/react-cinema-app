import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";

const Form = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [search, setSearch] = useState("a");
  // Quand le composant est monté lance tout ce qui est dans useEffect,
  // et les [] servent a rajouter une condition de relance de la fonction (callback)
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=7d94ddd67c0351df6cee4a2ad2c4afda&query=${search}&language=fr-FR&include_adult=true`
      )
      .then((res) => setMoviesData(res.data.results));
  }, [search]);
  return (
    <div className="form-component">
      <div className="form-container">
        <form>
          <input
            type="text"
            placeholder="Chercher un film..."
            id="search-input"
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        <div className="btn-sort-container">
          <div className="btn-sort" id="goodToBad">
            Top <span>&#10132;</span>
          </div>
          <div className="btn-sort" id="badToGood">
            Flop <span>&#10132;</span>
          </div>
        </div>
      </div>
      <div className="result">
        {moviesData.slice(0, 24).map((movie) => (
          <Card movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
};

export default Form;
