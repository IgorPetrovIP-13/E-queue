import { ICreateAppointmentReq } from "@repo/api/services/appointment/appointment.types";
import { Types } from "mongoose";

export interface ICreateAppointment extends ICreateAppointmentReq {
  user_id: Types.ObjectId;
}
