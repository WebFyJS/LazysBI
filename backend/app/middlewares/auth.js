import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt';
import LocalStrategy from 'passport-local';
import { users } from "../database/index.js";
import { secret } from "../config/env.js"

export function AuthMiddleware(req, res, next) {

    const { authorization } = req.headers

    if (!authorization || authorization == '' || authorization == null) {
        
        return res.status(403).json({ message_ptBr: 'Sem autorização', message_en: 'Unauthorized' })
    
    } else {
        try {
            if (!jwt.verify(String(authorization).split(' ')[1], secret)) {
                return res.status(403).json({ message_ptBr: 'Sem autorização', message_en: 'Unauthorized' })
            }
        } catch (error) {
            return res.status(403).json({ message_ptBr: 'Sem autorização', message_en: 'Unauthorized' })
        }
    }
    
    return next()
}

export const loginPassportMiddleware = new LocalStrategy(

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
)