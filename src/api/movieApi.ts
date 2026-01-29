import api from "./api";

// Trending movies
export const getTrendingMovies = async () => {
  const res = await api.get("/movies/trending/");
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
