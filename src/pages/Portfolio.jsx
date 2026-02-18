import React from "react";
import "../styles/portfolio.css";

export default function Portfolio() {
  return (
    <section className="portfolio">
      <h1 className="portfolio-title">Мои проекты</h1>

      <div className="projects-container">
        <div className="project-card coming-soon">
          <h2>Скоро здесь будут проекты 🚀</h2>
          <p>Я работаю над новыми проектами и скоро добавлю их сюда!</p>
        </div>
      </div>
    </section>
  );
}
