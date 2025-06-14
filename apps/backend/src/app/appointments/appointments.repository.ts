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

  async getMyTodayAppointments(userId: Types.ObjectId) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1);
    const dd = String(today.getDate());
    const todayString = `${dd}.${mm}.${yyyy}`;

    return this.appointment
      .find({
        user_id: userId,
        date: todayString
      })
      .populate({
        path: "queue_id",
        populate: {
          path: "organization_id"
        }
      })
      .lean() as any;
  }
}
