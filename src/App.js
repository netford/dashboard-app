// src/App.js
import React from 'react';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Аналитическая панель</h1>
      </header>
      <main className="app-content">
        <Dashboard />
      </main>
      <footer className="app-footer">
        <p>Тестовое задание © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;