"use client";

import styles from "./style.module.scss";
import { useForm } from "react-hook-form";
import { authSchema } from "@/features/auth/model/schema";
import { yupResolver } from "@hookform/resolvers/yup";

import { formRegister } from "../../model/type";
import { toast } from "sonner";
import { useLogin, useRegister } from "../../model/query";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/app/_store/useUserStore";
import Link from "next/link";
import { ShioriLogo } from "@/shared/image/react-svg/logo";

type prop = {
  type: "register" | "login";
};

export const AuthForm = ({ type }: prop) => {
  const regiter = useRegister();
  const login = useLogin();
  const currentMutation = type === "register" ? regiter : login;
  const setAuth = useUserStore((state) => state.setAuth);
  const setProfile = useUserStore((state) => state.setProfile);
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(authSchema),
  });

  const isRegister = type === "register";
  const buttonText = isRegister
    ? isSubmitting
      ? "Registering..."
      : "Register"
    : isSubmitting
      ? "Logging in..."
      : "Login";

  const onSubmit = (data: formRegister) => {
    console.log(data);
    currentMutation.mutate(data, {
      onError: (err) => toast.error(err.message),
      onSuccess: (res) => {
        toast.success(
          res.message ||
            (type === "register" ? "Успешная регистрация!" : "С возвращением!"),
        );

        if (type === "register") {
          router.push("/login");
        } else {
          setAuth(res.user);
          setProfile(res.profile);

          router.push("/");
        }
      },
    });
  };

  return (
    <form action="" className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formLogo}>
        <ShioriLogo />
      </div>
      <div className={styles.formField}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          autoComplete="email"
          className={styles.formInput}
          {...register("email")}
        />
        {errors.email && (
          <p className={styles.formError}>{errors.email.message}</p>
        )}
      </div>
      <div className={styles.formField}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          className={styles.formInput}
          autoComplete="new-password"
          {...register("password")}
        />
        {errors.password && (
          <p className={styles.formError}>{errors.password.message}</p>
        )}
      </div>

      {errors.root && (
        <div className={styles.formField}>
          {errors.root?.message && (
            <p className={styles.formError}>{errors.root.message}</p>
          )}
        </div>
      )}

      <button type="submit" className={styles.formButton}>
        {buttonText}
      </button>

      <div className={styles.formSwitch}>
        {type === "login" && (
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/register" className={styles.formLink}>
              Sign up
            </Link>
          </p>
        )}
        {type === "register" && (
          <p>
            Already have an account?{" "}
            <Link href="/login" className={styles.formLink}>
              Sign in
            </Link>
          </p>
        )}
      </div>
    </form>
  );
};
