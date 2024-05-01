import express from 'express';
import passport from 'passport';
import session from 'express-session';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import UserController from './backend/app/controllers/UserController.js';
import { loginPassportMiddleware, AuthMiddleware  } from './backend/app/middlewares/auth.js';
import { secret } from './backend/app/config/env.js';

const app = express();
const PORT = process.env.PORT || 5000;
let revokedTokens = [];

const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 100,
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.json());
app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
}))

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const user = users.find(user => user.id === id);
    done(null, user);
});

passport.use(loginPassportMiddleware);

app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => res.json({ msg: 'hello world!' }))

app.get('/test', UserController.index)

app.get('/api', (req, res)=>res.json('api'))

app.use("/api/", apiLimiter);

app.post('/api/login', passport.authenticate('local'), UserController.login);

app.use(AuthMiddleware)

app.get('/api/authenticated', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ authenticated: true });
    } else {
        res.json({ authenticated: false });
    }
});

app.post('/api/revoketoken', (req, res) => {
    const { token } = req.body;

    if (revokedTokens.includes(token)) {
        return res.status(400).json({ message: 'O token já foi revogado.' });
    }

    revokedTokens.push(token);

    return res.json({ message: 'Token revogado com sucesso.' });
});


app.get('/api/data', (req, res) => {
    const data = { message: 'Dados da API RESTful' };
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`Servidor API rodando na porta ${PORT}`);
});
