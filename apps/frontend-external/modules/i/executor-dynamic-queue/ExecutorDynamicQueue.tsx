"use client";

import { CardBody, CardFooter, CardHeader } from "@heroui/card";
import {
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Tooltip,
  useDisclosure
} from "@heroui/react";
import { dynamicQueueService } from "@repo/api/services/dynamic-queue/dynamic-queue.service";
import UiNoContent from "@repo/ui/components/uiNoContent";
import { ListOrdered, Plus, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { useAddToQueueMutation } from "./hooks/useAddToQueueMutation";
import { useRemoveUserFromQueueMutation } from "./hooks/useRemoveUserFromQueueMutation";
import { useDeleteDynamicQueueMutation } from "./hooks/useDeleteDynamicQueue";

export default function ExecutorDynamicQueue() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userEmail, setUserEmail] = useState<string>("");

  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();

  const { id } = useParams();

  useEffect(() => {
    let isMounted = true;

    async function fetchData(id: string) {
      try {
        const rawData = await dynamicQueueService.getAsExecutorById(id);

        rawData.appointments.reverse();

        if (isMounted) {
          setData(rawData);
          setLoading(false);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        if (isMounted) setLoading(false);
      }
    }

    if (id) {
      fetchData(id as string);
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  function formatTime(time: string): string {
    const [h, m] = time.split(":").map(part => part.padStart(2, "0"));

    return `${h}:${m}`;
  }

  function getTimeUntilEvent(time: string): string {
    const [h, m] = time.split(":").map(Number);
    const now = new Date();

    let eventTime = new Date();

    eventTime.setHours(h, m, 0, 0);
    if (eventTime <= now) {
      eventTime.setDate(eventTime.getDate() + 1);
    }

    let targetTime = new Date(eventTime.getTime() - 60 * 60 * 1000);

    if (targetTime <= now) {
      eventTime.setDate(eventTime.getDate() + 1);
      targetTime = new Date(eventTime.getTime() - 60 * 60 * 1000);
    }

    const diffMs = targetTime.getTime() - now.getTime();
    const diffMinutes = Math.floor(diffMs / 60000);
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    return `${hours} годин, ${minutes} хвилин`;
  }

  const onSuccessAddCallback = (user: any) => {
    setUserEmail("");
    onClose();
    setData(prevData => {
      if (!prevData) return prevData;

      return {
        ...prevData,
        appointments: [...prevData.appointments, user]
      };
    });
  };

  const onSuccessDeleteCallback = (user: any) => {
    setData(prevData => {
      if (!prevData) return prevData;

      return {
        ...prevData,
        appointments: prevData.appointments.filter(
          (appointment: { _id: any }) => appointment._id !== user._id
        )
      };
    });
    onClose();
  };

  const { mutate, isPending } = useAddToQueueMutation(onSuccessAddCallback);
  const { mutate: deleteMutate } = useRemoveUserFromQueueMutation(
    onSuccessDeleteCallback
  );
  const { mutate: deleteDynamicQueue } = useDeleteDynamicQueueMutation();

  if (loading) {
    return (
      <div className="w-full h-[400px] flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!data) {
    return (
      <CardBody>
        <UiNoContent text="Не знайдено чергу за цим ідентифікатором, можливо вона була видалена" />
      </CardBody>
    );
  }

  return (
    <>
      <CardHeader className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ListOrdered size={25} />
          <h1 className="text-md">
            {data.title} / {data.organization_id.organization_title}
          </h1>
        </div>
        <p className="text-primary">id: {data._id}</p>
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-default-500">Часу до автоочищення черги</p>
            <p>{getTimeUntilEvent(data.work_start_time)}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-default-500">Початок робочого дня</p>
            <p>{formatTime(data.work_start_time)}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-default-500">Кінець робочого дня</p>
            {formatTime(data.work_end_time)}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-default-500">Поточна черга</p>
          <div className="flex gap-4 items-center flex-wrap">
            {data.appointments.map((appointment, index) => (
              <div
                key={index}
                className="relative bg-default-100 p-3 rounded-lg"
              >
                <p className="text-sm">
                  {appointment.name} {appointment.surname}
                </p>
                <p className="text-default-500 text-xs">{appointment.email}</p>
                <Tooltip content="Видалити клієнта з черги">
                  <Button
                    isIconOnly
                    className="absolute -right-3 -top-2 rounded-full w-6 h-6 min-w-6"
                    color="danger"
                    size="sm"
                    variant="solid"
                    onPress={() =>
                      deleteMutate({
                        id: id as string,
                        userId: appointment._id
                      })
                    }
                  >
                    <X size={16} />
                  </Button>
                </Tooltip>
              </div>
            ))}
            <Button
              color="primary"
              size="lg"
              startContent={<Plus />}
              variant="faded"
              onPress={onOpen}
            >
              Додати клієнта
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-4 max-w-[500px]">
          <div>
            <p className="text-default-500">Ціна послуги</p>
            <p className="text-primary">
              {data.price ? `₴ ${data.price}` : "Безкоштовно"}
            </p>
          </div>
          <div>
            <p className="text-default-500">Опис послуги</p>
            <p>{data.description}</p>
          </div>
        </div>
      </CardBody>
      <Divider />
      <CardFooter className="flex justify-end">
        <Button
          color="danger"
          variant="flat"
          onPress={() => {
            deleteDynamicQueue({ id: id as string });
          }}
        >
          Видалити чергу
        </Button>
      </CardFooter>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {onClose => {
            return (
              <>
                <ModalHeader className="text-primary">
                  <div className="flex items-center gap-2">
                    <Plus size={20} />
                    <h2>Додати клієнта до черги</h2>
                  </div>
                </ModalHeader>
                <ModalBody>
                  <Input
                    label="Email клієнта"
                    type="email"
                    validate={value => {
                      if (!value) {
                        return "Будь ласка, введіть email клієнта";
                      }
                      if (!/\S+@\S+\.\S+/.test(value)) {
                        return "Будь ласка, введіть коректний email";
                      }

                      return true;
                    }}
                    value={userEmail}
                    onChange={e => setUserEmail(e.target.value)}
                  />
                  <p className="text-default-500 text-sm">
                    Клієнт має бути зареєстрованим на платформі, щоб додати його
                    до черги. У разі успішного додавання, клієнта буде додано на
                    останню позицію черги.
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    isDisabled={!userEmail}
                    isLoading={isPending}
                    startContent={<Plus size={20} />}
                    variant="flat"
                    onPress={() => {
                      mutate({ id: id as string, email: userEmail });
                    }}
                  >
                    Додати
                  </Button>
                  <Button
                    color="danger"
                    variant="flat"
                    onPress={onClose}
                  >
                    Закрити
                  </Button>
                </ModalFooter>
              </>
            );
          }}
        </ModalContent>
      </Modal>
    </>
  );
}
