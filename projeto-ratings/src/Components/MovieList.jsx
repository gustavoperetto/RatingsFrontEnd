'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MoviesList() {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getMovies();
    }, []);

    const getMovies = () => {
        axios({
            method: 'GET',
            url: 'https://api.themoviedb.org/3/discover/movie',
            params: {
                language: 'en_US',
            }
        }).then(response => {
            setMovies(response.data.results);
        })
    }

    return (
        <div>
            <div>
                <ul className='movie-list'>
                    {movies.map((movie) => 
                        <li></li>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default MoviesList;