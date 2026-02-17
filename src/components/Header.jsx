import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header style={{ padding: "12px", background: "#880101" }}>
      <nav style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/portfolio">Portfolio</Link>

        <div style={{ marginLeft: "auto", display: "flex", gap: "12px" }}>
          {user ? (
            <>
              <Link to="/profile">Profile</Link>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
