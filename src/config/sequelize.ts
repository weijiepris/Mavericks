import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize('weijie-mavericks', 'postgres', '1234', {
    host: 'db',
    dialect: 'postgres',
    port: 5433,
})