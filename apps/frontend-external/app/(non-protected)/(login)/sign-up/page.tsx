import { UserRoundPlus } from "lucide-react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/react";

import SignUpForm from "@/modules/non-ptotected/sign-up/SignUpForm";

export default function SignUpPage() {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader className="flex justify-between">
        <div className="flex items-center gap-2">
          <UserRoundPlus />
          <h1 className="text-xl">Реєстрація</h1>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <SignUpForm />
      </CardBody>
    </Card>
  );
}
