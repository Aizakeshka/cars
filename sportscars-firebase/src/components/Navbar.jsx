import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const handleLogout = () => { logout(); navigate('/'); setOpen(false); };

  return (
    <nav className={`nav ${scrolled ? 'nav--solid' : ''}`}>
      <div className="nav__inner container">
        <Link to="/" className="nav__logo">
          <span className="nav__logo-gem">◈</span>
          SPORTS<span className="red">CAR</span>
        </Link>

        <div className="nav__links">
          <NavLink to="/" end className={({isActive}) => 'nav__link' + (isActive ? ' nav__link--on' : '')}>Главная</NavLink>
          <NavLink to="/catalog" className={({isActive}) => 'nav__link' + (isActive ? ' nav__link--on' : '')}>Каталог</NavLink>
        </div>

        <div className="nav__auth">
          {user ? (
            <>
              <Link to="/profile" className="nav__user">
                <div className="nav__ava">{user.name[0].toUpperCase()}</div>
                <span>{user.name}</span>
              </Link>
              <button onClick={handleLogout} className="btn btn-secondary btn-sm">Выйти</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost btn-sm">Войти</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Регистрация</Link>
            </>
          )}
        </div>

        <button className="nav__burger" onClick={() => setOpen(!open)} aria-label="menu">
          <span className={open ? 'x' : ''} /><span className={open ? 'x' : ''} /><span className={open ? 'x' : ''} />
        </button>
      </div>

      {open && (
        <div className="nav__mobile">
          <Link to="/" onClick={() => setOpen(false)}>Главная</Link>
          <Link to="/catalog" onClick={() => setOpen(false)}>Каталог</Link>
          {user ? (
            <>
              <Link to="/profile" onClick={() => setOpen(false)}>Профиль</Link>
              <button onClick={handleLogout}>Выйти</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)}>Войти</Link>
              <Link to="/register" onClick={() => setOpen(false)}>Регистрация</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
