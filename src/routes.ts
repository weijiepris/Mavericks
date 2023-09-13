import express, { Request, Response } from 'express';
import { validateEmployeeModel, validateEmployeeIdModel } from './middleware/validateResources';
import { EmployeeIdSchema, EmployeeSchema } from "./schema/employee.schema"
import _ from 'lodash'
import { createEmployeeHandler, getEmployeeHandler, getEmployeeByIdHandler, updateEmployeeByIdHandler, deleteEmployeeByIdHandler } from './controller/employee.controller';
import verifyTokenHandler from './middleware/authenticate';
const router = express.Router();

router.get("/", verifyTokenHandler, getEmployeeHandler);

router.post("/", validateEmployeeModel(EmployeeSchema), createEmployeeHandler);

router.get("/:id", validateEmployeeIdModel(EmployeeIdSchema), getEmployeeByIdHandler);

router.put("/:id", validateEmployeeIdModel(EmployeeIdSchema), validateEmployeeModel(EmployeeSchema), updateEmployeeByIdHandler)

router.delete("/:id", validateEmployeeIdModel(EmployeeIdSchema), deleteEmployeeByIdHandler);

export default router;
