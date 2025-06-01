import { addToast } from "@heroui/toast";
import { formatAxiosError } from "@repo/core/utils/formatAxiosError";
import { useMutation } from "@tanstack/react-query";
import { appointmentService } from "@repo/api/services/appointment/appointment.service";
import { ICreateAppointmentReq } from "@repo/api/services/appointment/appointment.types";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/common/enums/routes-enum";

export const useCreateAppointment = () => {
	const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationKey: ["leaveComment"],
    mutationFn: (data: ICreateAppointmentReq) =>
      appointmentService.createAppointment(data),
		onSuccess: () => {
			addToast({
				color: "success",
				title: "Ви успішно записались в чергу",
			});
			router.push(ROUTES.MY_QUEUES);
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
