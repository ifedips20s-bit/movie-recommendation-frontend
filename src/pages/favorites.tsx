// src/pages/favorites.tsx
import { useEffect, useState } from "react";
import styled from "styled-components";
import MovieCard from "@/components/MovieCard";
import { getFavoriteMovies } from "@/services/movies"; // ensure this uses JWT token internally
import { useAuth } from "@/context/AuthContext";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
  margin-top: 20px;
`;

export default function FavoritesPage() {
  const { token, isAuthenticated, logout } = useAuth();
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    const fetchFavorites = async () => {
      try {
        const data = await getFavoriteMovies(token); // pass JWT
        setMovies(data || []);
      } catch (err) {
        setError("Failed to load favorites");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [isAuthenticated, token]);

  if (!isAuthenticated) return <p>You must be logged in to view your favorites.</p>;
  if (loading) return <p>Loading favorites…</p>;
  if (error) return <p>{error}</p>;
  if (movies.length === 0) return <p>You haven’t added any favorites yet.</p>;

  return (
    <div>
      <h1>Your Favorite Movies</h1>
      <button onClick={logout} style={{ marginBottom: "16px" }}>Logout</button>
      <Grid>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster={movie.poster_path}
            rating={movie.vote_average}
          />
        ))}
      </Grid>
    </div>
  );
}
