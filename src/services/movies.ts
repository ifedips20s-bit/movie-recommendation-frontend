// services/movies.ts
import api from "./api"; // Axios instance for JWT-protected requests

const BASE_URL = "http://127.0.0.1:8000/api/movies";

// Public API calls (no JWT needed)
export const getTrendingMovies = async (page = 1) => {
  const res = await fetch(`${BASE_URL}/trending/?page=${page}`);
  return res.json();
};

export const getMovieBySearch = async (query: string, page = 1) => {
  const res = await fetch(`${BASE_URL}/search/?q=${query}&page=${page}`);
  return res.json();
};

export const getMovieById = async (id: string | number) => {
  const res = await fetch(`${BASE_URL}/${id}/`);
  return res.json();
};

// JWT-protected API calls (require auth)
export const getRecommendedMovies = async () => {
  const response = await api.get("/movies/recommended/");
  return response.data;
};

export const getFavoriteMovies = async () => {
  const response = await api.get("/movies/favorites/");
  return response.data;
};

export const addFavoriteMovie = async (movieId: number) => {
  const response = await api.post("/movies/favorites/", { movie_id: movieId });
  return response.data;
};

export const removeFavoriteMovie = async (movieId: number) => {
  const response = await api.delete(`/movies/favorites/${movieId}/`);
  return response.data;
};
