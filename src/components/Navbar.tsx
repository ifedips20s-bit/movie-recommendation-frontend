import Link from "next/link";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
  padding: 1rem 2rem;
  background-color: #1a1a1a;
  color: white;
`;

export default function Navbar() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is signed in
    setToken(localStorage.getItem("access_token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setToken(null);
    router.push("/"); // redirect to home after logout
  };

  return (
    <Nav>
      <Link href="/">Home</Link>
      <Link href="/favorites">Favorites</Link>

      {!token ? (
        <Link href="/login">Sign In</Link>
      ) : (
        <button
          style={{
            background: "none",
            border: "1px solid white",
            color: "white",
            padding: "0.25rem 0.5rem",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={handleLogout}
        >
          Logout
        </button>
      )}
    </Nav>
  );
}
