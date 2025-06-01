import { Card } from "@heroui/card";

import OrganizationRequest from "@/modules/i/organization-request/OrganizationRequest";

export default function OrganizationRequestPage() {

  return (
    <Card className="animate-slideInDown w-full">
        <OrganizationRequest />
    </Card>
  );
}
