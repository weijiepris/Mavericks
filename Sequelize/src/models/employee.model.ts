import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/sequelize';

// interface EmployeeInput {
//     name: string;
//     salary: number;
//     department: string;
// }

class Employee extends Model {
    id?: number;
    name!: string;
    salary!: number;
    department!: string;
}

Employee.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING,
    salary: DataTypes.INTEGER,
    department: DataTypes.STRING
}, {
    sequelize,
    tableName: 'employees',
    modelName: 'Employee',
});
export default Employee;

export type EmployeeModel = typeof Employee;


// simulate db sequence number
let id: number = 1;

// export const EmployeeModel = {
//     get: () => { return employees },
//     set: (employee: EmployeeModel) => {
//         ++id;
//         employee = { ...employee, id }
//         employees = [...employees, employee];
//     },
//     getLast: () => { return employees[employees.length - 1] },
//     getById: (id: number): EmployeeModel[] => {
//         return employees.filter(employee => employee.id === id)
//     },
//     setById: (id: number, employee: EmployeeModel): EmployeeModel[] => {

//         const index = employees.findIndex(emp => emp.id === id);
//         if (index !== -1) {
//             employees[index] = { ...employees[index], ...employee };
//         }

//         return employees.filter(employee => employee.id === id)
//     },
//     deleteById: (id: number) => {
//         employees = employees.filter(emp => emp.id !== id);
//     }
// }
