import axios from "axios";

// const getTrendingMovies = () => {
    // /trending/movie/day?language=en-US'
    //https://api.themoviedb.org/3/movie/upcoming
    // https://api.themoviedb.org/3/movie/top_rated
// }

export const image500 = path => path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = path => path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = path => path ? `https://image.tmdb.org/t/p/w185${path}` : null
export const getTrendingMovie = async () => {
    const url = `${process.env.MOVIEENDPOINT}/trending/movie/day`;

    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${process.env.MOVIEWDBAPIREADTOKEN}`
        }
    })

    
    return Promise.resolve(response.data);
}

export const getUpcomingMovies = async () => {
    const url = `${process.env.MOVIEENDPOINT}/movie/upcoming`;
    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${process.env.MOVIEWDBAPIREADTOKEN}`
        }
    })

    return Promise.resolve(response.data);
}

export const getTopRatedMovies = async () => {
    const url = `${process.env.MOVIEENDPOINT}/movie/top_rated`;
    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${process.env.MOVIEWDBAPIREADTOKEN}`
        }
    })

    return Promise.resolve(response.data);
}

export const getMovieDetails = async (movie_id) => {
    const url = `${process.env.MOVIEENDPOINT}/movie/${movie_id}`;

    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${process.env.MOVIEWDBAPIREADTOKEN}`
        }
    })

    return Promise.resolve(response.data);
}

export const getMovieCredits = async (movie_id) => {
    const url = `${process.env.MOVIEENDPOINT}/movie/${movie_id}/credits`;

    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${process.env.MOVIEWDBAPIREADTOKEN}`
        }
    })

    return Promise.resolve(response.data);
}

export const getSimilarMovies = async (movie_id) => {
    const url = `${process.env.MOVIEENDPOINT}/movie/${movie_id}/similar`;

    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${process.env.MOVIEWDBAPIREADTOKEN}`
        }
    })

    return Promise.resolve(response.data);
}

export const getMovieSearch = async (movieName) => {
    const url = `${process.env.MOVIEENDPOINT}/search/movie?query=${movieName}`;

    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${process.env.MOVIEWDBAPIREADTOKEN}`
        }
    })

    return Promise.resolve(response.data);
}

export const getPerson = async (person_id) => {
    const url = `${process.env.MOVIEENDPOINT}/person/${person_id}`;

    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${process.env.MOVIEWDBAPIREADTOKEN}`
        }
    })

    return Promise.resolve(response.data);
}

export const getPersonMovieCredits = async (person_id) => {
    const url = `${process.env.MOVIEENDPOINT}/person/${person_id}/credits`;

    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${process.env.MOVIEWDBAPIREADTOKEN}`
        }
    })

    return Promise.resolve(response.data);
}