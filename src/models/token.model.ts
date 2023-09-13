import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/sequelize';

class Token extends Model {
    id?: number;
    userId!: number;
    token!: string;
}

Token.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING
}, {
    sequelize,
    tableName: 'token',
    modelName: 'Token',
});


export default Token;

export type TokenModel = typeof Token;