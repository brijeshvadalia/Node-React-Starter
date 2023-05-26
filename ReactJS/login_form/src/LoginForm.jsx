import React, { useState } from 'react';
import './LoginForm.css'; 

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    phoneNumber: ''
  });

  const [submittedData, setSubmittedData] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmittedData(formData);
    setFormData({
      username: '',
      password: '',
      email: '',
      phoneNumber: ''
    });
  };

  const handleReset = () => {
    setFormData({
      username: '',
      password: '',
      email: '',
      phoneNumber: ''
    });
    setSubmittedData(null);
  };

  return (
    <div className='main-div'>
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Submit</button>
        <button type="button" onClick={handleReset}>Reset</button>
      </form>

      {submittedData && (
        <div>
          <h3>Submitted Data:</h3>
          <div>
            <strong>Username:</strong> {submittedData.username}
          </div>
          <div>
            <strong>Password:</strong> {submittedData.password}
          </div>
          <div>
            <strong>Email:</strong> {submittedData.email}
          </div>
          <div>
            <strong>Phone Number:</strong> {submittedData.phoneNumber}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
