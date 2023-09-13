import express from 'express';
import _ from 'lodash'
import { getAllDepartmentHandler } from '../controller/department.controller';
const router = express.Router();

router.get("/", getAllDepartmentHandler);

export default router;
