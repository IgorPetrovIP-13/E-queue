import { Card, CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { getRouteSSR } from "@repo/core/utils/getRouteSSR";

import CreateOrganizationForm from "@/modules/i/create-organization/CreateOrganizationForm";
import { getRouteValue } from "@/utils/getRouteValue";
import { Route } from "@/common/enums/routes-enum";

export default async function CreateOrganizationPage() {
  const route = await getRouteSSR();

  const { title, icon: Icon } = getRouteValue(route as Route);

  return (
    <Card className="animate-slideInDown w-full">
      <CardHeader className="flex justify-between">
        <div className="flex items-center gap-2">
          <Icon size={21} />
          <h1 className="text-md">{title}</h1>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <CreateOrganizationForm />
      </CardBody>
    </Card>
  );
}
