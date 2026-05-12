import { useMutation } from "@tanstack/react-query";
import { register } from "./companyApi";

export const userRegisterCompany = () => {

    return useMutation({
        mutationFn: register,
    })
}