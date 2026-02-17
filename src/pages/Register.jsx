import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Имитация регистрации: сохраняем данные в localStorage
    localStorage.setItem('user', JSON.stringify(formData)); 
    alert('Регистрация успешна!');
    navigate('/login'); // Переходим на вход
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Регистрация</h2>
        <form className="auth-form" onSubmit={handleRegister}>
          <input type="text" placeholder="Имя" required 
            onChange={(e) => setFormData({...formData, name: e.target.value})} />
          <input type="email" placeholder="Email" required 
            onChange={(e) => setFormData({...formData, email: e.target.value})} />
          <input type="password" placeholder="Пароль" required 
            onChange={(e) => setFormData({...formData, password: e.target.value})} />
          <button type="submit" className="auth-btn">Создать аккаунт</button>
        </form>
      </div>
    </div>
  );
}