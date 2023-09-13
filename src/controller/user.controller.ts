import { Request, Response } from 'express'
import _ from 'lodash';
import UserService from '../service/user.service';
import HashService from '../utils/HashService';
import JwtService from '../utils/JwtService';
import { UserCreationAttributes } from '../models/user.model';

require('dotenv').config();

const userService = new UserService();
const hashService = new HashService();
const jwtService = new JwtService();

export const findUserByName = async (
    req: Request,
    res: Response) => {
    try {
        const { username, password } = req.body;

        const user = await userService.findUserByName(username);
        if (!user) {
            return res.status(401).json("Invalid username or password")
        }
        const authenticated = await hashService.compare(password, user.password);

        if (!authenticated) {
            return res.status(401).json("Invalid username or password")
        }

        const token = await jwtService.signAccessToken({ username: user.username }, '1h')

        res.status(202).cookie('Bearer', token, { sameSite: 'strict', path: '/', httpOnly: true }).json({
            authenticated, token
        })
    } catch (e: any) {
        return res.status(500).send(e.message);
    }
}

export const createUser = async (req: Request, res: Response) => {
    const { username, password, departmentId } = req.body
    const user = await userService.findUserByName(username);
    if (user) {
        return res.status(409).json("User already exists")
    }

    const hashed: string = await hashService.hash(password)

    const userData: UserCreationAttributes = { username, password: hashed, departmentId }

    userService.createUser(userData).then(async (record) => {
        const token = await jwtService.signAccessToken({ username }, '1h')
        res.status(202).cookie('Bearer', token, { sameSite: 'strict', path: '/', httpOnly: true }).json({
            authenticated: true, token
        })
    });
}

