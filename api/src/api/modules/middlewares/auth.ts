import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
//@ts-ignore
import { Usuario } from '@types/types';

dotenv.config();


interface AuthenticatedRequest extends Request {
    user?: Usuario;
}

export const authToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Extraí o token

    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }

    try {
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            return res.status(500).json({ message: 'JWT Secret not configured' });
        }

        const verified = jwt.verify(token, secret) as Usuario; 

        req.user = verified;

        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};
