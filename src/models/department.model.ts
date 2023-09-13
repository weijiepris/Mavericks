import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/sequelize';

class Department extends Model {
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