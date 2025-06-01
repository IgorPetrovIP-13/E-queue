import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/toast";
import { formatAxiosError } from "@repo/core/utils/formatAxiosError";
import { dynamicQueueService } from "@repo/api/services/dynamic-queue/dynamic-queue.service";

export const useRemoveUserFromQueueMutation = (
  onSuccessCallback: (user: any) => void
) => {
  const { mutate, isPending } = useMutation({
    mutationKey: ["removeUserFromQueue"],
    mutationFn: (data: { id: string; userId: string }) =>
      dynamicQueueService.deleteAppointmentFromDynamicQueue(
        data.id,
        data.userId
      ),
    onSuccess: data => {
      onSuccessCallback(data);
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
