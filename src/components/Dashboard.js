// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Chart from './Chart';
import DataCard from './DataCard';
import { demoData } from './demoData';

const Dashboard = () => {
  // Состояние для хранения данных
  const [data, setData] = useState([]);
  // Состояние для выбранной строки (для отображения графика)
  const [selectedRow, setSelectedRow] = useState(null);
  // Состояние загрузки
  const [loading, setLoading] = useState(true);
  // Состояние ошибки
  const [error, setError] = useState(null);
  // Состояние для определения мобильного представления
  const [isMobile, setIsMobile] = useState(false);

  // Функция для определения мобильного устройства
  const checkIsMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };

  // Функция для загрузки данных с сервера
  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Для тестирования используем демо-данные
      // В реальном проекте раскомментируйте код ниже для запроса к серверу
      /*
      const response = await fetch('api/get-data.php');
      
      if (!response.ok) {
        throw new Error('Ошибка получения данных');
      }
      
      const result = await response.json();
      setData(result);
      */

      // Используем демо-данные
      setData(demoData);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Эффект для загрузки данных при монтировании компонента
  useEffect(() => {
    fetchData();
    
    // Проверяем размер экрана при загрузке
    checkIsMobile();
    
    // Добавляем обработчик события изменения размера окна
    window.addEventListener('resize', checkIsMobile);
    
    // Очистка при размонтировании
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  // Функция для обработки клика по строке
  const handleRowClick = (rowName) => {
    setSelectedRow(rowName);
  };

  // Функция для форматирования процентов
  const formatPercent = (value) => {
    return `${value > 0 ? '+' : ''}${value}%`;
  };

  // Функция для определения класса (цвета) ячейки
  const getCellClass = (value) => {
    if (value > 0) return 'positive';
    if (value < 0) return 'negative';
    return '';
  };

  if (loading) return <div className="loading">Загрузка данных...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;

  // Отображение для мобильного устройства (карточки)
  const renderMobileView = () => {
    return (
      <div className="cards-container">
        {data.map((row, index) => (
          <DataCard 
            key={index} 
            data={row} 
            isSelected={selectedRow === row.name}
            onClick={handleRowClick}
          />
        ))}
      </div>
    );
  };

  // Отображение для десктопа (таблица)
  const renderDesktopView = () => {
    return (
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Показатель</th>
            <th>Текущий день</th>
            <th>Вчера</th>
            <th>Динамика</th>
            <th>Этот день недели</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} onClick={() => handleRowClick(row.name)} className={selectedRow === row.name ? 'selected' : ''}>
              <td>{row.name}</td>
              <td>{row.current}</td>
              <td>{row.yesterday}</td>
              <td className={getCellClass(row.change)}>
                {formatPercent(row.change)}
              </td>
              <td>{row.weekday}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Аналитика показателей</h2>
      
      {selectedRow && <Chart selectedRow={selectedRow} />}
      
      {isMobile ? renderMobileView() : renderDesktopView()}
    </div>
  );
};

export default Dashboard;