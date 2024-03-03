import React, { useState } from 'react';
import axios from 'axios';

interface LoginProps {
    onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/login', { username, password });
            console.log(response.data);
            onLogin();
        } catch (error) {
            setError('Nome de usuário ou senha inválidos.');
            console.error('Erro ao fazer login:', error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <div>{error}</div>}
            <div>
                <label>Usuário:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <label>Senha:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
