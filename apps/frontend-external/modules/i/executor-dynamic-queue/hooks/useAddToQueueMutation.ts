import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/toast";
import { formatAxiosError } from "@repo/core/utils/formatAxiosError";
import { dynamicQueueService } from "@repo/api/services/dynamic-queue/dynamic-queue.service";


export const useAddToQueueMutation = (onSuccessCallback: (user: any) => void) => {
  const { mutate, isPending } = useMutation({
    mutationKey: ["addUserToQueue"],
    mutationFn: (data: {id: string, email: string}) =>
      dynamicQueueService.addAppointmentToDynamicQueue(data.id, data.email),
    onSuccess: (data) => {
			onSuccessCallback(data);
      addToast({
        color: "success",
        title: "Користувача успішно додано до черги",
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
