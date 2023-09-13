import Department from "../models/department.model";

export const getAllDepartment = async () => await Department.findAll();