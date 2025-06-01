import { addToast } from "@heroui/toast";
import { profileService } from "@repo/api/services/profile";
import { IUpdateProfileReq } from "@repo/api/services/profile/profile.types";
import { formatAxiosError } from "@repo/core/utils/formatAxiosError";
import { useMutation } from "@tanstack/react-query";

export const useUpdateProfileMutation = () => {
  const { mutate, isPending } = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: (values: IUpdateProfileReq) =>
      profileService.updateProfile(values),
    onSuccess: () => {
      addToast({
        color: "success",
        title: "Профіль успішно оновлено"
      });
    },
    onError: error => {
      addToast({
        color: "danger",
        title: "Помилка оновлення профілю",
        description: formatAxiosError(error)
      });
    }
  });

  return { mutate, isPending };
};
