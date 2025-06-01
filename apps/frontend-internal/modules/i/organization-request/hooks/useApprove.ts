import { addToast } from "@heroui/toast";
import { formatAxiosError } from "@repo/core/utils/formatAxiosError";
import { useMutation } from "@tanstack/react-query";
import { organizationRequestService } from "@repo/api/services/organization-request";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/common/enums/routes-enum";

export const useApprove = () => {
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationKey: ["approveOrganizationRequest"],
    mutationFn: ({ id, comment }: { id: string; comment: string }) =>
      organizationRequestService.approve(id, comment),
    onSuccess: () => {
      addToast({
        color: "success",
        title: "Заявку схвалено"
      });
      router.push(ROUTES.AVAILABLE_ORGANIZATION_REQUESTS);
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
