import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/profile.css";

export default function Profile() {
  const { user, logout } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="profile-empty">
        <p>Вы не авторизованы. Пожалуйста, войдите или зарегистрируйтесь.</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2>Это ваш профиль</h2>
        <p>Имя: {user.name}</p>
        <p>📧 Почта: {user.email}</p>

        <button className="btn-logout" onClick={logout}>
          Выйти
        </button>
      </div>
    </div>
  );
}
