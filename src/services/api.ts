import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export const getTrendingMovies = () =>
  api.get("/movies/trending/");

export const getRecommendedMovies = (token: string) =>
  api.get("/movies/recommended/", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getFavorites = (token: string) =>
  api.get("/movies/favorites/", {
    headers: { Authorization: `Bearer ${token}` },
  });

export default api;
