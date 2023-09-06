import { z, TypeOf } from "zod";

export const EmployeeSchema = z.object({
    body: z.object({
        id: z.number().optional(),
        name: z.string({
            required_error: "Name is required"
        }),
        salary: z.number({
            required_error: "Salary is required",
        }),
        department: z.string({
            required_error: "Department is required",
        }),
    })
});

export const EmployeeIdSchema = z.object({
    id: z.number(),
});

export type CreateEmployeeSchema = Omit<TypeOf<typeof EmployeeSchema>, 'body.id'>;
