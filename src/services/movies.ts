import api from "./api"; // Axios instance

export const getTrendingMovies = async () => {
  const response = await api.get("/movies/trending/");
  return response.data;
};

export const getRecommendedMovies = async () => {
  const response = await api.get("/movies/recommended/"); // requires JWT
  return response.data;
};

export const getFavoriteMovies = async () => {
  const response = await api.get("/movies/favorites/"); // requires JWT
  return response.data;
};

export const addFavoriteMovie = async (movieId: number) => {
  const response = await api.post("/movies/favorites/", { movie_id: movieId }); // requires JWT
  return response.data;
};

export const getMovieById = async (id: string | number) => {
  const response = await api.get(`/movies/${id}/`); // movie detail endpoint
  return response.data;
};
