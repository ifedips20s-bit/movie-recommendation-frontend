import Link from "next/link";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
  padding: 1rem 2rem;
  background-color: #1a1a1a;
  color: white;
`;

export default function Navbar() {
  return (
    <Nav>
      <Link href="/">Home</Link>
      <Link href="/favorites">Favorites</Link>  {/* <-- This is where the favorites link goes */}
      <Link href="/profile">Profile</Link>
    </Nav>
  );
}
