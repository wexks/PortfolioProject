import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // 1. Импортируем axios

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext); // Это функция из твоего контекста
  const navigate = useNavigate();

  const handleSubmit = async (e) => { // 2. Добавляем async
    e.preventDefault();

    try {
      // 3. Делаем запрос на бэкенд (порт 5001)
      const response = await axios.post('http://localhost:5001/api/users/login', {
        email,
        password
      });

      // 4. Если всё успешно, сервер пришлет { token, user } (или только token)
      const data = response.data;
      
      // Сохраняем токен для будущих запросов к проектам
      localStorage.setItem('token', data.token);

      // Вызываем функцию логина из контекста, чтобы приложение "узнало" юзера
      login(data.user || { email }); 
      
      alert('Вход выполнен успешно!');
      navigate('/profile'); 
      
    } catch (error) {
      // 5. Обработка ошибок (неверный пароль или email)
      console.error('Ошибка входа:', error.response?.data);
      alert(error.response?.data?.message || 'Неверный email или пароль');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Вход</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Пароль"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="auth-btn">Войти</button>
        </form>
      </div>
    </div>
  );
}