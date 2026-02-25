import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = e => setForm({...form, [e.target.name]: e.target.value});

  const onSubmit = async e => {
    e.preventDefault(); setError('');
    if (form.password.length < 6) { setError('Пароль минимум 6 символов'); return; }
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate('/');
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') setError('Email уже зарегистрирован');
      else setError('Ошибка регистрации. Попробуйте снова.');
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <img src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1400" alt="" />
        <div className="auth-veil" />
      </div>
      <div className="auth-wrap">
        <div className="auth-card au">
          <Link to="/" className="auth-logo">◈ SPORTSCAR <span className="red">BK</span></Link>
          <h1 className="auth-h">Регистрация</h1>
          <p className="auth-sub muted">Создайте аккаунт, чтобы начать</p>

          <form onSubmit={onSubmit} className="auth-form">
            {error && <div className="err-box">{error}</div>}
            <div className="fg">
              <label>Ваше имя</label>
              <input className="input" type="text" name="name" placeholder="Арман Бекович" value={form.name} onChange={onChange} required />
            </div>
            <div className="fg">
              <label>Email</label>
              <input className="input" type="email" name="email" placeholder="you@example.com" value={form.email} onChange={onChange} required />
            </div>
            <div className="fg">
              <label>Пароль</label>
              <input className="input" type="password" name="password" placeholder="Минимум 6 символов" value={form.password} onChange={onChange} required />
            </div>
            <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
              {loading ? <><div className="spinner spinner-sm"/> Создание...</> : 'Создать аккаунт'}
            </button>
          </form>

          <p className="auth-foot">Уже есть аккаунт? <Link to="/login">Войти</Link></p>
        </div>
      </div>
    </div>
  );
}
