import { useState, useEffect } from "react";
import myPhoto from "../assets/me1.jpg";

export default function Home() {
  // 1. Начальные данные (если в памяти браузера еще ничего нет)
  const defaultSkills = [
    { id: 1, title: "React", desc: "Компоненты, props, useState, useEffect" },
    { id: 2, title: "React Router", desc: "Страницы, навигация, защищённые маршруты" },
    { id: 3, title: "LocalStorage", desc: "Регистрация, вход, сохранение сессии" }
  ];

  // 2. Стейт для навыков (загружаем из localStorage)
  const [skills, setSkills] = useState(() => {
    const saved = localStorage.getItem("my-skills-data");
    return saved ? JSON.parse(saved) : defaultSkills;
  });

  const [editingId, setEditingId] = useState(null);

  // 3. Сохраняем в localStorage при каждом изменении
  useEffect(() => {
    localStorage.setItem("my-skills-data", JSON.stringify(skills));
  }, [skills]);

  // Функция для обновления текста конкретного навыка
  const updateSkill = (id, field, value) => {
    setSkills(skills.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  return (
    <div className="page-content">
      <div className="hero">
        <div className="hero-photo">
          <img src={myPhoto} alt="Айым Оспанова" />
        </div>

        <div className="hero-content">
          <h1 className="hero-name">Айым Оспанова</h1>
          <p className="hero-text">
            Я начинающий Frontend-разработчик. Создаю сайты на React и делаю их удобными и красивыми для пользователей.
          </p>

          <div className="hero-actions">
            <a className="btn btn-primary" href="/portfolio">Смотреть проекты</a>
            <a className="btn btn-light" href="/about">Обо мне</a>
          </div>
        </div>
      </div>

      <section className="section">
        <h2 className="section-title">Мои навыки</h2>

        <div className="cards">
          {skills.map((skill) => (
            <div className="card" key={skill.id} style={{ cursor: "pointer", position: "relative" }}>
              {editingId === skill.id ? (
                // РЕЖИМ РЕДАКТИРОВАНИЯ
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <input
                    style={{ padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
                    value={skill.title}
                    onChange={(e) => updateSkill(skill.id, "title", e.target.value)}
                  />
                  <textarea
                    style={{ padding: "5px", borderRadius: "5px", border: "1px solid #ccc", minHeight: "60px" }}
                    value={skill.desc}
                    onChange={(e) => updateSkill(skill.id, "desc", e.target.value)}
                  />
                  <button 
                    onClick={() => setEditingId(null)}
                    style={{ background: "#00b894", color: "#fff", border: "none", padding: "5px", borderRadius: "5px", cursor: "pointer" }}
                  >
                    Готово
                  </button>
                </div>
              ) : (
                // ОБЫЧНЫЙ ВИД (нажми, чтобы начать править)
                <div onClick={() => setEditingId(skill.id)}>
                  <h3>{skill.title}</h3>
                  <p>{skill.desc}</p>
                  <span style={{ fontSize: "10px", color: "#ccc", position: "absolute", bottom: "5px", right: "10px" }}>
                    Нажми для правки
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
