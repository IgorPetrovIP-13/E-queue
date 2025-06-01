import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { inviteOrganizationValidationSchema } from "@repo/api/services/organization_invite/organization-invite.validation";
import { IInviteOrganizationReq} from "@repo/api/services/organization_invite/organization-invite.types"

import { initialValues } from "../constants/initialValues";

export const useInviteForm = () => {
  const { register, handleSubmit, control, formState, setValue } =
    useForm<IInviteOrganizationReq>({
      resolver: zodResolver(inviteOrganizationValidationSchema),
      mode: "onTouched",
      defaultValues: initialValues
    });

  return { register, handleSubmit, control, setValue, formState };
};
