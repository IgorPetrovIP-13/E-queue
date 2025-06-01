import { addToast } from "@heroui/toast";
import { authService } from "@repo/api/services/auth/auth.service";
import { formatAxiosError } from "@repo/core/utils/formatAxiosError";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { ROUTES } from "@/common/enums/routes-enum";

export const useLogoutMutation = () => {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationKey: ["logout"],
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      router.push(ROUTES.WELCOME);
    },
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
