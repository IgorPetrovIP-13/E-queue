import { Injectable } from "@nestjs/common";
import { ICreateAppointment } from "./typedefs";
import { InjectModel } from "@nestjs/mongoose";
import { Appointment, AppointmentsCollection } from "./appointments.schema";
import { Model, Types } from "mongoose";

@Injectable()
export class AppointmentsRepository {
  constructor(
    @InjectModel(AppointmentsCollection)
    private readonly appointment: Model<Appointment>
  ) {}

  async createAppointment(data: ICreateAppointment) {
    const appointment = new this.appointment(data);
    return appointment.save();
  }

  async getAppointmentsAsUser(userId: Types.ObjectId) {
    return this.appointment.find({ user_id: userId }).populate({
      path: "queue_id",
      populate: {
        path: "organization_id"
      }
    });
  }
}
