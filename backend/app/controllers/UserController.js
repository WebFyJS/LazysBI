import Controller from "./Controller.js"
import jwt from 'jsonwebtoken';

export default new class UserController{
    index(req, res){
        
    }

    login(req, res){
        const token = jwt.sign({ userId: req.user.id }, 'secreto', { expiresIn: '1h' });
    
        res.json({ message: 'Login bem-sucedido', token: token });
    
    }
}