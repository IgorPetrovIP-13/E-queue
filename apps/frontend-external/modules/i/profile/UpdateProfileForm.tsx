"use client";

import { Button } from "@heroui/button";
import { Input } from "@heroui/react";
import { Controller, ControllerProps, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import UiDropzone from "@repo/ui/components/uiDropzone";
import { IUpdateProfileReq } from "@repo/api/services/profile/profile.types";
import { uploadFileService } from "@repo/api/services/upload-file/upload-file.service";

import { useUpdateProfileMutation } from "./hooks/useUpdateProfileMutation";
import { IFormValues as IFormValuesClient } from "./types/types";
import { useUpdateProfileForm } from "./hooks/useUpdateProfileForm";
import { preSendClear } from "@repo/core/utils/preSendClear";

const RHFController = Controller as React.FC<
  ControllerProps<IFormValuesClient, "avatar">
>;

export default function UpdateProfileForm() {
  const router = useRouter();
  const { mutate: mutateUpdateProfile, isPending: isUpdatingProfile } =
    useUpdateProfileMutation();
  const {
    isInitialDataLoading,
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, dirtyFields }
  } = useUpdateProfileForm();

  const isLoading = isInitialDataLoading || isSubmitting || isUpdatingProfile;

  const onSubmit: SubmitHandler<IFormValuesClient> = async (
    values: IFormValuesClient
  ) => {
    const payload: IUpdateProfileReq = {
      name: values.name!,
      surname: values.surname!,
      email: values.email!,
      avatar: null
    };

    if (values.avatar && typeof values.avatar !== "string") {
      payload.avatar = await uploadFileService.uploadFile(values.avatar);
    }

    // mutateUpdateProfile(preSendClear(payload));
  };

	if (isInitialDataLoading) {
		return <></>;
	}

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <RHFController
          control={control}
          name="avatar"
          render={({ field }) => <UiDropzone {...field} />}
        />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              {...register("name")}
              errorMessage={errors.name?.message?.toString()}
              id="name"
              isInvalid={Boolean(errors.name)}
              label="Ім'я"
              size="sm"
            />
            <Input
              {...register("surname")}
              errorMessage={errors.surname?.message?.toString()}
              id="surname"
              isInvalid={Boolean(errors.surname)}
              label="Прізвище"
              size="sm"
            />
          </div>
          <Input
            {...register("email")}
            errorMessage={errors.email?.message?.toString()}
            id="email"
            isInvalid={Boolean(errors.email)}
            label="Email"
            size="sm"
            type="email"
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button
            isDisabled={isSubmitting}
            type="button"
            variant="flat"
            onPress={() => router.back()}
          >
            Скасувати
          </Button>
          <Button
            color="primary"
            isDisabled={
              Boolean(Object.keys(errors).length) || isLoading || !Object.keys(dirtyFields).length
            }
            isLoading={isLoading}
            type="submit"
            variant="flat"
          >
            Підтвердити зміни
          </Button>
        </div>
      </div>
    </form>
  );
}
