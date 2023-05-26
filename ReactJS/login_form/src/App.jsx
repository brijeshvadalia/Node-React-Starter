import React from 'react';
import LoginForm from './LoginForm';

const App = () => {
  return (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}>
      <h1 style={{margin : '100px'}}>Welcome to My App</h1>
      <LoginForm />
    </div>
  );
};

export default App;
