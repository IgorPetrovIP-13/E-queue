import { addToast } from "@heroui/toast";
import { formatAxiosError } from "@repo/core/utils/formatAxiosError";
import { useMutation } from "@tanstack/react-query";
import { organizationRequestService } from "@repo/api/services/organization-request";

export const useTakeIntoProcessing = () => {
  const { mutate, isPending } = useMutation({
    mutationKey: ["takeIntoProcessing"],
    mutationFn: ({ id }: { id: string }) =>
      organizationRequestService.takeIntoProcessing(id),
		onSuccess: () => {
			addToast({
				color: "success",
				title: "Заявка взята в обробку",
			});
		},
    onError: error => {
      addToast({
        color: "danger",
        title: "Помилка взяття в обробку",
        description: formatAxiosError(error)
      });
    }
  });

  return { mutate, isPending };
};
