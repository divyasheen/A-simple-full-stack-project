import React, { useState } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    profilepic: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('profilepic', formData.profilepic);

    try {
      const res = await fetch('http://localhost:5000/users/register', {
        method: 'POST',
        body: data
      });

      if (res.ok) {
        alert('Registration successful!');
      } else {
        alert('Registration failed!');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Registration failed!');
    }
  };

  return (
    <div className="container">
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" required onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" required onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Profile Picture:</label>
          <input type="file" name="profilepic" accept="image/*" required onChange={handleChange} />
        </div>
        <div className="form-group">
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
