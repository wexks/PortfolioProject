import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    // базовая валидация 
    if (formData.password.length < 6) {
      setError('Пароль должен быть не менее 6 символов');
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        'http://https://portfolioproject-production-7c32.up.railway.app/api/users/register',
        formData
      );

      // сохраняем токен
      localStorage.setItem('token', response.data.token);

      setSuccess('Регистрация успешна');

      // сразу кидаем в профиль 
      setTimeout(() => {
        navigate('/profile');
      }, 1000);

    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка при регистрации');
    } finally {
      setLoading(false);
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
            onChange={(e) =>
              setFormData(prev => ({ ...prev, name: e.target.value }))
            }
          />

          <input
            type="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData(prev => ({ ...prev, email: e.target.value }))
            }
          />

          <input
            type="password"
            placeholder="Пароль"
            required
            value={formData.password}
            onChange={(e) =>
              setFormData(prev => ({ ...prev, password: e.target.value }))
            }
          />

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Загрузка...' : 'Создать аккаунт'}
          </button>
        </form>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
      </div>
    </div>
  );
}
