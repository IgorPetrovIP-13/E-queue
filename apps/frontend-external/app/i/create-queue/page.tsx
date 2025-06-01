import { getRouteSSR } from "@repo/core/utils/getRouteSSR";
import { Card, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";

import { Route } from "@/common/enums/routes-enum";
import CreateQueue from "@/modules/i/create-queue/CreateQueue";
import { getRouteValue } from "@/utils/getRouteValue";

export default async function CreateQueuePage() {
  const route = await getRouteSSR();

  const { title, icon: Icon } = getRouteValue(route as Route);

  return (
    <Card className="animate-slideInDown w-full">
      <CardHeader className="flex items-center gap-2">
        <Icon size={21} />
        <h1 className="text-md">{title}</h1>
      </CardHeader>
      <Divider />
      <CreateQueue />
    </Card>
  );
}
