import React from "react";
import "./App.css";
import SearchIcon from "./SearchIcon.svg";
import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
//fa3fef62

const API_KEY = 'http://www.omdbapi.com/?i=tt3896198&apikey=fa3fef62';

const movie1 = {
     Title: "The Amazing Spiderman T4 Premiere Special",
     Year: "2012",
     imdbID: "tt2233044",
     Type: "movie",
     Poster: "N/A"
    };

const App = () =>{
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title)=>{
        if(title.length > 0){

            const response = await fetch(`${API_KEY}&s=${title}`)
            const data = await response.json();
            if(data.Response === "True"){

                setMovies(data.Search);
            }else{
                setMovies([]);
            }
        }
        
    }

    useEffect(()=>{
        searchMovies("spiderman")
    },[])


    return(
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input placeholder="search for a movie" 
                    value={searchTerm}
                    onChange={(e)=>{setSearchTerm(e.target.value);searchMovies(e.target.value)}}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={()=>{searchMovies(searchTerm)}}
                />
            </div>
            {
                movies.length > 0 ?

                (<div className="container">
                    {movies.map((movie)=> (
                        <MovieCard movie = {movie}/>
                    ))}
                </div>) :

                (<div className="empty">
                    <h3>NO MOVIES FOUND</h3>
                </div>)

            }
        </div>
    );
}
 
export default App;