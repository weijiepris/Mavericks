import express, { Request, Response } from 'express'
import employeeRoute from './routes/employee.routes'
import departmentRoute from './routes/department.routes'
import cors from 'cors';
import Department from './models/department.model';
import User from './models/user.model';
import Employee from './models/employee.model';
import cookieParser from 'cookie-parser';
import verifyTokenHandler from './middleware/authenticate';
import { createUser, findUserByName } from './controller/user.controller';

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

app.use('/employee', employeeRoute)
app.use("/department", departmentRoute);
app.post('/login', findUserByName);
app.post("/register", createUser);
app.get("/verify", verifyTokenHandler, (req: Request, res: Response) => {
    res.status(200).json({ authenticated: true })
});

module.exports = app;