import { Card } from "@heroui/card";

import ExecutorDynamicQueue from "@/modules/i/executor-dynamic-queue/ExecutorDynamicQueue";

export default async function ExecutorStaticQueuePage() {
  return (
    <Card>
      <ExecutorDynamicQueue />
    </Card>
  );
}
