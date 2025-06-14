"use client";

import { useEffect, useState } from "react";
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

export const columns = [
  { name: "Організація", uid: "name" },
  { name: "Назва черги", uid: "queue_name" },
  { name: "Позиція в черзі", uid: "time" },
  { name: "Дії", uid: "actions" }
];

const MyNearestDynamicQueuesClients = () => {
  const [data, setData] = useState<IGetMyTodayAppointmentsRes[]>([]);

  useEffect(() => {
    async function fetchData() {

    }

    fetchData();
  }, []);

	if (!data.length) {
		return (<UiNoContent text="Записи відсутні"/>);
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
        {item => (
          <TableRow key={item._id}>
            <TableCell>{item.organization_title}</TableCell>
            <TableCell>{item.title}</TableCell>
            <TableCell>{item.time}</TableCell>
            <TableCell>
              <div className="flex items-center justify-center gap-2">
                <Tooltip content="Детальніше пр чергу">
                  <span className="text-default-400 cursor-pointer active:opacity-50">
                    <EyeIcon size={18} />
                  </span>
                </Tooltip>
                <Tooltip
                  color="danger"
                  content="Покинути чергу"
                >
                  <span className="text-danger cursor-pointer active:opacity-50">
                    <Trash2 size={18}/>
                  </span>
                </Tooltip>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default MyNearestDynamicQueuesClients;
