import express from 'express';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const users = [
    { id: 1, username: 'admin', password: '$2b$10$H5xg/OGC3LE8yG6owXO8i.EwNHDULrblPKuqjJlY9iylw1Y9H1gRi' } // senha: "password"
];

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = users.find(u => u.username === username);

            if (!user) {
                return done(null, false, { message: 'Nome de usuário inválido.' });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return done(null, false, { message: 'Senha inválida.' });
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

app.use(passport.initialize());

app.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({ message: 'Login bem-sucedido' });
});

app.get('/protegida', passport.authenticate('local'), (req, res) => {
    res.json({ message: 'Você está autenticado!' });
});

app.get('/api/data', (req, res) => {
    const data = { message: 'Dados da API RESTful' };
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`Servidor API rodando na porta ${PORT}`);
});
