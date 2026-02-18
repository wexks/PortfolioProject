import "../styles/about.css";
import myPhoto from "../assets/me2.jpg";

export default function About() {
  return (
    <section className="about">
      <div className="about-hero">
        <div className="about-photo">
          <img src={myPhoto} alt="My Photo" />
        </div>

        <div className="about-info">
          <h1>Обо мне</h1>
          <p>
            Привет 👋 Меня зовут Айым. Я начинающий Frontend-разработчик,
            изучаю React и JavaScript.
          </p>
          <p>
            Моя цель — стать профессиональным разработчиком и работать
            над международными проектами.
          </p>
        </div>
      </div>

      <section className="about-windows">
        <div className="window-card">
          <h3>О себе</h3>
          <p>Я люблю изучать новые технологии, экспериментировать с дизайном и создавать удобные интерфейсы.</p>
        </div>

        <div className="window-card">
          <h3>Мои цели</h3>
          <p>Стать профессиональным Frontend-разработчиком и работать над международными проектами с командой единомышленников.</p>
        </div>

        <div className="window-card">
          <h3>Хобби</h3>
          <p>Я увлекаюсь рисованием, путешествиями и изучением английского языка.</p>
        </div>
      </section>
    </section>
  );
}
