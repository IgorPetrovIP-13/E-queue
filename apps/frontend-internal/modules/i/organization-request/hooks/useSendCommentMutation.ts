import { addToast } from "@heroui/toast";
import { formatAxiosError } from "@repo/core/utils/formatAxiosError";
import { useMutation } from "@tanstack/react-query";
import { organizationRequestService } from "@repo/api/services/organization-request";

export const useSendCommentMutation = () => {
  const { mutate, isPending } = useMutation({
    mutationKey: ["leaveComment"],
    mutationFn: ({ id, comment }: { id: string; comment: string }) =>
      organizationRequestService.leaveComment(id, comment),
    onError: error => {
      addToast({
        color: "danger",
        title: "Помилка виходу",
        description: formatAxiosError(error)
      });
    }
  });

  return { mutate, isPending };
};
