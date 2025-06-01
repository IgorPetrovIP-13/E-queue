export interface ICreateDynamicQueueReq {
	title: string;
	organization_id: string;
	work_start_time: string;
	work_end_time: string;
	work_time_estimation: number;
	executor: string;
	description: string;
	price: number | null;
}