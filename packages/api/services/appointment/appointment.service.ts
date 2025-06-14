import { axiosWithCredentialsInstance } from "../../axios/axios-with-credentials";
import { ICreateAppointmentReq } from "./appointment.types";

class AppointmentService {
  private readonly baseUrl = "/appointments";

  async createAppointment(data: ICreateAppointmentReq) {
    const response = await axiosWithCredentialsInstance.post<void>(
      `${this.baseUrl}`,
      data
    );

    return response.data;
  }

	async getMyAppointments() {
		const response = await axiosWithCredentialsInstance.get(
			`${this.baseUrl}/as-user`
		);
		return response.data;
	}

	async getMyTodayAppointments() {
		const response = await axiosWithCredentialsInstance.get(
			`${this.baseUrl}/my-today-appointments`
		);

		return response.data;
	}
}

export const appointmentService = new AppointmentService();
