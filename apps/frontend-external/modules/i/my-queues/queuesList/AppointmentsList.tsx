"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Spinner
} from "@heroui/react";
import { useEffect, useState } from "react";
import { Building2 } from "lucide-react";
import { appointmentService } from "@repo/api/services/appointment/appointment.service";
import UiNoContent from "@repo/ui/components/uiNoContent";

export default function AppointmentsList() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const rawData = await appointmentService.getMyAppointments();

        if (isMounted) {
          setData(rawData);
          setIsLoading(false);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-[400px] flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (data.length === 0) {
    return <UiNoContent text="Не знайдено ваших реєстрацій у черги" />;
  }

  return (
    <div className="flex flex-col gap-4">
      {data.map((item, index) => (
        <Card key={index}>
          <CardHeader className="flex justify-between">
            <p>
              {item.queue_id.title},{" "}
              <span className="text-primary">
                {item.date}, {item.start_time} - {item.end_time}
              </span>
            </p>
            <p className="text-sm text-primary">id: {item._id}</p>
          </CardHeader>
          <Divider />
          <CardBody className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-default-500">Організація</p>
              <div className="flex gap-2">
                {item.queue_id.organization_id.organization_logo ? (
                  <Image
                    className="rounded-full"
                    src={item.queue_id.organization_id.organization_logo}
                    width={24}
                  />
                ) : (
                  <Building2 size={24} />
                )}
                <p>
                  {item.queue_id.organization_id.organization_type_id.title}{" "}
                  {item.queue_id.organization_id.organization_title}
                </p>
              </div>
            </div>
            <div>
              <p className="text-default-500">Опис</p>
              <p>{item.queue_id.description}</p>
            </div>
          </CardBody>
          <Divider />
          <CardFooter className="flex justify-end gap-2">
            <Button color="primary" variant="flat">Детальніше</Button>
						<Button color="danger" variant="flat">
							Покинути чергу
						</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
