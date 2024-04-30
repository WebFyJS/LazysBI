import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './login.module.css'
import axios from 'axios';

const Login: React.FC = () => {
    const [verificado, setVerificado] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        checkAuthentication();
    }, []);

    const checkAuthentication = async () => {
        try {
            if (!verificado) {
                setVerificado(true);

                const token = localStorage.getItem('token');
                if (!token) {
                    return;
                }

                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await axios.get('/api/authenticated');

                if (response.data.authenticated) {
                    navigate('/');
                }
            }
        } catch (error) {
            console.error('Erro ao verificar autenticação:', error);
        }
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('/api/login', { username, password });
            const token = response.data.token;
            localStorage.setItem('token', token);

            const loadUrl = localStorage.getItem('loadUrl');
            if (loadUrl) {
                localStorage.removeItem('loadUrl');
                navigate(loadUrl);
            } else {
                navigate('/');
            }
        } catch (error) {
            setError('Nome de usuário ou senha inválidos.');
            console.error('Erro ao fazer login:', error);
        }
    };

    return (
        <form >
            <div className={s.login}>
                <h2>Acesse sua conta</h2>
                <div className={s.form_login_group}>
                    <label>Usuário:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className={s.form_login_group}>
                    <label>Senha:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                {error && <div>{error}</div>}
                <button type='button' onClick={handleLogin}>Login</button>
            </div>
        </form>
    );
};

export default Login;
