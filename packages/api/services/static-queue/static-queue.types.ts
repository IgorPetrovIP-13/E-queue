import { IAttachment } from "@repo/core/types/attachment.types";

export interface ICreateStaticQueueReq {
	title: string;
	organization_id: string;
	days_of_service: string[];
	work_start_time: string;
	work_end_time: string;
	work_break_start_time: string;
	work_break_end_time: string;
	work_time_estimation: number;
	break_time_estimation: number;
	executor: string;
	description: string;
	price: number | null;
	forms_examples: IAttachment[];
	forms_completed_examples: IAttachment[];
	attachments: IAttachment[];
}