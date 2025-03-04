import React from 'react';
import { Stack } from 'expo-router';
import LoginScreen from '../src/screens/LoginScreen';

export default function App() {
  const handleLoginSuccess = (success) => {
    if (success) {
      console.log('User logged in successfully.');
    } else {
      console.log('Login failed.');
    }
  };

  return (
    <LoginScreen onLoginSuccessProp={handleLoginSuccess} />
  );
}

