import type { AppProps } from "next/app";
import Link from "next/link";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { useState, useEffect } from "react";
import { AuthProvider } from "@/context/AuthContext";

const GlobalStyle = createGlobalStyle<{ theme: any }>`
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: background-color 0.3s, color 0.3s;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  input {
    padding: 6px 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }

  button {
    cursor: pointer;
  }
`;

const lightTheme = {
  background: "#f5f5f5",
  text: "#222",
  navBg: "#fff",
  navText: "#222",
  navBorder: "#ddd",
};

const darkTheme = {
  background: "#121212",
  text: "#f5f5f5",
  navBg: "#1f1f1f",
  navText: "#f5f5f5",
  navBorder: "#333",
};

export default function App({ Component, pageProps }: AppProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const storedTheme = localStorage.getItem("darkMode");
    if (storedTheme === "true") setDarkMode(true);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      localStorage.setItem("darkMode", String(!prev));
      return !prev;
    });
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Search query:", search);
  };

  return (
    <AuthProvider>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Navbar>
          <NavLeft>
            <Link href="/">Home</Link>
            <Link href="/favorites">Favorites</Link>
          </NavLeft>
          <NavRight>
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search movies..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
            <button onClick={toggleDarkMode}>
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </NavRight>
        </Navbar>
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  );
}

/* ---------------- Styled Components ---------------- */
import styled from "styled-components";

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background-color: ${({ theme }) => theme.navBg};
  color: ${({ theme }) => theme.navText};
  border-bottom: 1px solid ${({ theme }) => theme.navBorder};
`;

const NavLeft = styled.div`
  display: flex;
  gap: 16px;
  font-weight: bold;
`;

const NavRight = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  button {
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    background-color: #ff4d6d;
    color: #fff;
    &:hover {
      opacity: 0.8;
    }
  }
`;
