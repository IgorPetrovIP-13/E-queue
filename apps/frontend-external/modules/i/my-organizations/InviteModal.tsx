import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea
} from "@heroui/react";
import {
  OrganizationRole,
  OrganizationRoles
} from "@repo/core/enums/org-roles";
import { IAutocompleteData } from "@repo/core/types/autocomplete-data.types";
import { UiAutocomplete } from "@repo/ui/components/uiAutocomplete";
import { Send } from "lucide-react";
import { useEffect, useMemo } from "react";
import { Controller, SubmitHandler } from "react-hook-form";
import { IInviteOrganizationReq } from "@repo/api/services/organization_invite/organization-invite.types";

import { useInviteForm } from "./hooks/useInviteForm";
import { preSendClear } from "@repo/core/utils/preSendClear";
import { useInviteMutation } from "./hooks/useInviteMutation";

interface IDeleteProfileModal {
  isOpen: boolean;
  userRole: OrganizationRole;
  currentInvitationOrgName: string;
  currentInvitationId: string;
  onOpenChange: () => void;
  isSubmitting: boolean;
}

export default function InviteModal({
  isOpen,
  onOpenChange,
  isSubmitting,
  currentInvitationOrgName,
  currentInvitationId,
  userRole
}: IDeleteProfileModal) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors }
  } = useInviteForm();

  const { mutate: mutateUpdateProfile, isPending } =
    useInviteMutation();

  const defaultData = useMemo(() => {
    const base: IAutocompleteData[] = [
      { key: OrganizationRoles.MEMBER, label: OrganizationRoles.MEMBER }
    ];

    if (userRole === OrganizationRoles.OWNER) {
      base.push({
        key: OrganizationRoles.ADMIN,
        label: OrganizationRoles.ADMIN
      });
    }

    return base;
  }, [userRole]);

  useEffect(() => {
    setValue("organization_id", currentInvitationId);
  }, [currentInvitationId]);

  const onSubmitForm: SubmitHandler<IInviteOrganizationReq> = async (
    values: IInviteOrganizationReq
  ) => {
    const payload: IInviteOrganizationReq = {
      organization_id: currentInvitationId,
      invitation_comment: values.invitation_comment,
      ivitation_role: values.ivitation_role,
      user_email: values.user_email
    };

    mutateUpdateProfile(preSendClear(payload));
		onOpenChange();
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {onClose => (
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <ModalHeader className="text-primary flex items-center gap-2">
              <div className="flex items-center gap-2">
                <Send size={20} />
                <p>Запрошення в {currentInvitationOrgName}</p>
              </div>
            </ModalHeader>
            <ModalBody>
              <Input
                {...register("user_email")}
                isRequired
                errorMessage={errors.user_email?.message?.toString()}
                id="user_email"
                isInvalid={Boolean(errors.user_email)}
                label="Email користувача"
                size="sm"
              />
              <Controller
                control={control}
                name="ivitation_role"
                render={({ field }) => (
                  <UiAutocomplete
                    isRequired
                    defaultItems={defaultData}
                    defaultSelectedKey={field.value}
                    errorMessage={errors.ivitation_role?.message?.toString()}
                    isInvalid={Boolean(errors.ivitation_role)}
                    label="Роль користувача в організації"
                    size="sm"
                    onChange={field.onChange}
                  />
                )}
              />
              <Textarea
                {...register("invitation_comment")}
                isRequired
                errorMessage={errors.invitation_comment?.message?.toString()}
                id="invitation_comment"
                isInvalid={Boolean(errors.invitation_comment)}
                label="Коментар до запрошення"
                placeholder="Опишіть чому ви запрошуєте цього користувача в організацію"
                size="sm"
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                isLoading={isSubmitting || isPending}
                type="submit"
                variant="flat"
              >
                Відправити запрошення
              </Button>
              <Button
                color="default"
                type="button"
                variant="flat"
                onPress={onClose}
              >
                Відміна
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
