import { addToast } from "@heroui/toast";
import { formatAxiosError } from "@repo/core/utils/formatAxiosError";
import { useMutation } from "@tanstack/react-query";
import { IInviteOrganizationReq } from "@repo/api/services/organization_invite/organization-invite.types";
import { organizationInviteService } from "@repo/api/services/organization_invite/organization-invite.service";

export const useInviteMutation = () => {
  const { mutate, isPending } = useMutation({
    mutationKey: ["invite"],
    mutationFn: (data: IInviteOrganizationReq) =>
      organizationInviteService.sendInvite(data),
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
