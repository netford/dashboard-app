// src/components/DataCard.js
import React from 'react';
import './DataCard.css';

const DataCard = ({ data, isSelected, onClick }) => {
  // Функция для форматирования процентов
  const formatPercent = (value) => {
    return `${value > 0 ? '+' : ''}${value}%`;
  };

  // Функция для определения класса (цвета) ячейки
  const getChangeClass = (value) => {
    if (value > 0) return 'positive';
    if (value < 0) return 'negative';
    return '';
  };

  return (
    <div 
      className={`data-card ${isSelected ? 'selected' : ''}`} 
      onClick={() => onClick(data.name)}
    >
      <h3 className="card-title">{data.name}</h3>
      
      <div className="card-content">
        <div className="card-row">
          <span className="card-label">Текущий день:</span>
          <span className="card-value">{data.current}</span>
        </div>
        
        <div className="card-row">
          <span className="card-label">Вчера:</span>
          <span className="card-value">{data.yesterday}</span>
        </div>
        
        <div className="card-row">
          <span className="card-label">Динамика:</span>
          <span className={`card-value ${getChangeClass(data.change)}`}>
            {formatPercent(data.change)}
          </span>
        </div>
        
        <div className="card-row">
          <span className="card-label">Этот день недели:</span>
          <span className="card-value">{data.weekday}</span>
        </div>
      </div>
    </div>
  );
};

export default DataCard;