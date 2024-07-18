import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './components/LoginPage';
import MyPage from './components/MyPage';
import RegisterClientPage from './components/RegisterClientPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/register-client" element={<RegisterClientPage />} />
      </Routes>
    </Router>
  );
}

export default App;