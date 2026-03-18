import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // 1. Импортируем axios

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleRegister = async (e) => { // 2. Добавляем async
    e.preventDefault();
    
    try {
      // 3. Отправляем данные на твой бэкенд (порт 5001)
      const response = await axios.post('http://localhost:5001/api/users/register', formData);
      
      // 4. Если сервер ответил успешно (статус 201)
      console.log('Ответ сервера:', response.data);
      
      // Сохраняем токен, который прислал сервер (нужно для авторизации)
      localStorage.setItem('token', response.data.token);
      
      alert('Регистрация успешна! Данные в MongoDB.');
      navigate('/login'); 
      
    } catch (error) {
      // Обработка ошибок (например, если такой email уже есть)
      console.error('Ошибка интеграции:', error.response?.data);
      alert(error.response?.data?.message || 'Ошибка при регистрации');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Регистрация</h2>
        <form className="auth-form" onSubmit={handleRegister}>
          <input 
            type="text" 
            placeholder="Имя" 
            required 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
          />
          <input 
            type="email" 
            placeholder="Email" 
            required 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
          />
          <input 
            type="password" 
            placeholder="Пароль" 
            required 
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})} 
          />
          <button type="submit" className="auth-btn">Создать аккаунт</button>
        </form>
      </div>
    </div>
  );
}