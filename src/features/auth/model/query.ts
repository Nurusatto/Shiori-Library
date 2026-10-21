import { useMutation } from "@tanstack/react-query";
import { register, login } from "./api";

export const useRegister = () => useMutation({ mutationFn: register });
export const useLogin = () => useMutation({ mutationFn: login });
