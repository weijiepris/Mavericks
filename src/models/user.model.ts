import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/sequelize';

class User extends Model {
  id!: number;
  username!: string;
  password!: string;
  departmentId!: number;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  departmentId: DataTypes.INTEGER
}, {
  sequelize,
  tableName: 'user',
  modelName: 'User',
});

export default User;

export type UserModel = typeof User;
