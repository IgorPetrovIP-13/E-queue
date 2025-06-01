"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Link,
  Spinner
} from "@heroui/react";
import { useEffect, useState } from "react";
import { Building2 } from "lucide-react";
import UiNoContent from "@repo/ui/components/uiNoContent";
import { dynamicQueueService } from "@repo/api/services/dynamic-queue/dynamic-queue.service";

import { ROUTES } from "@/common/enums/routes-enum";

import { useDeleteDynamicQueueMutation } from "./hooks/useDeleteDynamicQueue";

export default function ExecutorList() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const rawData = await dynamicQueueService.getAsExecutor();

        if (isMounted) {
          setData(rawData);
          setIsLoading(false);
        }
      } catch {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const onDeleteSuccessCallback = (queue_id: string) => {
    setData(prevData => prevData.filter(item => item._id !== queue_id));
  };

  const { mutate: deleteDynamicQueue } = useDeleteDynamicQueueMutation(
    onDeleteSuccessCallback
  );

  if (isLoading) {
    return (
      <div className="w-full h-[400px] flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <UiNoContent text="Не знайдено створених черг, де ви є виконавцем" />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {data.map((item, index) => (
        <Card key={index}>
          <CardHeader className="flex justify-between">
            <p>{item.title}</p>
            <p className="text-sm text-primary">id: {item._id}</p>
          </CardHeader>
          <Divider />
          <CardBody className="flex flex-col gap-4">
            <div className="flex gap-6">
              <div className="flex flex-col gap-1">
                <p className="text-default-500">Поточна довжина черги</p>
                <p className="text-primary">
                  {item.appointments.length} клієнтів
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-default-500">
                  Очікуваний час обслуговування
                </p>
                <p className="text-primary">
                  {item.work_time_estimation * item.appointments.length} хв
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-default-500">Організація</p>
              <div className="flex gap-2">
                {item.organization_id.organization_logo ? (
                  <Image
                    className="rounded-full"
                    src={item.organization_id.organization_logo}
                    width={24}
                  />
                ) : (
                  <Building2 size={24} />
                )}
                <p>
                  {item.organization_id.organization_type_id.title}{" "}
                  {item.organization_id.organization_title}
                </p>
              </div>
            </div>
            <div>
              <p className="text-default-500">Опис</p>
              <p>{item.description}</p>
            </div>
          </CardBody>
          <Divider />
          <CardFooter className="flex justify-end gap-2">
            <Button
              as={Link}
              color="primary"
              href={`${ROUTES.EXECUTOR_DYNAMIC_QUEUE}/${item._id}`}
              variant="flat"
            >
              Перейти до управління чергою
            </Button>
            <Button
              color="danger"
              variant="flat"
              onPress={() => deleteDynamicQueue({ id: item._id })}
            >
              Видалити чергу
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
