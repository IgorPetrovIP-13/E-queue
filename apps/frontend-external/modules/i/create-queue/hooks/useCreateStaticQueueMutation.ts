
import { staticQueueService } from "@repo/api/services/static-queue/static-queue.service";
import { ICreateStaticQueueReq } from "@repo/api/services/static-queue/static-queue.types";
import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/toast";
import { formatAxiosError } from "@repo/core/utils/formatAxiosError";
import { useRouter } from "next/navigation";

import { ROUTES } from "@/common/enums/routes-enum";

export const useCreateStaticQueueMutation = () => {
	const router = useRouter();
	const { mutate, isPending } = useMutation({
		mutationKey: ["createOrganization"],
		mutationFn: (data: ICreateStaticQueueReq) =>
			staticQueueService.createStaticQueue(data),
		onSuccess: () => {
			router.push(ROUTES.MY_QUEUES);
			addToast({
				color: "success",
				title: "Чергу успішно створено",
			})
		},
		onError: error => {
			addToast({
				color: "danger",
				title: "Помилка створення черги",
				description: formatAxiosError(error)
			});
		}
	});

	return { mutate, isPending };
};
