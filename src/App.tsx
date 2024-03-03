import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Telas/Home';
import Home2 from './Telas/Home2';
import Login from './Telas/Login';
import AuthValidation from './Telas/Componentes/AuthValidation';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AuthValidation children={<Home/>}/>} />
        <Route path="/Home2" element={<AuthValidation children={<Home2/>}/>} />
      </Routes>
    </Router>
  );
};

export default App;
