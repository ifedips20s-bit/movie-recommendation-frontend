import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MovieCard from "./MovieCard";
import { getTrendingMovies, getMovieBySearch, addFavoriteMovie } from "../services/movies"; // single import

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #ff4d6d;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const Input = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  flex: 1;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
`;

const Message = styled.p`
  text-align: center;
  color: #666;
`;

const { darkMode, toggleTheme } = useTheme();
<button onClick={toggleTheme}>
  {darkMode ? "Light Mode" : "Dark Mode"}
</button>


const MoviesDashboard: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      let data;
      if (search.trim()) {
        data = await getMovieBySearch(search, page);
      } else {
        data = await getTrendingMovies(page);
      }
      setMovies(data.results || []);
      setTotalPages(data.total_pages || 1);
      setError("");
    } catch {
      setError("Failed to fetch movies.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [search, page]);

  const handleFavorite = async (id: number) => {
    try {
      await addFavoriteMovie(id);
      alert("Added to favorites!");
    } catch {
      alert("Failed to add favorite");
    }
  };

  return (
    <div>
      <Title>Trending Movies</Title>
      <Controls>
        <Input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={() => setPage((p) => Math.max(p - 1, 1))}>Prev</Button>
        <Button onClick={() => setPage((p) => Math.min(p + 1, totalPages))}>Next</Button>
      </Controls>

      {loading && <Message>Loading movies...</Message>}
      {error && <Message>{error}</Message>}

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
    </div>
  );
};

export default MoviesDashboard;
