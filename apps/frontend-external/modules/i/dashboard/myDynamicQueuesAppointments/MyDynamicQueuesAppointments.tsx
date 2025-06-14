"use client";

import { useEffect, useState } from "react";
import { appointmentService } from "@repo/api/services/appointment/appointment.service";
import { addToast } from "@heroui/toast";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip
} from "@heroui/react";
import { IGetMyTodayAppointmentsRes } from "@repo/api/services/appointment/appointment.types";
import { EyeIcon, Trash2 } from "lucide-react";
import UiNoContent from "@repo/ui/components/uiNoContent";
import { dynamicQueueService } from "@repo/api/services/dynamic-queue/dynamic-queue.service";
import { useProfile } from "@repo/core/hooks/useProfile";

export const columns = [
  { name: "Позиція в черзі", uid: "position" },
  { name: "Назва черги", uid: "queue_name" },
  { name: "Очікуваний час обслуговування", uid: "time" },
  { name: "Ціна послуги", uid: "price" }
];

const MyDynamicQueuesAppointments = () => {
  const [data, setData] = useState<any[]>([]);
  const { data: profile } = useProfile();

  useEffect(() => {
    async function fetchData() {
      try {
        const rawData = await dynamicQueueService.getAsClient();
        console.log(rawData);
        setData(rawData);
      } catch (error) {
        addToast({
          color: "danger",
          title: "Помилка",
          description:
            "Не вдалося отримати дані про ваші записи в динамічних чергах."
        });
      }
    }

    fetchData();
  }, []);

  if (!data.length) {
    return <UiNoContent text="Записи відсутні" />;
  }

  return (
    <Table>
      <TableHeader columns={columns}>
        {column => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={data}>
        {item => {
          const posititionInQueue = item.appointments.findIndex(
            element => element._id === profile?._id
          );

          return (
            <TableRow key={item._id}>
              <TableCell>
                <div className="bg-default-100 w-8 h-8 flex items-center justify-center rounded-full">
                  {posititionInQueue + 1}
                </div>
              </TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.work_time_estimation} хв.</TableCell>
              <TableCell className="text-primary">{item.price ? `${item.price} гривень` : 'Послуга безкоштовна'}</TableCell>
            </TableRow>
          );
        }}
      </TableBody>
    </Table>
  );
};

export default MyDynamicQueuesAppointments;
