import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getMovieById, addFavoriteMovie } from "../../api/movieApi";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

const MovieDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchMovie = async () => {
      try {
        const data = await getMovieById(id as string);
        setMovie(data);
      } catch (err: any) {
        setError("Failed to load movie details");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const handleFavorite = async () => {
    try {
      await addFavoriteMovie(movie!.id);
      alert("Added to favorites!");
    } catch {
      alert("You must be logged in to favorite a movie");
    }
  };

  if (loading) return <Skeleton />;
  if (error) return <ErrorBox>{error}</ErrorBox>;
  if (!movie) return null;

  return (
    <Container>
      <Poster src={movie.poster_path} alt={movie.title} />

      <Content>
        <h1>{movie.title}</h1>
        <Rating>⭐ {movie.vote_average}</Rating>
        <Release>Release Date: {movie.release_date}</Release>
        <p>{movie.overview}</p>

        <FavoriteButton onClick={handleFavorite}>
          ❤️ Add to Favorites
        </FavoriteButton>
      </Content>
    </Container>
  );
};

export default MovieDetails;

/* ---------------- Styled Components ---------------- */

const Container = styled.div`
  display: flex;
  gap: 24px;
  padding: 24px;
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Poster = styled.img`
  width: 300px;
  border-radius: 12px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Content = styled.div`
  flex: 1;
`;

const Rating = styled.div`
  font-size: 1.1rem;
  margin: 8px 0;
  color: #ffb400;
`;

const Release = styled.div`
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 16px;
`;

const FavoriteButton = styled.button`
  margin-top: 16px;
  padding: 10px 16px;
  font-size: 1rem;
  background-color: #ff4d6d;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    opacity: 0.85;
  }
`;

const ErrorBox = styled.div`
  padding: 40px;
  text-align: center;
  color: red;
`;

const Skeleton = styled.div`
  height: 60vh;
  margin: 40px;
  border-radius: 12px;
  background: linear-gradient(
    90deg,
    #eee 25%,
    #ddd 37%,
    #eee 63%
  );
  animation: shimmer 1.4s infinite;

  @keyframes shimmer {
    0% {
      background-position: -400px 0;
    }
    100% {
      background-position: 400px 0;
    }
  }
`;
