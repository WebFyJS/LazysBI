import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface LoginProps {
    onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [verificado, setverificado] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        checkAuthentication();
    }, []);

    const checkAuthentication = async () => {
        try {
            const response = await axios.get('/api/authenticated');
            if (response.data.authenticated) {
                navigate('/');
            }else{
                setverificado(true);
            }
        } catch (error) {
            console.error('Erro ao verificar autenticação:', error);
        }
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('/api/login', { username, password });
            console.log(response.data);
            onLogin();
            navigate('/');
        } catch (error) {
            setError('Nome de usuário ou senha inválidos.');
            console.error('Erro ao fazer login:', error);
        }
    };

    return (<>
            {verificado ? (
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
            ) : null}
        </>
    );
};

export default Login;
