import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Login from './pages/Login/Login';
import Cadastro from './pages/Login/Cadastro';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
