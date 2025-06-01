import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { UserCollection } from "../user/user.schema";

export const AppointmentsCollection = "appointments";

@Schema({ versionKey: false })
export class Appointment {
  _id: string;

  @Prop({ type: String, ref: UserCollection })
  user_id: string;

  @Prop({ type: String, ref: "static_queues" })
  queue_id: string;

  @Prop({ type: String })
  date: string;

  @Prop({ type: String })
  start_time: string;

  @Prop({ type: String })
  end_time: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
