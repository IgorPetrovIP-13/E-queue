import MyDynamicQueuesAppointments from "@/modules/i/dashboard/myDynamicQueuesAppointments/MyDynamicQueuesAppointments";
import MyNearestClients from "@/modules/i/dashboard/myNearestClients/MyNearestClients";
import MyNearestDynamicQueuesClients from "@/modules/i/dashboard/myNearestDynamicQueuesClients/MyNearestDynamicQueuesClients";
import MyTodayAppointments from "@/modules/i/dashboard/myTodayAppointments/MyTodayAppointments";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";

export default function DashboardPage() {
  return (
    <section className="flex grid grid-cols-2 gap-4 w-full">
      <Card>
        <CardHeader>Мої сьогоднішні записи у черги</CardHeader>
        <Divider />
        <CardBody>
					<MyTodayAppointments />
				</CardBody>
      </Card>
      <Card>
        <CardHeader>Мої записи у живі черги</CardHeader>
        <Divider />
        <CardBody>
					<MyDynamicQueuesAppointments />
				</CardBody>
      </Card>
      <Card>
        <CardHeader>Найближчі клієнти у чергах</CardHeader>
        <Divider />
        <CardBody>
					<MyNearestClients />
				</CardBody>
      </Card>
      <Card>
        <CardHeader>Найближчі клієнти у живих чергах</CardHeader>
        <Divider />
        <CardBody>
					<MyNearestDynamicQueuesClients />
				</CardBody>
      </Card>
    </section>
  );
}
