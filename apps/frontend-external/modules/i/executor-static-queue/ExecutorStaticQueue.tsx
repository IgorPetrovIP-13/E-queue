"use client";

import { CardBody, CardHeader } from "@heroui/card";
import { Button, Calendar, Divider, Spinner } from "@heroui/react";
import { staticQueueService } from "@repo/api/services/static-queue/static-queue.service";
import UiNoContent from "@repo/ui/components/uiNoContent";
import { ListOrdered, File } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getLocalTimeZone, today, CalendarDate } from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";
import { daysOfWeek } from "@repo/core/constants/weekdays";
import Link from "next/link";

export default function ExecutorStaticQueue() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [calendarDate, setCalendarDate] = useState<CalendarDate>(
    today(getLocalTimeZone())
  );

  const activeAppointments = useMemo(() => {
    if (!data) return [];
    const calendarDateString = `${calendarDate.day}.${calendarDate.month}.${calendarDate.year}`;

    const appointments = data?.appointments.filter(appointment => {
      return appointment.date === calendarDateString;
    });

    return appointments;
  }, [data, calendarDate]);

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
              isDateUnavailable={date => {
                const jsDate = date.toDate(getLocalTimeZone());
                const dayIndex = jsDate.getDay();
                const day = daysOfWeek[dayIndex];

                return !data.days_of_service.includes(day);
              }}
              minValue={today(getLocalTimeZone())}
              // eslint-disable-next-line react/jsx-sort-props
              onChange={setCalendarDate}
              aria-label="Date"
              //@ts-expect-error
              value={calendarDate}
            />
          </I18nProvider>
          <div className="flex flex-1 flex-col gap-2">
            <p className="text-default-500">
              Записи на {calendarDate.day}.{calendarDate.month}.
              {calendarDate.year}
            </p>
            {activeAppointments.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                {activeAppointments.map((appointment, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-1 bg-default-100 rounded-lg px-4 py-2"
                  >
                    <p className="text-primary text-lg">
                      {appointment.start_time} - {appointment.end_time}
                    </p>
                    <p>
                      {appointment.user_id.surname} {appointment.user_id.name}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <UiNoContent text={"Записи на цей день відсутні"} />
            )}
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
    </>
  );
}
