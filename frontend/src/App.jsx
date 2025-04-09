import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import UserList from './components/UserList';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={
            <div className="forms-container">
              <RegistrationForm />
              <LoginForm />
              <UserList />
            </div>
          } />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;