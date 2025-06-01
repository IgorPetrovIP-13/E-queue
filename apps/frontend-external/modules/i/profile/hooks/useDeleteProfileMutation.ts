import { addToast } from "@heroui/toast";
import { profileService } from "@repo/api/services/profile";
import { formatAxiosError } from "@repo/core/utils/formatAxiosError";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { ROUTES } from "@/common/enums/routes-enum";

export const useDeleteProfileMutation = () => {
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationKey: ["deleteProfile"],
    mutationFn: () => profileService.deleteProfile(),
    onSuccess: () => {
      router.push(ROUTES.DASHBOARD);
      addToast({
        color: "success",
        title: "Профіль успішно видалено",
        description: "Ви автоматично вийшли з системи"
      });
    },
    onError: error => {
      addToast({
        color: "danger",
        title: "Помилка видалення профілю",
        description: formatAxiosError(error)
      });
    }
  });

  return { mutate, isPending };
};
