import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/sequelize';

class Employee extends Model {
    id?: number;
    name!: string;
    salary!: number;
    departmentId!: number;
    department?: string;
}

Employee.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING,
    salary: DataTypes.INTEGER,
    departmentId: DataTypes.INTEGER
}, {
    sequelize,
    tableName: 'employee',
    modelName: 'Employee',
});
export default Employee;

export type EmployeeModel = typeof Employee;