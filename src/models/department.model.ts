import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from '../config/sequelize';

interface DepartmentAttributes {
  id: number;
  name?: string;
}

class Department extends Model<DepartmentAttributes, DepartmentCreationAttributes> {
  id?: number;
  name!: 'HR' | 'PS' | 'ADMIN';
}

Department.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: DataTypes.STRING
}, {
  sequelize,
  tableName: 'department',
  modelName: 'Department',
});


export default Department;
export type DepartmentModel = typeof Department;
export interface DepartmentCreationAttributes extends Optional<DepartmentAttributes, 'id'> { }