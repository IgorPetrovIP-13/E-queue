"use client";

import { Button, Divider, Input } from "@heroui/react";
import { Textarea } from "@heroui/input";
import { Controller, SubmitHandler } from "react-hook-form";
import { preSendClear } from "@repo/core/utils/preSendClear";
import { UiAutocomplete } from "@repo/ui/components/uiAutocomplete";
import UiDropzone from "@repo/ui/components/uiDropzone";
import UiMultipleDropzone from "@repo/ui/components/uiMultipleDropzone";
import { CreateOrganizationRequesttClientValidationSchema } from "@repo/api/services/organization-request/organization-request.validation";
import { uploadFileService } from "@repo/api/services/upload-file/upload-file.service";

import { useCreateOrganizationForm } from "./hooks/useCreateOrganizationForm";
import { useCreateOrganizationMutation } from "./hooks/useCreateOrganizationMutation";
import { useAutocompleteData } from "./hooks/useAutocompleteData";

export default function CreateOrganizationForm() {
  const { orgTypes, isLoading } = useAutocompleteData();
  const { mutate, isPending } = useCreateOrganizationMutation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, dirtyFields, isSubmitting }
  } = useCreateOrganizationForm();

  const onSubmit: SubmitHandler<
    CreateOrganizationRequesttClientValidationSchema
  > = async ({ organization_logo, ...rest }) => {
    const uploadedLogo = organization_logo
      ? await uploadFileService.uploadFile(organization_logo)
      : null;

    const payload = {
      ...rest,
      organization_logo: uploadedLogo
    };

    mutate(preSendClear(payload));
  };

  if (isLoading) {
    return <></>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <div>
          <label
            className="text-sm text-default-500 mb-1"
            htmlFor="organization_logo"
          >
            Логотип організації
          </label>
          <Controller
            control={control}
            name="organization_logo"
            render={({ field }) => <UiDropzone {...field} />}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <Controller
            control={control}
            name="organization_type_id"
            render={({ field }) => (
              <UiAutocomplete
                isRequired
                defaultItems={orgTypes}
                errorMessage={errors.organization_type_id?.message?.toString()}
                isInvalid={Boolean(errors.organization_type_id)}
                label="Тип організації"
                size="sm"
                onChange={field.onChange}
              />
            )}
          />
          <Input
            {...register("organization_title")}
            isRequired
            errorMessage={errors.organization_title?.message?.toString()}
            id="organization_title"
            isInvalid={Boolean(errors.organization_title)}
            label="Назва організації"
            size="sm"
          />
        </div>
        <Textarea
          {...register("organization_description")}
          isRequired
          errorMessage={errors.organization_description?.message?.toString()}
          id="organization_description"
          isInvalid={Boolean(errors.organization_description)}
          label="Опис організації"
          placeholder="Опишіть вашу організацію, чим ви займаєтесь, які цілі та завдання має ваша організація"
          size="sm"
        />
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            {...register("organization_website")}
            errorMessage={errors.organization_website?.message?.toString()}
            id="organization_website"
            isInvalid={Boolean(errors.organization_website)}
            label="Веб-сайт організації"
            size="sm"
          />
          <Input
            {...register("desired_connection")}
            isRequired
            errorMessage={errors.desired_connection?.message?.toString()}
            id="desired_connection"
            isInvalid={Boolean(errors.desired_connection)}
            label={"Номер телефону/Telegram/Whatsapp/Email"}
            placeholder="Вкажіть номер телефону, Telegram, Whatsapp або Email для зв'язку з вами"
            size="sm"
          />
        </div>
        <Textarea
          {...register("user_comment")}
          errorMessage={errors.user_comment?.message?.toString()}
          id="user_comment"
          isInvalid={Boolean(errors.user_comment)}
          label="Коментар до заявки"
          placeholder="Вкажіть додаткову інформацію, яка може бути корисною для обробки вашої заявки"
          size="sm"
        />
        <div>
          <label
            className="text-sm text-default-500 mb-1"
            htmlFor="attachments"
          >
            Додатки
          </label>
          <Controller
            control={control}
            name="attachments"
            render={({ field }) => (
              <UiMultipleDropzone onChange={field.onChange} />
            )}
          />
        </div>
        <Divider />
        <div className="flex justify-end">
          <Button
            color="primary"
            isDisabled={
              !isValid || isPending || Object.keys(dirtyFields).length === 1
            }
            isLoading={isSubmitting}
            type="submit"
            variant="flat"
          >
            Залишити заявку
          </Button>
        </div>
      </div>
    </form>
  );
}
