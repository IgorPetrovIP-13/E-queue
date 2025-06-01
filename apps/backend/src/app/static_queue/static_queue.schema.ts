import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { UserCollection } from "../user/user.schema";
import { AppointmentsCollection } from "../appointments/appointments.schema";
import { IAttachment } from "@repo/core/types/attachment.types"

export const StaticQueueCollection = "static_queues";

@Schema({ versionKey: false })
export class StaticQueue {
  _id: Types.ObjectId;

	@Prop({ type: String, default: "" })
	title: string;

	@Prop({ type: Types.ObjectId, ref: "organizations"})
  organization_id: Types.ObjectId;

	@Prop({ type: [{ type: String }], default: [] })
  days_of_service: string[];

	@Prop({ type: String, default: "" })
  work_start_time: string;
	
	@Prop({ type: String, default: "" })
  work_end_time: string;

	@Prop({ type: String, default: "" })
  work_break_start_time: string;

	@Prop({ type: String, default: "" })
  work_break_end_time: string;

	@Prop({ type: Number, default: 1 })
  work_time_estimation: number;

	@Prop({ type: Number, default: 1 })
  break_time_estimation: number;

	@Prop({ type: Types.ObjectId, ref: UserCollection })
  executor: Types.ObjectId;

	@Prop({ type: String, default: "" })
  description: string;

	@Prop({ type: Number, default: null })
  price: number | null;

	@Prop({ default: [] })
  forms_examples: IAttachment[];

	@Prop({ default: [] })
  forms_completed_examples: IAttachment[];

	@Prop({ default: [] })
  attachments: IAttachment[];

	@Prop({ type: [{ type: String, ref: AppointmentsCollection }], default: [] })
	appointments: Types.ObjectId[];
}

export const StaticQueueSchema = SchemaFactory.createForClass(StaticQueue);
