import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../../../config/api';

interface AuthValidationProps {
    children: React.ReactNode;
}

const AuthValidation: React.FC<AuthValidationProps> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    const response = await api.get('/api/authenticated');
                    if (!response.data.authenticated) {
                        localStorage.setItem('loadUrl', location.pathname);
                        navigate('/login', { state: { from: location.pathname } });
                    }
                } else {
                    localStorage.setItem('loadUrl', location.pathname);
                    navigate('/login', { state: { from: location.pathname } });
                }
            } catch (error) {
                console.error('Erro ao verificar autenticação:', error);
                // Lidar com o erro, exibir mensagem ou outra ação necessária
            } finally {
                setIsLoading(false);
            }
        };

        checkAuthentication();
    }, [navigate, location.pathname]);

    if (isLoading) {
        return <div>Carregando...</div>;
    }

    return <>{children}</>;
};

export default AuthValidation;
