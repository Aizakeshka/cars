import React, { useState } from 'react';
import CarCard from '../components/CarCard';
import { CARS, BRANDS } from '../data/carsData';
import './Catalog.css';

const PRICE_RANGES = [
  { label: 'Любая цена', min: null, max: null },
  { label: 'До $150,000', min: null, max: 150000 },
  { label: '$150k – $250k', min: 150000, max: 250000 },
  { label: '$250k – $350k', min: 250000, max: 350000 },
  { label: 'Свыше $350k', min: 350000, max: null },
];

export default function Catalog() {
  const [brand, setBrand] = useState('Все');
  const [priceIdx, setPriceIdx] = useState(0);
  const [sort, setSort] = useState('default');
  const [search, setSearch] = useState('');

  const pr = PRICE_RANGES[priceIdx];

  const filtered = CARS.filter(c => {
    const bOk = brand === 'Все' || c.brand === brand;
    const pOk = (!pr.min || c.price >= pr.min) && (!pr.max || c.price <= pr.max);
    const sOk = !search || `${c.brand} ${c.model}`.toLowerCase().includes(search.toLowerCase());
    return bOk && pOk && sOk;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price;
    if (sort === 'price-desc') return b.price - a.price;
    if (sort === 'year-desc') return b.year - a.year;
    if (sort === 'hp-desc') return b.horsepower - a.horsepower;
    return 0;
  });

  const reset = () => { setBrand('Все'); setPriceIdx(0); setSort('default'); setSearch(''); };

  return (
    <div className="catalog">
      <div className="cat__hdr">
        <div className="container">
          <div className="cat__tag">Каталог</div>
          <h1 className="cat__h">Все <span className="red">Автомобили</span></h1>
          <p className="muted">{filtered.length} автомобилей в наличии</p>
        </div>
      </div>

      <div className="container">
        <div className="cat__layout">
          {}
          <aside className="cat__side">
            <div className="flt">
              <div className="flt__label">Поиск</div>
              <input className="input" placeholder="Ferrari, BMW..." value={search} onChange={e=>setSearch(e.target.value)} />
            </div>

            <div className="flt">
              <div className="flt__label">Марка</div>
              {BRANDS.map(b => (
                <button key={b} className={'flt__btn' + (brand===b?' flt__btn--on':'')} onClick={()=>setBrand(b)}>{b}</button>
              ))}
            </div>

            <div className="flt">
              <div className="flt__label">Цена</div>
              {PRICE_RANGES.map((p,i) => (
                <button key={i} className={'flt__btn' + (priceIdx===i?' flt__btn--on':'')} onClick={()=>setPriceIdx(i)}>{p.label}</button>
              ))}
            </div>

            <button className="btn btn-ghost" style={{width:'100%'}} onClick={reset}>Сбросить фильтры</button>
          </aside>

          {}
          <main className="cat__main">
            <div className="cat__bar">
              <span className="muted">Найдено: <strong style={{color:'var(--t1)'}}>{sorted.length}</strong></span>
              <select className="input cat__sort" value={sort} onChange={e=>setSort(e.target.value)}>
                <option value="default">Сортировка</option>
                <option value="price-asc">Цена ↑</option>
                <option value="price-desc">Цена ↓</option>
                <option value="year-desc">Сначала новые</option>
                <option value="hp-desc">По мощности</option>
              </select>
            </div>

            {sorted.length === 0 ? (
              <div className="empty-state">
                <h3>Не найдено</h3>
                <p>Попробуйте изменить фильтры</p>
                <button className="btn btn-secondary" onClick={reset}>Сбросить</button>
              </div>
            ) : (
              <div className="cars-grid stagger">
                {sorted.map(car => <CarCard key={car.id} car={car} />)}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
