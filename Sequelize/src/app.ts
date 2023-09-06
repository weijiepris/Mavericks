import express, { Request, Response } from 'express'
import employeeRoute from './routes'
import { sequelize } from './models/employee.model';

const app = express();
app.use(express.json())
// app.use(express.urlencoded({extended: true}))

try {
    sequelize.sync();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

app.use('/employee', employeeRoute)

app.all('/api/all', (req: Request, res: Response) => {
    return res.status(200).json({
        test: true
    })
});

module.exports = app;