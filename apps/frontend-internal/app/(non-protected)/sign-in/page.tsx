import { UserRoundSearch } from "lucide-react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";

import SignInForm from "@/modules/non-ptotected/sign-in/SignInForm";

export default function SignInPage() {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader className="flex justify-between">
        <div className="flex items-center gap-2">
          <UserRoundSearch />
          <h1 className="text-xl">Вхід</h1>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <SignInForm />
      </CardBody>
    </Card>
  );
}
