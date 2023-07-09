import express from 'express';
import { registration,getUser,deleteUser,login } from '../controller/user.js';
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken';
dotenv.config()

const router = express.Router();

const authenticateToken=(req,res,next)=>{
    const authHeader=req.headers['authorization']
    const token = authHeader && authHeader.split(' ')
    if(token == null) return res.sendStatus(401)

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err){
            return res.sendStatus(403)
        }
        req.user=user
        next()

    })
}
// User Registration Endpoint
router.post('/', registration);
router.get('/', getUser);
router.delete('/:userId',authenticateToken, deleteUser);
router.post('/login', login);


export default router;
