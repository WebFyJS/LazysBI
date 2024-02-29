import express from 'express';
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware para processar requisições JSON
app.use(express.json());

// Definição de rotas
app.get('/api/data', (req, res) => {
    // Lógica para buscar e retornar dados da sua aplicação
    const data = { message: 'Dados da API RESTful' };
    res.json(data);
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor API rodando na porta ${PORT}`);
});
