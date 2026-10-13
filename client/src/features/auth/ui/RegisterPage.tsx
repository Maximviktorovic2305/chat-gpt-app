"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import Link from "next/link";
import { useState } from "react";
import { useAuthActions } from "../model/use-auth";
import type { RegisterCredentials } from "../model/types";
import { ROUTES } from "@/shared/config";
import { useRouter } from "next/navigation";
import { ConsentFields, LegalLinks } from "@/shared/ui/legal";
import { LEGAL_VERSION } from "@/shared/config";
import type { BaseSyntheticEvent } from "react";

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterCredentials>();
  const [registerError, setRegisterError] = useState<string | null>(null);
  const { register: registerForm } = useAuthActions();
  const router = useRouter();

  const onSubmit = async (
    data: RegisterCredentials,
    event?: BaseSyntheticEvent,
  ) => {
    if (!(event?.target instanceof HTMLFormElement)) return;
    const form = new FormData(event.target);
    if (
      form.get("acceptTerms") !== "on" ||
      form.get("acceptDataProcessing") !== "on"
    )
      return;
    setRegisterError("");
    try {
      await registerForm({
        ...data,
        acceptTerms: true,
        acceptDataProcessing: true,
        legalVersion: LEGAL_VERSION,
      });
      router.push(ROUTES.chat);
      router.refresh();
    } catch {
      setRegisterError("Не удалось зарегистрироваться");
    }
  };

  return (
    <div className="size-full min-h-screen text-muted fixed flex text-white items-center justify-center">
      <div className="fixed bg-secondary bg-[url('/fon.jpg')] bg-cover top-0 px-3 left-0 right-0 bottom-0">
        <div className="flex items-center font-bold gap-3 pt-3 pr-3 justify-self-end">
          <Link
            href={ROUTES.home}
            className="text-muted duration-200 hover:text-primary"
          >
            На главную
          </Link>
          <Link
            href={ROUTES.chat}
            className="text-muted duration-200 hover:text-primary"
          >
            Чат
          </Link>
        </div>
        <div className="flex items-center justify-center shadow-md shadow-primary mt-[10%] rounded-lg max-w-xl p-5 mx-auto bg-slate-800">
          <form
            className="w-full max-w-[400px] flex flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <span className="text-center text-xl">Регистрация</span>

            {/* Имя */}
            <div className="flex flex-col gap-1">
              <Label className="text-[12px]" htmlFor="name">
                Имя
              </Label>
              <Input
                className="border-white"
                type="text"
                id="name"
                placeholder="Имя..."
                {...register("name", { required: "Имя обязательно" })}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Почта */}
            <div className="flex flex-col gap-1">
              <Label className="text-[12px]" htmlFor="email">
                Почта
              </Label>
              <Input
                className="border-white"
                type="email"
                id="email"
                placeholder="Почта..."
                {...register("email", {
                  required: "Почта обязательна",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Некорректный адрес почты",
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Пароль */}
            <div className="flex flex-col gap-1">
              <Label className="text-[12px]" htmlFor="password">
                Пароль
              </Label>
              <Input
                className="border-white"
                type="password"
                id="password"
                placeholder="Пароль..."
                autoComplete="new-password"
                {...register("password", { required: "Пароль обязателен" })}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            {registerError && (
              <span className="text-red-500 text-sm">{registerError}</span>
            )}

            <ConsentFields />
            <LegalLinks />
            <Button variant="secondary" type="submit">
              Регистрация
            </Button>
            <div className="text-[12px] text-center">
              Есть аккаунт?{" "}
              <Link
                href={ROUTES.login}
                className="text-blue-500 hover:text-blue-700 duration-200 cursor-pointer underline"
              >
                Войти
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
