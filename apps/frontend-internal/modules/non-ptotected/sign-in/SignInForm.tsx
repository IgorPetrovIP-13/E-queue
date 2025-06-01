"use client";

import { Button } from "@heroui/button";
import { Divider } from "@heroui/react";
import { Input } from "@heroui/input";
import UiPasswordInput from "@repo/ui/components/uiPasswordInput";
import { ISignUpReq } from "@repo/api/services/auth/auth.types";

import { useSignInForm } from "./hooks/useSignInForm";
import { useSignInMutation } from "./hooks/useSignInMutation";

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isValid }
  } = useSignInForm();
  const { mutate, isPending } = useSignInMutation();

  return (
    <form
      onSubmit={handleSubmit((values: ISignUpReq) => {
        mutate(values);
      })}
    >
      <div className="flex flex-col gap-4">
        <Input
          {...register("email")}
          isRequired
          errorMessage={errors.email?.message?.toString()}
          isInvalid={!!errors.email}
          label="Пошта"
          size="sm"
          type="email"
        />
        <UiPasswordInput
          {...register("password")}
          isRequired
          errorMessage={errors.password?.message?.toString()}
          isInvalid={!!errors.password}
          label="Пароль"
          size="sm"
        />
        <Divider />
        <div className="flex justify-end">
          <Button
            color="primary"
            isDisabled={
              !isValid || isPending || !Object.keys(dirtyFields).length
            }
            isLoading={isPending}
            type="submit"
            variant="flat"
          >
            Підтвердити
          </Button>
        </div>
      </div>
    </form>
  );
}
