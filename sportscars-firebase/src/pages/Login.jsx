import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = e => setForm({...form, [e.target.name]: e.target.value});

  const onSubmit = async e => {
    e.preventDefault(); setError(''); setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      setError('Неверный email или пароль');
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400" alt="" />
        <div className="auth-veil" />
      </div>
      <div className="auth-wrap">
        <div className="auth-card au">
          <Link to="/" className="auth-logo">◈ SPORTSCAR <span className="red">BK</span></Link>
          <h1 className="auth-h">Войти</h1>
          <p className="auth-sub muted">Добро пожаловать обратно</p>

          <form onSubmit={onSubmit} className="auth-form">
            {error && <div className="err-box">{error}</div>}
            <div className="fg">
              <label>Email</label>
              <input className="input" type="email" name="email" placeholder="you@example.com" value={form.email} onChange={onChange} required />
            </div>
            <div className="fg">
              <label>Пароль</label>
              <input className="input" type="password" name="password" placeholder="••••••••" value={form.password} onChange={onChange} required />
            </div>
            <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
              {loading ? <><div className="spinner spinner-sm"/> Вход...</> : 'Войти'}
            </button>
          </form>

          <p className="auth-foot">Нет аккаунта? <Link to="/register">Зарегистрироваться</Link></p>
        </div>
      </div>
    </div>
  );
}
