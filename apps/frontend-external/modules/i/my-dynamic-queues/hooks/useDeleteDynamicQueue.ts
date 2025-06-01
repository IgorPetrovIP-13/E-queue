import { addToast } from "@heroui/toast";
import { formatAxiosError } from "@repo/core/utils/formatAxiosError";
import { useMutation } from "@tanstack/react-query";
import { dynamicQueueService } from "@repo/api/services/dynamic-queue/dynamic-queue.service";

export const useDeleteDynamicQueueMutation = (onSuccessCallback: (queue_id: string) => void) => {
  const { mutate, isPending } = useMutation({
    mutationKey: ["deleteDynamicQueue"],
    mutationFn: ({ id }: { id: string }) =>
      dynamicQueueService.deleteDynamicQueue(id),
    onSuccess(data) {
      addToast({
        color: "success",
        title: "Чергу видалено"
      });
			onSuccessCallback(data._id);
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
