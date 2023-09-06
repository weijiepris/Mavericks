import { Request, Response, NextFunction } from 'express'
import { z, AnyZodObject } from "zod"

export const validateEmployeeModel = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params
        });
        next();
    } catch (e: any) {
        return res.status(400).send(e.errors);
    }
}

export const validateEmployeeIdModel = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {

        if (isNaN(Number(req.params.id)))
            return res.status(404).send([
                {
                    "code": "invalid_type",
                    "expected": "number",
                    "received": "nan",
                    "path": [
                        "id"
                    ],
                    "message": "Expected number, received nan"
                }
            ]);

        const id = parseInt(req.params.id, 10);

        schema.parse({
            id
        });
        next();
    } catch (e: any) {
        return res.status(404).send(e.errors);
    }
}
