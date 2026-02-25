import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserOrders } from '../services/ordersService';
import { formatPrice } from '../data/carsData';
import './Profile.css';

const fmtDate = d => new Date(d).toLocaleDateString('ru-RU', { year:'numeric', month:'long', day:'numeric' });

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    getUserOrders(user.uid)
      .then(setOrders)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user, navigate]);

  const handleLogout = () => { logout(); navigate('/'); };
  if (!user) return null;

  const total = orders.reduce((s, o) => s + (o.totalPrice || 0), 0);

  return (
    <div className="profile">
      <div className="container">
        {}
        <div className="pr__hdr au">
          <div className="pr__ava">{user.name[0].toUpperCase()}</div>
          <div className="pr__info">
            <div className="pr__tag">◈ Клиент</div>
            <h1 className="pr__name">{user.name}</h1>
            <p className="pr__email muted">{user.email}</p>
          </div>
          <button onClick={handleLogout} className="btn btn-secondary pr__out">Выйти</button>
        </div>

        {}
        <div className="pr__stats au" style={{animationDelay:'.1s'}}>
          <div className="pr__stat">
            <span className="pr__n">{orders.length}</span>
            <span className="pr__l">Покупок</span>
          </div>
          <div className="pr__stat">
            <span className="pr__n">{formatPrice(total)}</span>
            <span className="pr__l">Потрачено</span>
          </div>
        </div>

        {}
        <div className="au" style={{animationDelay:'.2s'}}>
          <h2 className="pr__sec-h">
            Мои автомобили
            {orders.length > 0 && <span className="pr__badge">{orders.length}</span>}
          </h2>

          {loading ? (
            <div className="spin-wrap"><div className="spinner"/></div>
          ) : orders.length === 0 ? (
            <div className="empty-state">
              <h3 style={{fontSize:'22px',color:'var(--t2)'}}>🏎</h3>
              <p>У вас пока нет покупок</p>
              <a href="/catalog" className="btn btn-primary">Перейти в каталог</a>
            </div>
          ) : (
            <div className="orders stagger">
              {orders.map(o => (
                <div key={o.id} className="ocard au">
                  <img src={o.carImageUrl} alt={o.carModel} className="ocard__img"
                    onError={e=>{ e.target.src='https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=200'; }} />
                  <div className="ocard__body">
                    <div className="ocard__brand">{o.carBrand}</div>
                    <div className="ocard__model">{o.carModel}</div>
                    <div className="ocard__date muted">Куплен {fmtDate(o.purchaseDate)}</div>
                  </div>
                  <div className="ocard__right">
                    <div className="ocard__price">{formatPrice(o.totalPrice)}</div>
                    <div className="ocard__status">✓ Подтверждён</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
