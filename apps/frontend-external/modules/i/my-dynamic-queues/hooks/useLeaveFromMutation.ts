import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/toast";
import { formatAxiosError } from "@repo/core/utils/formatAxiosError";
import { dynamicQueueService } from "@repo/api/services/dynamic-queue/dynamic-queue.service";

export const useLeaveFromQueueMutation = (
  onSuccessCallback: (appointmentId: string) => void
) => {
  const { mutate, isPending } = useMutation({
    mutationKey: ["leaveFromQueue"],
    mutationFn: (data: { id: string }) =>
      dynamicQueueService.deleteMyAppointmentFromDynamicQueue(data.id),
    onSuccess: data => {
			addToast({
				color: "success",
				title: "Ви вийшли з черги"
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
