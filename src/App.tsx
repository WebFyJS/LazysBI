import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Telas/Home';
import Login from './Telas/Login';
import AuthValidation from './Telas/Componentes/AuthValidation';

const App: React.FC = () => {

  return (
    <Router>
      <Routes><Route path="/login" element={<Login />} />
      <Route element={<AuthValidation children={undefined} />}>
          <Route path="/" element={<Home />} />
      </Route>
      </Routes>
    </Router>
  );
};

export default App;
