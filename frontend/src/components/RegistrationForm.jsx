import React, { useState } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    profilepic: null,
    biography: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation (check if email is empty or invalid)
    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Password validation (check if password is empty or too short)
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 7 characters.';
    }

    // Profile picture validation (check if the profile picture is selected)
    if (!formData.profilepic) {
      newErrors.profilepic = 'Profile picture is required.';
    }

    // Biography validation (optional check for max length)
    if (formData.biography.length > 200) {
      newErrors.biography = 'Biography must be less than 200 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation before submitting
    if (!validateForm()) {
      return; // Stop if validation fails
    }

    const data = new FormData();
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('profilepic', formData.profilepic);
    data.append('biography', formData.biography);

    try {
      const res = await fetch('http://localhost:5000/users/register', {
        method: 'POST',
        body: data,
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
          <input
            type="email"
            name="email"
            required
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            required
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div className="form-group">
          <label>Profile Picture:</label>
          <input
            type="file"
            name="profilepic"
            accept="image/*"
            required
            onChange={handleChange}
          />
          {errors.profilepic && <p className="error">{errors.profilepic}</p>}
        </div>
        <div className="form-group">
          <label>Biography:</label>
          <textarea
            name="biography"
            value={formData.biography}
            onChange={handleChange}
            placeholder="Tell us a little about yourself"
          />
          {errors.biography && <p className="error">{errors.biography}</p>}
        </div>
        <div className="form-group">
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
