import React, { useState, useEffect } from "react";
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

  // Fetch trending movies on mount
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getTrendingMovies();
        setMovies(data.results || []); // Adjust according to backend response
      } catch (err: any) {
        setError(err.message || "Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  // Handle adding favorite
  const handleFavorite = async (id: number) => {
    try {
      await addFavoriteMovie(id);
      alert("Movie added to favorites!");
    } catch (err: any) {
      alert(err.message || "Failed to add favorite movie");
    }
  };

  // Loading or Error States
  if (loading) return <Message>Loading movies...</Message>;
  if (error) return <Message>Error: {error}</Message>;

  return (
    <Dashboard>
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
    </Dashboard>
  );
};

export default MoviesDashboard;

/* ---------------- Styled Components ---------------- */

const Dashboard = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
  padding: 16px;

  @media (max-width: 600px) {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 12px;
    padding: 12px;
  }
`;

const Message = styled.p`
  text-align: center;
  font-size: 1.2rem;
  margin-top: 40px;
`;
