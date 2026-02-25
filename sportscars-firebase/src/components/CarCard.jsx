import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../data/carsData';
import './CarCard.css';

export default function CarCard({ car }) {
  return (
    <div className="cc au">
      <div className="cc__img-wrap">
        <img src={car.imageUrl} alt={`${car.brand} ${car.model}`} className="cc__img"
          onError={e => { e.target.src='https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600'; }}
          loading="lazy" />
        <div className="cc__overlay" />
        <div className="cc__year">{car.year}</div>
        <div className="cc__hp">{car.horsepower} л.с.</div>
      </div>

      <div className="cc__body">
        <div className="cc__brand">{car.brand}</div>
        <h3 className="cc__model">{car.model}</h3>

        <div className="cc__specs">
          <span>⚡ {car.engineType}</span>
          <span>🏁 {car.acceleration}s до 100</span>
        </div>

        <div className="cc__footer">
          <div className="cc__price">{formatPrice(car.price)}</div>
          <Link to={`/cars/${car.id}`} className="btn btn-primary btn-sm">Подробнее</Link>
        </div>
      </div>
    </div>
  );
}
