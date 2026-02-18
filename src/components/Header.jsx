import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <nav className="nav-inner">
        <Link to="/">Главная</Link>
        <Link to="/about">Обо мне</Link>
        <Link to="/portfolio">Портфолио</Link>
        <Link to="/profile">Профиль</Link>
        <Link to="/login">Вход</Link>
        <Link to="/register">Регистрация</Link>
      </nav>
    </header>
  );
}
