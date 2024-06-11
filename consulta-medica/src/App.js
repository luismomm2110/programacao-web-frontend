// src/App.js

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import SignupPage from './SignUp/SignUp'
import Login from './Login/Login'
import {ProtectedRoute} from './ProtectedRoute'
import {Consulta} from './Consulta/Consulta'
import {Home} from "./Home/Home";
import {MedicoConsulta} from "./MedicoConsulta/MedicoConsulta";
import {MedicoCadastro} from "./MedicoCadastro/MedicoCadastro";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
          <div className="App">
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/consulta" element={<ProtectedRoute><Consulta /></ProtectedRoute>} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/medicos/:id" element={<MedicoConsulta />} />
          <Route path="/medicos/cadastro" element={<MedicoCadastro />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
          </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
