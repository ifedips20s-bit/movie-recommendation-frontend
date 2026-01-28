import React from "react";
import Head from "next/head";
import styled from "styled-components";
import MoviesDashboard from "../components/MoviesDashboard";

const HomePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Movie Recommendations</title>
        <meta name="description" content="Browse trending and recommended movies" />
      </Head>

      <Container>
        <Header>
          <h1>🎬 Movie Recommendation App</h1>
          <p>Discover trending movies and save your favorites</p>
        </Header>

        <MoviesDashboard />
      </Container>
    </>
  );
};

export default HomePage;

/* ---------------- Styled Components ---------------- */

const Container = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`;

const Header = styled.header`
  margin-bottom: 24px;

  h1 {
    margin: 0;
  }

  p {
    color: #666;
  }
`;
