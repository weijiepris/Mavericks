import { Request, Response } from 'express'
import Employee from '../models/employee.model';
import { createEmployee, getEmployees, getEmployeeById, updateEmployeeById, deleteEmployeeById } from '../service/employee.service';
import _ from 'lodash';

export async function getEmployeeHandler(
    req: Request,
    res: Response
) {
    try {
        const employees: Employee[] = await getEmployees();
        return res.status(200).send(employees);
    } catch (e: any) {
        return res.status(500).send(e.message);
    }
}

export async function createEmployeeHandler(
    req: Request,
    res: Response) {
    try {
        const employee: Employee = req.body;
        const employees: Employee = await createEmployee(employee);
        return res.status(200).send(employees);
    } catch (e: any) {
        return res.status(500).send(e.message); 
    }
}

export async function getEmployeeByIdHandler(
    req: Request,
    res: Response) {
    try {
        const id: number = parseInt(req.params.id, 10);
        const employee: Employee | null = await getEmployeeById(id);

        if (!employee) {
            return res.status(404).send(`employee with id ${id} not found`);
        }

        return res.status(200).send(employee);
    } catch (e: any) {
        return res.status(500).send(e.message);
    }
}

export async function updateEmployeeByIdHandler(
    req: Request,
    res: Response) {
    try {
        const id: number = parseInt(req.params.id, 10);
        const employee: Employee | null = await getEmployeeById(id);
        if (!employee) {
            return res.status(404).send(`employee with id ${id} not found`);
        }

        const employeeEndGoal = req.body;

        if (_.isEqual(_.omit(employee.dataValues, "id", "createdAt", "updatedAt"), employeeEndGoal)) {
            return res.sendStatus(304);
        }

        const updatedEmployee: Employee = await updateEmployeeById(id, employeeEndGoal);

        return res.status(200).send(updatedEmployee);

    } catch (e: any) {
        return res.status(500).send(e.message);
    }
}

export async function deleteEmployeeByIdHandler(
    req: Request,
    res: Response) {
    try {
        const id: number = parseInt(req.params.id, 10);
        const employee = await getEmployeeById(id);
        if (!employee) {
            return res.status(404).send(`employee with id ${id} not found`);
        }

        await deleteEmployeeById(id);

        res.sendStatus(204);

    } catch (e: any) {
        return res.status(500).send(e.message);
    }
}