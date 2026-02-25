import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../services/ordersService';
import { CARS, formatPrice } from '../data/carsData';
import './CarDetail.css';

export default function CarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const car = CARS.find(c => c.id === id);
  const [buying, setBuying] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!car) return (
    <div className="empty-state" style={{paddingTop:'160px'}}>
      <h3>Автомобиль не найден</h3>
      <p>Возможно, он был удалён или ссылка неверна</p>
      <button className="btn btn-secondary" onClick={() => navigate('/catalog')}>В каталог</button>
    </div>
  );

  const handleBuy = async () => {
    if (!user) { navigate('/login'); return; }
    setBuying(true); setError('');
    try {
      await createOrder(user, car);
      setSuccess(true);
    } catch (e) {
      setError('Не удалось оформить заказ. Попробуйте ещё раз.');
    } finally {
      setBuying(false);
    }
  };

  return (
    <div className="cd">
      {}
      <div className="cd__hero">
        <img src={car.imageUrl} alt={`${car.brand} ${car.model}`} className="cd__hero-img"
          onError={e=>{ e.target.src='https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1400'; }} />
        <div className="cd__hero-veil" />
        <div className="cd__hero-txt container">
          <div className="cd__brand">{car.brand}</div>
          <h1 className="cd__title">{car.model}</h1>
          <span className="cd__yr">{car.year}</span>
        </div>
      </div>

      {}
      <div className="container">
        <div className="cd__layout">
          <div className="cd__main">
            <div className="cd__sec">
              <h2 className="cd__sec-h">Об автомобиле</h2>
              <p className="cd__desc">{car.description}</p>
            </div>

            <div className="cd__sec">
              <h2 className="cd__sec-h">Характеристики</h2>
              <div className="cd__specs">
                {[
                  ['Двигатель', car.engineType || '—'],
                  ['Мощность', `${car.horsepower} л.с.`, true],
                  ['0–100 км/ч', `${car.acceleration} сек`],
                  ['Год выпуска', car.year],
                  ['Наличие', car.available ? '✓ В наличии' : '✗ Нет', false, car.available ? 'green' : 'red'],
                ].map(([l, v, accent, clr]) => (
                  <div key={l} className="spec">
                    <span className="spec__l">{l}</span>
                    <span className={`spec__v ${accent?'spec__v--r':''} ${clr?'spec__v--'+clr:''}`}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {}
          <div className="cd__side">
            <div className="pcard">
              <div className="pcard__brand">{car.brand}</div>
              <div className="pcard__model">{car.model}</div>
              <div className="pcard__price">{formatPrice(car.price)}</div>
              <div className="pcard__hr" />

              <div className="pcard__qs">
                {[['Мощность',`${car.horsepower} л.с.`],['0-100',`${car.acceleration}s`],['Год',car.year]].map(([l,v])=>(
                  <div key={l} className="pcard__qr">
                    <span>{l}</span><strong>{v}</strong>
                  </div>
                ))}
              </div>
              <div className="pcard__hr" />

              {success ? (
                <div className="pcard__ok">
                  <div className="pcard__ok-icon">✓</div>
                  <p>Заказ оформлен!</p>
                  <small>Менеджер свяжется с вами скоро</small>
                  <button className="btn btn-ghost" style={{width:'100%',marginTop:'12px'}} onClick={()=>navigate('/profile')}>
                    Перейти в профиль
                  </button>
                </div>
              ) : (
                <>
                  {error && <div className="err-box" style={{marginBottom:'14px'}}>{error}</div>}
                  <button className="btn btn-primary" style={{width:'100%',padding:'16px'}} onClick={handleBuy} disabled={buying||!car.available}>
                    {buying ? <><div className="spinner spinner-sm"/>&nbsp;Оформление...</> : car.available ? 'Купить' : 'Нет в наличии'}
                  </button>
                  {!user && <p className="pcard__note">Нужна <a href="/login">авторизация</a></p>}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
