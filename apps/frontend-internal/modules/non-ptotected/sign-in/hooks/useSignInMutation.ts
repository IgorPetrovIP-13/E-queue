import { addToast } from "@heroui/toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authService } from "@repo/api/services/auth/auth.service";
import { ISignInReq } from "@repo/api/services/auth/auth.types";
import { formatAxiosError } from "@repo/core/utils/formatAxiosError";

import { ROUTES } from "@/common/enums/routes-enum";

export const useSignInMutation = () => {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationKey: ["signIn"],
    mutationFn: (data: ISignInReq) => authService.signInAdmin(data),
    onSuccess: data => {
      router.push(ROUTES.DASHBOARD);
      addToast({
        color: "success",
        title: `Ласкаво просимо на платформу, ${data.surname}!`
      });
    },
    onError: error => {
      addToast({
        color: "danger",
        title: "Помилка авторизації",
        description: formatAxiosError(error)
      });
    }
  });

  return { mutate, isPending };
};
