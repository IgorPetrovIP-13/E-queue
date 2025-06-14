import { Injectable } from "@nestjs/common";
import { ICreateAppointmentReq } from "@repo/api/services/appointment/appointment.types";
import { Types } from "mongoose";
import { AppointmentsRepository } from "./appointments.repository";
import { StaticQueueService } from "../static_queue/static_queue.service";

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly appointmentsRepository: AppointmentsRepository,
    private readonly staticQueueService: StaticQueueService
  ) {}

  async createAppointment(data: ICreateAppointmentReq, userId: Types.ObjectId) {
    const dataWithUserId = {
      ...data,
      user_id: userId
    };

    const createdAppointemnt = await this.appointmentsRepository.createAppointment(dataWithUserId);

		await this.staticQueueService.addAppointmentToStaticQueue(
			data.queue_id,
			createdAppointemnt._id.toString()
		);

		return createdAppointemnt;
  }

	async getAppointmentsAsUser(userId: Types.ObjectId) {
		return this.appointmentsRepository.getAppointmentsAsUser(userId);
	}

	async getMyTodayAppointments(userId: Types.ObjectId) {
		const rawData = await this.appointmentsRepository.getMyTodayAppointments(userId);

		return rawData.map((appointment) => {
			return {
				_id: appointment._id.toString(),
				time: `${appointment.start_time} - ${appointment.end_time}`,
				title: appointment.queue_id.title,
				organization_title: appointment.queue_id.organization_id.organization_title,
			}
		})
	}
}
