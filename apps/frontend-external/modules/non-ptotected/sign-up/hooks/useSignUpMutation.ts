import { addToast } from "@heroui/toast";
import { authService } from "@repo/api/services/auth/auth.service";
import { ISignUpReq } from "@repo/api/services/auth/auth.types";
import { formatAxiosError } from "@repo/core/utils/formatAxiosError";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { ROUTES } from "@/common/enums/routes-enum";

export const useSignUpMutation = () => {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationKey: ["signUp"],
    mutationFn: (data: ISignUpReq) => authService.signUp(data),
    onSuccess: data => {
      addToast({
        color: "success",
        title: `Ласкаво просимо на платформу, ${data.name}!`
      });
      router.push(ROUTES.DASHBOARD);
    },
    onError: error => {
      addToast({
        color: "danger",
        title: "Помилка реєстрації",
        description: formatAxiosError(error)
      });
    }
  });

  return { mutate, isPending };
};
