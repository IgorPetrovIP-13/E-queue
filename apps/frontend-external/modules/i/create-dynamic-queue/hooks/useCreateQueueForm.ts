import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createDynamicQueueSchema } from "@repo/api/services/dynamic-queue/dynamic-queue.validation";
import { ICreateDynamicQueueReq } from "@repo/api/services/dynamic-queue/dynamic-queue.types";

import { initialValues } from "../constants/form-initials";

export const useCreateQueueForm = () => {
	const { register, handleSubmit, control, formState, setValue, getValues } =
		useForm<ICreateDynamicQueueReq>({
			resolver: zodResolver(createDynamicQueueSchema),
			mode: "onTouched",
			defaultValues: initialValues
		});

	return { register, handleSubmit, control, formState, setValue, getValues };
};
