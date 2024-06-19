import React from 'react';
import { useNavigate } from 'react-router-dom';
import SideBarMenu from '../Componentes/SideBarMenu';

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

    
    <div style={{height: '100vh', width: '100vw'}}>
      {/* <h1>Bem - vindo ao Lazy BI</h1> */}
      <SideBarMenu/>
    </div>
  );
};

export default Home;
