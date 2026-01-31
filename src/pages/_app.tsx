// src/pages/_app.tsx
import type { AppProps } from "next/app";
import Link from "next/link";
import { createGlobalStyle, ThemeProvider as StyledThemeProvider } from "styled-components";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import styled from "styled-components";

/* ---------------- Global Styles ---------------- */
const GlobalStyle = createGlobalStyle`
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

  button {
    cursor: pointer;
  }

  input {
    padding: 6px 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
`;

/* ---------------- Theme Colors ---------------- */
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

/* ---------------- App Layout ---------------- */
function AppLayout({ Component, pageProps }: AppProps) {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <StyledThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Navbar>
        <NavLeft>
          <Link href="/">Home</Link>
          <Link href="/favorites">Favorites</Link>
        </NavLeft>
        <NavRight>
          <button onClick={toggleTheme}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </NavRight>
      </Navbar>
      <Component {...pageProps} />
    </StyledThemeProvider>
  );
}

/* ---------------- Exported App ---------------- */
export default function App(props: AppProps) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppLayout {...props} />
      </ThemeProvider>
    </AuthProvider>
  );
}

/* ---------------- Styled Components ---------------- */
const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background-color: ${({ theme }) => theme.navBg};
  border-bottom: 1px solid ${({ theme }) => theme.navBorder};
`;

const NavLeft = styled.div`
  display: flex;
  gap: 16px;
  font-weight: bold;
`;

const NavRight = styled.div`
  button {
    padding: 6px 12px;
    border-radius: 4px;
    border: none;
    background-color: #ff4d6d;
    color: white;
    cursor: pointer;
    &:hover {
      opacity: 0.85;
    }
  }
`;
