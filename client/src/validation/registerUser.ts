import {z} from "zod";

export const registerUserSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirm_password: z.string().min(8, "Password must be at least 8 characters long"),
}).refine((data) => data.password === data.confirm_password, {
    message: "Password doesn't match",
    path: ["confirm_password"]
})

export type RegisterUserFormFields = z.infer<typeof registerUserSchema>;