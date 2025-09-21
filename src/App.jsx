import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/layout/Layout';
import DashboardPage from './pages/DashboardPage';
import OrdersPage from './pages/OrdersPage';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboards/default" replace />} />
            <Route path="dashboards/default" element={<DashboardPage />} />
            <Route path="orders" element={<OrdersPage />} /> 
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;