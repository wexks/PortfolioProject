import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>Добро пожаловать в моё Портфолио</h1>
          <p>Познакомьтесь с моими лучшими работами и дизайном</p>
          <div className="hero-btns">
            <Link to="/portfolio" className="btn-primary">Мои работы</Link>
            <Link to="/about" className="btn-secondary">Обо мне</Link>
          </div>
        </div>
      </div>
    </section>
  );
}