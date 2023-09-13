import { Request, Response } from 'express'
import _ from 'lodash';
import { getAllDepartment } from '../service/department.service';

require('dotenv').config();

export async function getAllDepartmentHandler(
    req: Request,
    res: Response
) {
    try {
        const departments = await getAllDepartment();
        return res.status(200).send({ departments });
    } catch (e: any) {
        return res.status(500).send(e.message);
    }
}
