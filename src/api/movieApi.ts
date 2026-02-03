import api from "./api";

// Trending movies
export const getTrendingMovies = async (page = 1) => {
  const res = await api.get(`/movies/trending/?page=${page}`);
  return res.data;
};

// Search movies
export const getMovieBySearch = async (query: string, page = 1) => {
  const res = await api.get(`/movies/search/?q=${query}&page=${page}`);
  return res.data;
};

// Movie detail
export const getMovieById = async (id: string) => {
  const res = await api.get(`/movies/${id}/`);
  return res.data;
};

// Add favorite (JWT protected)
export const addFavoriteMovie = async (movieId: number) => {
  const res = await api.post("/movies/favorites/", {
    movie_id: movieId,
  });
  return res.data;
};

// Get favorite movies (JWT protected)
export const getFavoriteMovies = async () => {
  const res = await api.get("/movies/favorites/");
  return res.data;
};
