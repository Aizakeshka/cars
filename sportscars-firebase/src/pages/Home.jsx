import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CarCard from '../components/CarCard';
import { CARS } from '../data/carsData';
import './Home.css';

export default function Home() {
  const featured = CARS.slice(0, 3);

  return (
    <div className="home">
      {}
      <section className="hero">
        <div className="hero__bg">
          <img src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1800" alt="" className="hero__img" />
          <div className="hero__veil" />
        </div>

        <div className="hero__body container">
          <div className="hero__pill au" style={{animationDelay:'.1s'}}>◈ Бишкек, Кыргызстан</div>
          <h1 className="hero__h au" style={{animationDelay:'.2s'}}>
            Лучшие<br/><span className="red">Спорткары</span><br/>в Бишкеке
          </h1>
          <p className="hero__sub au" style={{animationDelay:'.35s'}}>
            Ferrari, Lamborghini, Porsche и другие легенды.<br/>Мечта стала реальностью.
          </p>
          <div className="hero__cta au" style={{animationDelay:'.5s'}}>
            <Link to="/catalog" className="btn btn-primary btn-lg">
              Смотреть автомобили →
            </Link>
            <Link to="/register" className="btn btn-secondary btn-lg">Стать клиентом</Link>
          </div>

          <div className="hero__stats au" style={{animationDelay:'.65s'}}>
            {[['12+','Моделей'],['6','Брендов'],['24/7','Поддержка']].map(([n,l],i) => (
              <React.Fragment key={i}>
                {i > 0 && <div className="hero__div" />}
                <div className="hero__stat">
                  <span className="hero__n">{n}</span>
                  <span className="hero__l">{l}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="hero__scroll">
          <div className="hero__scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {}
      <section className="features section">
        <div className="container">
          <div className="feat-grid">
            {[
              {e:'🏎',t:'Элитные бренды',d:'Ferrari, Lamborghini, Porsche, McLaren и другие легенды мирового автопрома'},
              {e:'✓',t:'Проверенные авто',d:'Каждый автомобиль прошёл техническую проверку и имеет полную историю'},
              {e:'⚡',t:'Быстрое оформление',d:'Покупка за один день — онлайн, без лишних бумаг и задержек'},
            ].map((f,i) => (
              <div key={i} className="feat-item au" style={{animationDelay:`${.1*i}s`}}>
                <div className="feat-icon">{f.e}</div>
                <h3 className="feat-title">{f.t}</h3>
                <p className="feat-desc">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="section">
        <div className="container">
          <div className="sh">
            <div className="sh__tag">Топ выбор</div>
            <h2 className="sh__h">Популярные <span className="red">Автомобили</span></h2>
            <p className="sh__sub muted">Самые востребованные модели нашего автосалона</p>
          </div>
          <div className="cars-grid stagger">
            {featured.map(car => <CarCard key={car.id} car={car} />)}
          </div>
          <div style={{textAlign:'center',marginTop:'48px'}}>
            <Link to="/catalog" className="btn btn-secondary btn-lg">Весь каталог →</Link>
          </div>
        </div>
      </section>

      {}
      <section className="cta section">
        <div className="container">
          <div className="cta__inner">
            <div>
              <h2 className="cta__h">Готовы к покупке<br/>мечты?</h2>
              <p className="cta__p muted">Зарегистрируйтесь и получите доступ к эксклюзивному каталогу.</p>
              <Link to="/register" className="btn btn-primary btn-lg">Начать сейчас</Link>
            </div>
            <div className="cta__ring" />
          </div>
        </div>
      </section>
    </div>
  );
}