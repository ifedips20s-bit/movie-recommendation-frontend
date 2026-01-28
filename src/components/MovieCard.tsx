import React from "react";
import styled from "styled-components";
import Link from "next/link";

interface MovieCardProps {
  id: number;
  title: string;
  poster: string;
  rating?: number;
  onFavorite?: (id: number) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ id, title, poster, rating, onFavorite }) => {
  return (
    <Link href={`/movies/${id}`} passHref>
      <Card>
        <Poster src={poster} alt={title} />
        <Info>
          <Title>{title}</Title>
          {rating !== undefined && <Rating>⭐ {rating}</Rating>}
          {onFavorite && (
            <FavoriteButton
              onClick={(e) => {
                e.preventDefault(); // Prevent Link navigation
                onFavorite(id);
              }}
            >
              Add to Favorites
            </FavoriteButton>
          )}
        </Info>
      </Card>
    </Link>
  );
};

export default MovieCard;

/* ---------------- Styled Components ---------------- */

const Card = styled.a`  /* Link wraps it, so use anchor styling */
  display: block;
  width: 180px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  transition: transform 0.2s;
  text-decoration: none;
  color: inherit;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 600px) {
    width: 140px;
  }
`;

const Poster = styled.img`
  width: 100%;
  height: 270px;
  object-fit: cover;

  @media (max-width: 600px) {
    height: 210px;
  }
`;

const Info = styled.div`
  padding: 8px;
`;

const Title = styled.h3`
  font-size: 1rem;
  margin: 0 0 4px 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Rating = styled.span`
  font-size: 0.875rem;
  color: #ffb400;
`;

const FavoriteButton = styled.button`
  margin-top: 6px;
  padding: 4px 8px;
  font-size: 0.75rem;
  background-color: #ff4d6d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;
