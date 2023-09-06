import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize('weijie-mavericks', 'postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres'
})