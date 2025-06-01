import { getRouteSSR } from "@repo/core/utils/getRouteSSR";

import { getRouteValue } from "@/utils/getRouteValue";
import { Route } from "@/common/enums/routes-enum";
import OrganizationRequests from "@/modules/i/organization-requests/OrganizationRequests";

export default async function OrganizationRequestsPage() {
  const route = await getRouteSSR();

  const { title, icon: Icon } = getRouteValue(route as Route);

  return (
    <>
      <div className="flex items-center gap-2">
        <Icon size={21} />
        <h1 className="text-md">{title}</h1>
      </div>
			<OrganizationRequests />
    </>
  );
}
