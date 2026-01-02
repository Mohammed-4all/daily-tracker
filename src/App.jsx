import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import CounterScreen from './screens/CounterScreen';

function AppContent() {
  const navigate = useNavigate();
  
  return (
    <Routes>
      <Route path="/" element={<HomeScreen navigateToCounter={() => navigate('/counter')} />} />
      <Route path="/counter" element={<CounterScreen navigateToHome={() => navigate('/')} />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh' }}>
        <AppContent />
      </div>
    </Router>
  );
}

export default App;

