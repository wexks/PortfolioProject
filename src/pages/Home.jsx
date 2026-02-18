import myPhoto from "../assets/me1.jpg";

export default function Home() {
  return (
    <div className="page-content">
      <div className="hero">
        <div className="hero-photo">
          <img
            src={myPhoto}
            alt="Айым Оспанова"
          />
        </div>

        <div className="hero-content">
          <h1 className="hero-name">Айым Оспанова</h1>
          <p className="hero-text">
            Я начинающий Frontend-разработчик. Создаю сайты на React и делаю их удобными и красивыми для пользователей.
          </p>

          <div className="hero-actions">
            <a className="btn btn-primary" href="/portfolio">
              Смотреть проекты
            </a>
            <a className="btn btn-light" href="/about">
              Обо мне
            </a>
          </div>
        </div>
      </div>

      <section className="section">
        <h2 className="section-title">Мои навыки</h2>

        <div className="cards">
          <div className="card">
            <h3>React</h3>
            <p>Компоненты, props, useState, useEffect</p>
          </div>

          <div className="card">
            <h3>React Router</h3>
            <p>Страницы, навигация, защищённые маршруты</p>
          </div>

          <div className="card">
            <h3>LocalStorage</h3>
            <p>Регистрация, вход, сохранение сессии</p>
          </div>
        </div>
      </section>
    </div>
  );
}
