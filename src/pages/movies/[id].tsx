import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getMovieById, addFavoriteMovie } from "../../api/movieApi";

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: auto;
`;

const Poster = styled.img`
  width: 100%;
  max-width: 300px;
  border-radius: 10px;
  display: block;
  margin-bottom: 16px;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin: 16px 0;
`;

const Rating = styled.p`
  font-size: 1rem;
  color: #ffb400;
  margin-bottom: 12px;
`;

const Description = styled.p`
  font-size: 1rem;
  line-height: 1.5;
`;

const FavoriteButton = styled.button`
  margin-top: 12px;
  padding: 8px 16px;
  background-color: #ff4d6d;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const MovieDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchMovie = async () => {
      try {
        const data = await getMovieById(id as string);
        setMovie(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch movie");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const handleFavorite = async () => {
    if (!movie) return;
    try {
      await addFavoriteMovie(movie.id);
      alert("Added to favorites!");
    } catch (err: any) {
      alert(err.message || "Failed to add favorite");
    }
  };

  if (loading) return <p>Loading movie details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container>
      <Poster src={movie.poster_path} alt={movie.title} />
      <Title>{movie.title}</Title>
      <Rating>⭐ {movie.vote_average}</Rating>
      <Description>{movie.overview}</Description>
      <FavoriteButton onClick={handleFavorite}>Add to Favorites</FavoriteButton>
    </Container>
  );
};

export default MovieDetail;
