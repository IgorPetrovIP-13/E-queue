"use client";

import { Button } from "@heroui/button";
import { Divider } from "@heroui/react";
import { Input } from "@heroui/input";
import { SubmitHandler } from "react-hook-form";
import UiPasswordInput from "@repo/ui/components/uiPasswordInput";

import { useSignUpMutation } from "./hooks/useSignUpMutation";
import { useSignUpForm } from "./hooks/useSignUpForm";
import { IFormValues } from "./constants/form-schema";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isValid }
  } = useSignUpForm();
  const { mutate, isPending } = useSignUpMutation();

  const onSubmit: SubmitHandler<IFormValues> = async (values: IFormValues) => {
    const payload = {
      name: values.name,
      surname: values.surname,
      email: values.email,
      password: values.password
    };

    mutate(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            {...register("name")}
            isRequired
            errorMessage={errors.name?.message?.toString()}
            isInvalid={Boolean(errors.name)}
            label="Ім'я"
            size="sm"
          />
          <Input
            {...register("surname")}
            isRequired
            errorMessage={errors.surname?.message?.toString()}
            isInvalid={Boolean(errors.surname)}
            label="Прізвище"
            size="sm"
          />
        </div>
        <Input
          {...register("email")}
          isRequired
          errorMessage={errors.email?.message?.toString()}
          isInvalid={Boolean(errors.email)}
          label="Пошта"
          size="sm"
          type="email"
        />
        <UiPasswordInput
          {...register("password")}
          isRequired
          errorMessage={errors.password?.message?.toString()}
          isInvalid={Boolean(errors.password)}
          label="Пароль"
          size="sm"
        />
        <UiPasswordInput
          {...register("confirmPassword")}
          isRequired
          errorMessage={errors.confirmPassword?.message?.toString()}
          isInvalid={Boolean(errors.confirmPassword)}
          label="Підтвердження паролю"
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
};

export default SignUpForm;
