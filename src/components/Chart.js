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
    
    // Определяем, является ли устройство мобильным
    const isMobile = window.innerWidth < 768;
    
    // Настройки для мобильного устройства
    const mobileOptions = {
      chart: {
        height: 220  // Меньше высота для мобильных
      },
      title: {
        text: isMobile ? selectedRow : `Динамика показателя "${selectedRow}"`,
        style: {
          fontSize: isMobile ? '14px' : '18px'
        }
      },
      xAxis: {
        categories: isMobile 
          ? ['6д', '5д', '4д', '3д', '2д', 'Вч', 'Сег'] // Сокращенные метки для мобильных
          : ['6 дней назад', '5 дней назад', '4 дня назад', '3 дня назад', '2 дня назад', 'Вчера', 'Сегодня'],
        labels: {
          style: {
            fontSize: isMobile ? '10px' : '12px'
          }
        }
      },
      yAxis: {
        title: {
          text: isMobile ? '' : 'Значение', // Убираем заголовок оси Y на мобильных
          style: {
            fontSize: isMobile ? '10px' : '12px'
          }
        },
        labels: {
          style: {
            fontSize: isMobile ? '10px' : '12px'
          }
        }
      },
      legend: {
        enabled: false // Отключаем легенду для мобильных
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
            radius: isMobile ? 4 : 6  // Меньший размер маркеров для мобильных
          }
        }
      },
      credits: {
        enabled: false
      },
      // Уменьшаем отступы для мобильных
      spacing: isMobile ? [10, 10, 15, 10] : [25, 25, 30, 25]
    };
    
    // Создание графика с адаптивными настройками
    Highcharts.chart(currentChartRef, mobileOptions);
    
    // Функция обработки изменения размера окна
    const handleResize = () => {
      const chart = Highcharts.charts.find(chart => chart && chart.renderTo === currentChartRef);
      if (chart) {
        const newIsMobile = window.innerWidth < 768;
        
        // Обновляем настройки при изменении режима просмотра
        if ((newIsMobile && !isMobile) || (!newIsMobile && isMobile)) {
          chart.update({
            chart: {
              height: newIsMobile ? 220 : 300
            },
            title: {
              text: newIsMobile ? selectedRow : `Динамика показателя "${selectedRow}"`,
              style: {
                fontSize: newIsMobile ? '14px' : '18px'
              }
            },
            xAxis: {
              categories: newIsMobile 
                ? ['6д', '5д', '4д', '3д', '2д', 'Вч', 'Сег']
                : ['6 дней назад', '5 дней назад', '4 дня назад', '3 дня назад', '2 дня назад', 'Вчера', 'Сегодня'],
              labels: {
                style: {
                  fontSize: newIsMobile ? '10px' : '12px'
                }
              }
            },
            yAxis: {
              title: {
                text: newIsMobile ? '' : 'Значение',
                style: {
                  fontSize: newIsMobile ? '10px' : '12px'
                }
              }
            },
            spacing: newIsMobile ? [10, 10, 15, 10] : [25, 25, 30, 25]
          });
        }
      }
    };
    
    // Добавляем обработчик события изменения размера окна
    window.addEventListener('resize', handleResize);
    
    // Очистка при размонтировании
    return () => {
      window.removeEventListener('resize', handleResize);
      
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
      <div ref={chartRef} style={{ width: '100%', height: 'auto', minHeight: '220px' }}></div>
    </div>
  );
};

export default Chart;