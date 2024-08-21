import axios from "axios";

export const imagePath = "https://image.tmdb.org/t/p/w500";
export const imagePathOriginal = "https://image.tmdb.org/t/p/original";

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_API_KEY;

// TRENDING
export const fetchTrending = async (timeWindow = 'day') => {
    const { data } = await axios.get(`${baseUrl}/trending/all/${timeWindow}?api_key=${apiKey}`);
    return data?.results;
};

// MOVIES & SERIES - Details
export const fetchDetails = async (type, id) => {
    const res = await axios.get(`${baseUrl}/${type}/${id}?api_key=${apiKey}`);
    return res?.data;
};

// MOVIES & SERIES - Credits
export const fetchCredits = async (type, id) => {
    const res = await axios.get(`${baseUrl}/${type}/${id}/credits?api_key=${apiKey}`);
    return res?.data;
};

// MOVIES & SERIES - Videos
export const fetchVideos = async (type, id) => {
    const res = await axios.get(`${baseUrl}/${type}/${id}/videos?api_key=${apiKey}`);
    return res?.data;
};

// DISCOVER
export const fetchMovies = async (page, sortBy) => {
    const res = await axios.get(
      `${baseUrl}/discover/movie?api_key=${apiKey}&page=${page}&sort_by=${sortBy}`
    );
    return res?.data;
  };

export const fetchTvSeries = async (page, sortBy) => {
    const res = await axios.get(`${baseUrl}/discover/tv?api_key=${apiKey}&page=${page}&sort_by=${sortBy}`);
    return res?.data;
};

// SEARCH
export const searchData = async (query, page) => {
    const res = await axios.get(`${baseUrl}/search/multi?api_key=${apiKey}&query=${query}&page=${page}`);
    return res?.data;
};

// CAST - Details
export const fetchCastDetail = async (id) => {
    const res = await axios.get(`${baseUrl}/person/${id}?api_key=${apiKey}`);
    return res?.data;
};

// CAST - Movies
export const fetchCastMovies = async (id, page = 1) => {
    const res = await axios.get(`${baseUrl}/person/${id}/movie_credits?api_key=${apiKey}&page=${page}`);
    return res?.data;
};


// CAST - Images
export const fetchCastImages = async (id) => {
    const res = await axios.get(`${baseUrl}/person/${id}/images?api_key=${apiKey}`);
    return res?.data;
};

// COLLECTION - Images
export const fetchCollectionImages = async (collectionId) => {
    const res = await axios.get(`${baseUrl}/collection/${collectionId}/images?api_key=${apiKey}`);
    return res?.data;
};

// MOVIE - Images
export const fetchMovieImages = async (id) => {
    const res = await axios.get(`${baseUrl}/movie/${id}/images?api_key=${apiKey}`);
    return res?.data;
};

// TV SHOW - Images
export const fetchTvImages = async (id) => {
    const res = await axios.get(`${baseUrl}/tv/${id}/images?api_key=${apiKey}`);
    return res?.data;
};

