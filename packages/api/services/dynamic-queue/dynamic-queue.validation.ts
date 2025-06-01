import { z } from "zod";

export const createDynamicQueueSchema = z.object({
	title: z.string().min(3),
	organization_id: z.string().min(1),
	work_start_time: z.string().min(1),
	work_end_time: z.string().min(1),
	work_time_estimation: z.number(),
	executor: z.string().min(5),
	description: z.string(),
	price: z.number().nullable(),
});
