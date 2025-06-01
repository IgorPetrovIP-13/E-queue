import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createStaticQueueSchema } from "@repo/api/services/static-queue/static-queue.validation";
import { ICreateStaticQueueReq } from "@repo/api/services/static-queue/static-queue.types";

import { initialValues } from "../constants/form-initials";

export const useCreateQueueForm = () => {
	const { register, handleSubmit, control, formState, setValue, getValues } =
		useForm<ICreateStaticQueueReq>({
			resolver: zodResolver(createStaticQueueSchema),
			mode: "onTouched",
			defaultValues: initialValues
		});

	return { register, handleSubmit, control, formState, setValue, getValues };
};
