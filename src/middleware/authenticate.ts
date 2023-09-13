//@ts-nocheck
import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import JwtService from '../utils/JwtService';
import User from '../models/user.model';

const jwtService = new JwtService();

function verifyTokenHandler(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization || req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }

    jwtService.verifyAccessToken(token).then(async (decoded: object | undefined) => {
        // If the token is valid, attach the decoded data to the request for later use
        req.user = decoded;

        const username = decoded.username;

        const user = await User.findAll({
            where: { username }
        })

        if (!user || user.length === 0) {
            return res.status(401).json({ message: 'Token invalid or expired' });
        }
        next();
    }).catch((err: VerifyErrors | null) => {
        return res.status(401).json({ message: 'Token invalid or expired' });
    })
}

export default verifyTokenHandler;
