"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Spinner
} from "@heroui/react";
import { useEffect, useState } from "react";
import UiNoContent from "@repo/ui/components/uiNoContent";
import { dynamicQueueService } from "@repo/api/services/dynamic-queue/dynamic-queue.service";
import { useProfile } from "@repo/core/hooks/useProfile";

import { useLeaveFromQueueMutation } from "./hooks/useLeaveFromMutation";

export default function AppointmentsList() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<any[]>([]);

  const { data: userData, isLoading: isUserLoading } = useProfile();

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const rawData = await dynamicQueueService.getAsClient();

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

  const onSuccessLeaveFromQueue = (appointmentId: string) => {
    setData(prev => prev.filter(item => item._id !== appointmentId));
  };

  const { mutate } = useLeaveFromQueueMutation(onSuccessLeaveFromQueue);

  if (isLoading || isUserLoading) {
    return (
      <div className="w-full h-[400px] flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!data.length) {
    return <UiNoContent text="Не знайдено ваших реєстрацій у живі черги" />;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {data.map((item, index) => {
        const posititionInQueue = item.appointments.findIndex(
          element => element._id === userData?._id
        );

        return (
          <Card key={index}>
            <CardHeader className="flex justify-between">
              <p>
                {item.title} / {item.organization_id.organization_title}
              </p>
              <p className="text-sm text-primary">id: {item._id}</p>
            </CardHeader>
            <Divider />
            <CardBody className="flex flex-col gap-4 justify-center">
              <p className="text-center">Ваша поточна позиція в черзі</p>
              <div className="p-4 rounded-full bg-default-100 w-32 h-32 m-auto flex items-center justify-center text-5xl text-primary">
                <p>{posititionInQueue + 1}</p>
              </div>
              <div>
                <p className="text-default-500">{item.description}</p>
              </div>
            </CardBody>
            <Divider />
            <CardFooter>
              <Button
                className="w-full"
                color="danger"
                variant="flat"
                onPress={() => mutate({ id: item._id })}
              >
                Покинути чергу
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
