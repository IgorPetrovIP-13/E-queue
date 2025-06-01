import { addToast } from "@heroui/toast";
import { useRouter } from "next/navigation";
import { formatAxiosError } from "@repo/core/utils/formatAxiosError";
import { useMutation } from "@tanstack/react-query";
import { dynamicQueueService } from "@repo/api/services/dynamic-queue/dynamic-queue.service";

import { ROUTES } from "@/common/enums/routes-enum";

export const useDeleteDynamicQueueMutation = () => {
	const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationKey: ["deleteDynamicQueueOnPage"],
    mutationFn: ({ id }: { id: string }) =>
      dynamicQueueService.deleteDynamicQueue(id),
    onSuccess() {
			router.push(ROUTES.MY_DYNAMIC_QUEUES)
      addToast({
        color: "success",
        title: "Живу чергу успішно видалено",
      });
    },
    onError: error => {
      addToast({
        color: "danger",
        title: "Помилка",
        description: formatAxiosError(error)
      });
    }
  });

  return { mutate, isPending };
};
