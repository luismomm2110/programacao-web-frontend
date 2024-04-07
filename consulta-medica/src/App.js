// src/App.js

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import SignupPage from './SignUp/SignUp'
import Login from './Login/Login'
import {ProtectedRoute} from './ProtectedRoute'
import {Consulta} from './Consulta/Consulta'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
          <div className="App">
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/consulta" element={<ProtectedRoute><Consulta /></ProtectedRoute>} />
        </Routes>
          </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
