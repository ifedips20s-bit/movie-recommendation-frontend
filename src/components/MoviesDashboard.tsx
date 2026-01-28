import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MovieCard from "./MovieCard";
import { getTrendingMovies, addFavoriteMovie } from "../api/movieApi";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

const MoviesDashboard: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getTrendingMovies();
        setMovies(data.results ?? data); // works for TMDB-style or custom backend
      } catch (err: any) {
        setError(err.message || "Failed to load movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleFavorite = async (movieId: number) => {
    try {
      await addFavoriteMovie(movieId);
      alert("Movie added to favorites!");
    } catch (err: any) {
      alert(err.message || "Could not add to favorites");
    }
  };

  if (loading) return <Status>Loading movies...</Status>;
  if (error) return <Status>Error: {error}</Status>;

  return (
    <Grid>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          title={movie.title}
          poster={movie.poster_path}
          rating={movie.vote_average}
          onFavorite={handleFavorite}
        />
      ))}
    </Grid>
  );
};

export default MoviesDashboard;

/* ---------------- Styled Components ---------------- */

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
`;

const Status = styled.p`
  text-align: center;
  font-size: 1rem;
  padding: 20px;
`;
