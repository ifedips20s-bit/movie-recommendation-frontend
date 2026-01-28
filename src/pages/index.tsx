import { useEffect, useState } from "react";
import styled from "styled-components";
import MovieCard from "../components/MovieCard";
import { getTrendingMovies } from "../services/movies";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
  padding: 16px;
`;

export default function Home() {
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getTrendingMovies();
      setMovies(data.results || []); // adjust based on your backend response
    };
    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Trending Movies</h1>
      <Grid>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster={movie.poster_path} // adjust if your backend returns full URL
            rating={movie.rating}
            onFavorite={(id) => console.log("Add to favorite:", id)}
          />
        ))}
      </Grid>
    </div>
  );
}
