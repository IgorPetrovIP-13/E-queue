"use client";

import { CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Button, Calendar, Divider, Spinner } from "@heroui/react";
import { staticQueueService } from "@repo/api/services/static-queue/static-queue.service";
import { ListOrdered, File } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getLocalTimeZone, today, CalendarDate } from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";
import { ICreateAppointmentReq } from "@repo/api/services/appointment/appointment.types";
import Link from "next/link";
import { daysOfWeek } from "@repo/core/constants/weekdays";

import SlotsTable from "./SlotPicker";
import { useCreateAppointment } from "./hooks/useCreateAppointment";
import UiNoContent from "@repo/ui/components/uiNoContent";

export default function StaticQueue() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [activeStartTime, setActiveStartTime] = useState<string | null>(null);
  const [activeEndTime, setActiveEndTime] = useState<string | null>(null);

  const [calendarDate, setCalendarDate] = useState<CalendarDate>(
    today(getLocalTimeZone())
  );

  const { mutate, isPending } = useCreateAppointment();

  const { id } = useParams();

  useEffect(() => {
    let isMounted = true;

    async function fetchData(id: string) {
      try {
        const rawData = await staticQueueService.getStaticQueueAsUser(id);

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

  const handleSubmit = () => {
    const payload: ICreateAppointmentReq = {
      queue_id: id as string,
      date: `${calendarDate.day}.${calendarDate.month}.${calendarDate.year}`,
      start_time: activeStartTime as string,
      end_time: activeEndTime as string
    };

    mutate(payload);
  };

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
          <I18nProvider locale="uk">
            <Calendar
              aria-label="Date"
              //@ts-expect-error
              value={calendarDate}
              minValue={today(getLocalTimeZone())}
              onChange={setCalendarDate}
              isDateUnavailable={date => {
                const jsDate = date.toDate(getLocalTimeZone());
                const dayIndex = jsDate.getDay();
                const day = daysOfWeek[dayIndex];

                return !data.days_of_service.includes(day);
              }}
            />
          </I18nProvider>
          <SlotsTable
            busySlots={data?.appointments}
            date={`${calendarDate.day}.${calendarDate.month}.${calendarDate.year}`}
            service={{
              work_start_time: data?.work_start_time,
              work_end_time: data?.work_end_time,
              work_break_start_time: data?.work_break_start_time,
              work_break_end_time: data?.work_break_end_time,
              work_time_estimation: data?.work_time_estimation,
              break_time_estimation: data?.break_time_estimation
            }}
            onSelect={slot => {
              const slotData = slot.split(" - ");

              setActiveStartTime(slotData[0]);
              setActiveEndTime(slotData[1]);
            }}
          />
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
        </div>
        <div>
          <p className="text-sm text-default-500 pb-1">
            Шаблони форм для заповнення
          </p>
          <div className="flex flex-col gap-2">
            {data.forms_examples.length ? (
              data.forms_examples.map((attachment, index) => (
                <Button
                  key={index}
                  as={Link}
                  className="w-full text-left justify-start"
                  href={attachment.href}
                  startContent={<File size={20} />}
                  target="_blank"
                  variant="flat"
                >
                  {attachment.name}
                </Button>
              ))
            ) : (
              <p>Відсутні</p>
            )}
          </div>
        </div>
        <div>
          <p className="text-sm text-default-500 pb-1">
            Приклади заповнених форм
          </p>
          <div className="flex flex-col gap-2">
            {data.forms_completed_examples.length ? (
              data.forms_completed_examples.map((attachment, index) => (
                <Button
                  key={index}
                  as={Link}
                  className="w-full text-left justify-start"
                  href={attachment.href}
                  startContent={<File size={20} />}
                  target="_blank"
                  variant="flat"
                >
                  {attachment.name}
                </Button>
              ))
            ) : (
              <p>Відсутні</p>
            )}
          </div>
        </div>
        <div>
          <p className="text-sm text-default-500 pb-1">Додатки до послуги</p>
          <div className="flex flex-col gap-2">
            {data.attachments.length ? (
              data.attachments.map((attachment, index) => (
                <Button
                  key={index}
                  as={Link}
                  className="w-full text-left justify-start"
                  href={attachment.href}
                  startContent={<File size={20} />}
                  target="_blank"
                  variant="flat"
                >
                  {attachment.name}
                </Button>
              ))
            ) : (
              <p>Відсутні</p>
            )}
          </div>
        </div>
      </CardBody>
      <Divider />
      <CardFooter className="flex justify-end gap-2">
        {activeStartTime && activeEndTime && calendarDate && (
          <p className="text-sm text-default-500">
            {calendarDate.day}.{calendarDate.month}.{calendarDate.year},{" "}
            {activeStartTime} - {activeEndTime}
          </p>
        )}
        <Button
          color="primary"
          isDisabled={!activeStartTime || !activeEndTime}
          isLoading={isPending}
          onPress={handleSubmit}
        >
          Записатись в чергу
        </Button>
      </CardFooter>
    </>
  );
}
