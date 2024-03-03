import React from 'react';

interface HomeProps {
  onLogout: () => void;
}

const Home: React.FC<HomeProps> = ({ onLogout }) => {
  return (
    <div>
      <h2>Página Inicial</h2>
      <p>Bem-vindo à página inicial!</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Home;
