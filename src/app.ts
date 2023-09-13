import express, { Request, Response } from 'express'
import employeeRoute from './routes'
import cors from 'cors';
import Department from './models/department.model';
import User from './models/user.model';
import Employee from './models/employee.model';
import { createUser, findUserByName } from './service/user.service';
import HashService from "./utils/HashService"
import JwtService from './utils/JWTService';
import cookieParser from 'cookie-parser';
import verifyTokenHandler from './middleware/authenticate';

require('dotenv').config()

const app = express();

app.use(express.json())
app.use(cookieParser());

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))
// app.use(express.urlencoded({extended: true}))

try {
    Employee.sync();
    User.sync();
    Department.sync()
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const hashService = new HashService();
const jwtService = new JwtService();

app.use('/employee', employeeRoute)

app.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;

    // to call in controller
    const user = await findUserByName(username);
    if (!user) {
        return res.status(401).json("invalid username or password")
    }

    const authenticated = await hashService.compare(password, user.password);

    if (!authenticated) {
        return res.status(401).json("invalid username or password")
    }

    const token = await jwtService.signAccessToken({ username: user.username }, '1h')

    res.status(202).cookie('Bearer', token, { sameSite: 'strict', path: '/', httpOnly: true }).json({
        authenticated, token
    })
});

app.post("/register", async (req: Request, res: Response) => {
    const { username, password, departmentId } = req.body

    // to call in controller
    const user = await findUserByName(username);
    if (user) {
        return res.status(409).json("User already exists")
    }

    const hashed = await hashService.hash(password)

    createUser(username, hashed, departmentId).then(async () => {
        const token = await jwtService.signAccessToken({ username }, '1h')
        res.status(202).cookie('Bearer', token, { sameSite: 'strict', path: '/', httpOnly: true }).json({
            authenticated: true, token
        })
    });
});

app.get("/department", async (req: Request, res: Response) => {
    const departments = await Department.findAll();
    res.status(200).json({ departments })
});

app.get("/verify", verifyTokenHandler, (req: Request, res: Response) => {
    res.status(200).json({ authenticated: true })
});

module.exports = app;