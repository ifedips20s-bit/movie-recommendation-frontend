// src/pages/favorites.tsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getFavoriteMovies, addFavoriteMovie } from "../api/movieApi";
import MovieCard from "../components/MovieCard";

const FavoritesPage: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await getFavoriteMovies(); // no token needed
        setMovies(data || []);
      } catch (err: any) {
        setError("Failed to load favorites");
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  const handleAddFavorite = async (id: number) => {
    try {
      await addFavoriteMovie(id);
      alert("Added to favorites!");
    } catch (err: any) {
      alert(err.message || "Failed to add favorite");
    }
  };

  if (loading) return <Message>Loading your favorite movies...</Message>;
  if (error) return <Message>{error}</Message>;
  if (movies.length === 0) return <Message>No favorites yet!</Message>;

  return (
    <Container>
      <h2>Your Favorites</h2>
      <Grid>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster={movie.poster_path}
            rating={movie.vote_average}
            onFavorite={handleAddFavorite}
          />
        ))}
      </Grid>
    </Container>
  );
};

export default FavoritesPage;

/* ---------------- Styled Components ---------------- */

const Container = styled.div`
  padding: 16px;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const Message = styled.p`
  padding: 20px;
  text-align: center;
  font-size: 1rem;
`;
