import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface AuthValidationProps {
    children: React.ReactNode;
}

const AuthValidation: React.FC<AuthValidationProps> = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    const response = await axios.get('/api/authenticated');
                    if (!response.data.authenticated) {
                        navigate('/login');
                    }
                } else {
                    navigate('/login');
                }
            } catch (error) {
                console.error('Erro ao verificar autenticação:', error);
            }
        };

        checkAuthentication();
    }, [navigate]);

    return <>{children}</>;
};

export default AuthValidation;
