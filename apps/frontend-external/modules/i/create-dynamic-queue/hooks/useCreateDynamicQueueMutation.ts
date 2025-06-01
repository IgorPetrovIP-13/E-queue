import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/toast";
import { formatAxiosError } from "@repo/core/utils/formatAxiosError";
import { dynamicQueueService } from "@repo/api/services/dynamic-queue/dynamic-queue.service";
import { ICreateDynamicQueueReq } from "@repo/api/services/dynamic-queue/dynamic-queue.types";
import { useRouter } from "next/navigation";

import { ROUTES } from "@/common/enums/routes-enum";

export const useCreateDynamicQueueMutation = () => {
	const router = useRouter();
	const { mutate, isPending } = useMutation({
		mutationKey: ["createDynamicQueue"],
		mutationFn: (data: ICreateDynamicQueueReq) =>
			dynamicQueueService.createDynamicQueue(data),
		onSuccess: () => {
			router.push(ROUTES.MY_DYNAMIC_QUEUES);
			addToast({
				color: "success",
				title: "Живу чергу успішно створено",
			})
		},
		onError: error => {
			addToast({
				color: "danger",
				title: "Помилка створення живої черги",
				description: formatAxiosError(error)
			});
		}
	});

	return { mutate, isPending };
};
