"use client";

import {
  Button,
  CardBody,
  CardFooter,
  cn,
  Divider,
  NumberInput,
  Radio,
  RadioGroup,
  Switch,
  Textarea,
  TimeInput,
  Input,
  Spinner
} from "@heroui/react";
import { addToast } from "@heroui/toast";
import { organizationService } from "@repo/api/services/organization/organization.service";
import { IGetOrganizationRes } from "@repo/api/services/organization/organization.types";
import { formatAxiosError } from "@repo/core/utils/formatAxiosError";
import { Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useProfile } from "@repo/core/hooks/useProfile";
import { UiAutocomplete } from "@repo/ui/components/uiAutocomplete";
import { Controller, SubmitHandler } from "react-hook-form";
import { preSendClear } from "@repo/core/utils/preSendClear";
import UiNoContent from "@repo/ui/components/uiNoContent";
import { ICreateDynamicQueueReq } from "@repo/api/services/dynamic-queue/dynamic-queue.types";

import { useCreateQueueForm } from "./hooks/useCreateQueueForm";
import { useCreateDynamicQueueMutation } from "./hooks/useCreateDynamicQueueMutation";

export default function CreateDynamicQueue() {
  const [isLoading, setIsLoading] = useState(true);
  const [organizations, setOrganizations] = useState<IGetOrganizationRes[]>([]);
  const [currentOrganizationId, setCurrentOrganizationId] = useState<
    string | null
  >(null);
  const profile = useProfile();
  const [isFreeSelected, setIsFreeSelected] = useState(true);

  const {
    setValue,
    handleSubmit,
    register,
    control,
    formState: { errors, isValid }
  } = useCreateQueueForm();
  const { mutate, isPending } = useCreateDynamicQueueMutation();

  const executors = useMemo(
    () =>
      organizations.flatMap(org => {
        const users = org.members;

        return users.map(user => ({
          key: user.user_id._id,
          label: `${user.user_id.name} ${user.user_id.surname}, ${user.organization_role}`
        }));
      }),
    [organizations, profile]
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const organizationRequests =
          await organizationService.getMyOrganizations();

        setOrganizations(organizationRequests);
        setIsLoading(false);
      } catch (error) {
        addToast({
          color: "danger",
          title: "Помилка завантаження даних",
          description: formatAxiosError(error)
        });
      }
    }

    fetchData();
  }, []);

  const onSubmitForm: SubmitHandler<ICreateDynamicQueueReq> = async (
    values: ICreateDynamicQueueReq
  ) => {
    const payload: ICreateDynamicQueueReq = {
      ...values,
      organization_id: values.organization_id!
    };
		
    mutate(preSendClear(payload));
  };

  if (isLoading) {
    return (
      <div className="w-full h-[400px] flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (organizations.length === 0) {
    return (
      <CardBody>
        <UiNoContent text="Для створення черги, необхідно створити або вступили в організацію" />
      </CardBody>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <CardBody className="overflow-hidden">
        <div className="flex flex-col gap-6">
          <RadioGroup
            label="Оберіть організацію для створення живої черги"
            value={currentOrganizationId}
            onValueChange={value => {
              setCurrentOrganizationId(value);
              setValue("organization_id", value);
            }}
          >
            {organizations.map((org, index) => (
              <Radio
                key={index}
                classNames={{
                  base: cn(
                    "inline-flex w-full m-0 bg-content1 hover:bg-content2 items-center justify-between",
                    "flex-row-reverse cursor-pointer rounded-lg gap-4 p-4 border-2 border-default-100",
                    "data-[selected=true]:border-primary max-w-full"
                  )
                }}
                description={org.organization_description}
                value={org._id}
              >
                {org.organization_title}
              </Radio>
            ))}
          </RadioGroup>
          {currentOrganizationId && (
            <div className="flex flex-col gap-6">
              <Divider />
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1 text-default-500">
                  Робочі години (за 1 годину до початку робочого дня черга
                  автоматично очищується)
                  <div className="flex gap-2">
                    <TimeInput
                      isRequired
                      errorMessage={errors.work_start_time?.message?.toString()}
                      granularity="minute"
                      hourCycle={24}
                      isInvalid={!!errors.work_start_time}
                      label="Початок робочого дня"
                      size="sm"
                      onChange={value => {
                        if (
                          !value ||
                          typeof value.hour !== "number" ||
                          typeof value.minute !== "number"
                        ) {
                          setValue("work_start_time", "", {
                            shouldValidate: true
                          });
                        }
                        const stringValue = `${value?.hour}:${value?.minute}`;

                        setValue("work_start_time", stringValue, {
                          shouldValidate: true
                        });
                      }}
                    />
                    <TimeInput
                      isRequired
                      errorMessage={errors.work_end_time?.message?.toString()}
                      granularity="minute"
                      hourCycle={24}
                      isInvalid={!!errors.work_end_time}
                      label="Кінець робочого дня"
                      size="sm"
                      onChange={value => {
                        if (
                          !value ||
                          typeof value.hour !== "number" ||
                          typeof value.minute !== "number"
                        ) {
                          setValue("work_end_time", "", {
                            shouldValidate: true
                          });
                        }
                        const stringValue = `${value?.hour}:${value?.minute}`;

                        setValue("work_end_time", stringValue, {
                          shouldValidate: true
                        });
                      }}
                    />
                    <Controller
                      control={control}
                      name="work_time_estimation"
                      render={({ field }) => (
                        <NumberInput
                          isRequired
                          className="max-w-md"
                          errorMessage={errors.work_time_estimation?.message?.toString()}
                          isInvalid={!!errors.work_time_estimation}
                          label="Час обслуговування"
                          minValue={1}
                          placeholder="Скільки часу потрібно на обслуговування клієнта"
                          size="sm"
                          startContent={
                            <div className="pointer-events-none flex items-center">
                              <span className="text-default-400 text-small">
                                xв
                              </span>
                            </div>
                          }
                          value={field.value}
                          onValueChange={value => {
                            field.onChange(value);
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1 text-default-500">
                  <Controller
                    control={control}
                    name="executor"
                    render={({ field }) => (
                      <UiAutocomplete
                        isRequired
                        defaultItems={executors}
                        errorMessage={errors.executor?.message?.toString()}
                        isInvalid={!!errors.executor}
                        label="Виконавець"
                        size="sm"
                        onChange={value => {
                          field.onChange(value);
                        }}
                      />
                    )}
                  />
                </div>
                <Divider />
                <Input
                  {...register("title")}
                  isRequired
                  errorMessage={errors.title?.message?.toString()}
                  isInvalid={!!errors.title}
                  label="Назва послуги"
                  size="sm"
                />
                <Textarea
                  {...register("description")}
                  label="Oпис послуги"
                  placeholder="Максимально детально опішіть послугу, яку ви надаєте, щоб клієнти знали, до чого готуватись"
                />
                <div className="flex gap-4 items-center">
                  <Controller
                    control={control}
                    name="price"
                    render={({ field }) => (
                      <NumberInput
                        className="max-w-md"
                        isDisabled={isFreeSelected}
                        label="Вартість послуги"
                        minValue={1}
                        size="sm"
                        startContent={
                          <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">
                              ₴
                            </span>
                          </div>
                        }
                        value={field.value ?? undefined}
                        onValueChange={value => {
                          if (!value) {
                            field.onChange(null);
                          } else {
                            field.onChange(value);
                          }
                        }}
                      />
                    )}
                  />
                  <Switch
                    defaultSelected
                    size="sm"
                    onValueChange={isSelected => {
                      if (!isSelected) {
                        setValue("price", 1, {
                          shouldValidate: true
                        });
                      } else {
                        setValue("price", null, {
                          shouldValidate: true
                        });
                      }
                      setIsFreeSelected(isSelected);
                    }}
                  >
                    <p className="whitespace-nowrap">Послуга безкоштовна</p>
                  </Switch>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardBody>
      <Divider />
      <CardFooter className="flex items-center justify-end">
        <Button
          className=""
          color="primary"
          isDisabled={!isValid}
          isLoading={isPending}
          startContent={<Plus size={20} />}
          type="submit"
        >
          Створити чергу
        </Button>
      </CardFooter>
    </form>
  );
}
