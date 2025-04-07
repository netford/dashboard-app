// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Chart from './Chart';
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

  // Импорт демо-данных
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

  if (loading) return <div>Загрузка данных...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div className="dashboard-container">
      <h2>Аналитика показателей</h2>
      
      {selectedRow && <Chart selectedRow={selectedRow} />}
      
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
    </div>
  );
};

export default Dashboard;