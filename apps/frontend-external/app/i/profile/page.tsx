import { Card, CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { headers } from "next/headers";

import { getRouteValue } from "@/utils/getRouteValue";
import UpdateProfileForm from "@/modules/i/profile/UpdateProfileForm";
import { Route } from "@/common/enums/routes-enum";

export default async function ProfilePage() {
  const headerList = await headers();
  const pathname = headerList.get("x-current-path");
  const { title, icon: Icon } = getRouteValue(pathname as Route);

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
        <UpdateProfileForm />
      </CardBody>
    </Card>
  );
}
