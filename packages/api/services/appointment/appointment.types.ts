export interface ICreateAppointmentReq {
	queue_id: string;
  date: string;
  start_time: string;
  end_time: string;
}

export interface IGetMyTodayAppointmentsRes {
	_id: string;
	time: string;
	title: string;
	organization_title: string;
}