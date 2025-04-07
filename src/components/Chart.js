// src/components/Chart.js
import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';

// Массив для хранения исторических данных (демо)
const historicalData = {
  'Выручка, руб': [350000, 420000, 480000, 500000, 420000, 450000, 520000],
  'Наличные': [270000, 290000, 300000, 300000, 300000, 300000, 300000],
  'Безналичный расчет': [80000, 90000, 95000, 100000, 100000, 100000, 100000],
  'Кредитные карты': [90000, 95000, 98000, 100521, 100521, 100521, 100521],
  'Средний чек, руб': [900, 950, 1000, 1100, 1200, 1250, 1300],
  'Средний гость, руб': [800, 850, 900, 950, 1050, 1150, 1200],
  'Удаления из чека (после оплаты), руб': [1500, 1300, 1200, 1100, 1050, 1000, 1000],
  'Удаления из чека (до оплаты), руб': [1400, 1350, 1320, 1300, 1300, 1300, 1300],
  'Количество чеков': [30, 32, 33, 35, 34, 35, 34],
  'Количество гостей': [29, 30, 32, 34, 35, 35, 34]
};

const Chart = ({ selectedRow }) => {
  const chartRef = useRef(null);
  
  useEffect(() => {
    if (!selectedRow || !historicalData[selectedRow]) return;
    
    // Получение данных для выбранного показателя
    const data = historicalData[selectedRow];
    // Сохраняем текущее значение ссылки в переменную внутри эффекта
    const currentChartRef = chartRef.current;
    
    // Создание графика
    Highcharts.chart(currentChartRef, {
      title: {
        text: `Динамика показателя "${selectedRow}"`
      },
      xAxis: {
        categories: ['6 дней назад', '5 дней назад', '4 дня назад', '3 дня назад', '2 дня назад', 'Вчера', 'Сегодня']
      },
      yAxis: {
        title: {
          text: 'Значение'
        }
      },
      series: [{
        name: selectedRow,
        data: data,
        color: '#1890ff'
      }],
      plotOptions: {
        line: {
          marker: {
            enabled: true,
            radius: 6
          }
        }
      },
      credits: {
        enabled: false
      }
    });
    
    // Очистка при размонтировании, используем сохранённую переменную
    return () => {
      if (currentChartRef) {
        // Уничтожение графика, если он был создан
        const chart = Highcharts.charts.find(chart => chart && chart.renderTo === currentChartRef);
        if (chart) {
          chart.destroy();
        }
      }
    };
  }, [selectedRow]);

  return (
    <div className="chart-container">
      <div ref={chartRef} style={{ width: '100%', height: '300px' }}></div>
    </div>
  );
};

export default Chart;