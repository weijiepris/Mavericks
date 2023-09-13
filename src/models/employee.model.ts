import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/sequelize';

interface EmployeeAttributes {
    id: number;
    name: string;
    salary: number;
    departmentId: number;
    department?: string;
}

class Employee extends Model<EmployeeAttributes, EmployeeCreationAttributes> {
    public id!: number;
    public name!: string;
    public salary!: number;
    public departmentId!: number;
    public department?: string;
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
export interface EmployeeCreationAttributes extends Optional<EmployeeAttributes, 'id'> { }