import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from '../config/sequelize';

interface UserAttributes {
  id: number;
  username: string;
  password: string;
  departmentId: number;
}

class User extends Model<UserAttributes, UserCreationAttributes> {
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


export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }
export type UserModel = typeof User;
export default User;

