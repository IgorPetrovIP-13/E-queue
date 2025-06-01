import { z } from "zod";

export const createStaticQueueSchema = z.object({
	title: z.string().min(3),
  organization_id: z.string().min(1),
  days_of_service: z.array(z.string()),
  work_start_time: z.string().min(1),
  work_end_time: z.string().min(1),
  work_break_start_time: z.string().min(1),
  work_break_end_time: z.string().min(1),
  work_time_estimation: z.number(),
  break_time_estimation: z.number(),
  executor: z.string().min(5),
  description: z.string(),
  price: z.number().nullable(),
  forms_examples: z.array(z.any()),
  forms_completed_examples: z.array(z.any()),
  attachments: z.array(z.any()),
});
