// pages/index.tsx
import React, { useState } from "react";
import Head from "next/head";
import styled from "styled-components";
import MovieCard from "@/components/MovieCard";
import { getTrendingMovies, addFavoriteMovie } from "@/services/movies";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 24px;

  h1 {
    margin: 0;
  }
  p {
    color: #666;
  }
`;

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

interface HomeProps {
  initialMovies: Movie[];
  totalPages: number;
}

const Home: React.FC<HomeProps> = ({ initialMovies, totalPages }) => {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFavorite = async (id: number) => {
    try {
      await addFavoriteMovie(id);
      alert("Added to favorites!");
    } catch (err: any) {
      alert(err.message || "Failed to add favorite");
    }
  };

  return (
    <>
      <Head>
        <title>Movie Recommendations</title>
        <meta name="description" content="Browse trending and recommended movies" />
      </Head>

      <Header>
        <h1>🎬 Movie Recommendation App</h1>
        <p>Discover trending movies and save your favorites</p>
      </Header>

      {loading && <p>Loading movies...</p>}
      {error && <p>Error: {error}</p>}

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
    </>
  );
};

export default Home;

// SSR: Fetch trending movies server-side
export const getServerSideProps = async () => {
  try {
    const data = await getTrendingMovies(1); // page 1
    return {
      props: {
        initialMovies: data.results || [],
        totalPages: data.total_pages || 1,
      },
    };
  } catch (err) {
    return { props: { initialMovies: [], totalPages: 1 } };
  }
};
