// App.js
import React from 'react';
import RegistrationForm from './components/RegistrationForm';
import UserList from './components/UserList';
import './App.css';
import LoginForm from './components/LoginForm';

const App = () => {
  return (
    <div className="app-container">
      <div className="forms-container">
        <RegistrationForm />
        <LoginForm />
      </div>
      <UserList />
    </div>
  );
};

export default App;