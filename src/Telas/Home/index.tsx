import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const logOut = async () => {
    try {
        const token = localStorage.getItem('token');
        if (token) {
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          navigate('/login');
        }
    } catch (error) {
    }
  };

  return (

    
    <div>
      <h2>Página Inicial</h2>
      <p>Bem-vindo à página inicial!</p>
      <button onClick={logOut}>Logout</button>
    </div>
  );
};

export default Home;
