import { addToast } from "@heroui/toast";
import { organizationRequestService } from "@repo/api/services/organization-request";
import { ICreateOrganizationRequestReq } from "@repo/api/services/organization-request/organization-request.types";
import { formatAxiosError } from "@repo/core/utils/formatAxiosError";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { ROUTES } from "@/common/enums/routes-enum";

export const useCreateOrganizationMutation = () => {
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationKey: ["createOrganization"],
    mutationFn: (data: ICreateOrganizationRequestReq) =>
      organizationRequestService.create(data),
    onSuccess: () => {
      router.push(ROUTES.ORGANIZATION_REQUESTS);
    },
    onError: error => {
      addToast({
        color: "danger",
        title: "Помилка створення заявки на організацію",
        description: formatAxiosError(error)
      });
    }
  });

  return { mutate, isPending };
};
