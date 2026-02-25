import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <div className="footer__logo">◈ SPORTSCAR <span className="red">BK</span></div>
            <p className="footer__tagline">Элитные автомобили в Бишкеке.<br/>Ваша мечта — наша реальность.</p>
          </div>
          <div className="footer__col">
            <h4>Навигация</h4>
            <Link to="/">Главная</Link>
            <Link to="/catalog">Каталог</Link>
            <Link to="/profile">Профиль</Link>
          </div>
          <div className="footer__col">
            <h4>Аккаунт</h4>
            <Link to="/login">Войти</Link>
            <Link to="/register">Регистрация</Link>
          </div>
          <div className="footer__col">
            <h4>Контакты</h4>
            <p>📍 Бишкек, ул. Советская 123</p>
            <p>📞 +996 312 000 000</p>
            <p>✉️ info@sportscars.kg</p>
          </div>
        </div>
        <div className="footer__bottom">© 2024 SportsCar Bishkek. Все права защищены.</div>
      </div>
    </footer>
  );
}