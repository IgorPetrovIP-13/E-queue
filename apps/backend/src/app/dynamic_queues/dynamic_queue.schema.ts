import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { UserCollection } from "../user/user.schema";

export const DynamicQueueCollection = "dynamic_queues";

@Schema({ versionKey: false })
export class DynamicQueue {
	_id: Types.ObjectId;

	@Prop({ type: String, default: "" })
	title: string;

	@Prop({ type: Types.ObjectId, ref: "organizations"})
	organization_id: Types.ObjectId;

	@Prop({ type: String, default: "" })
	work_start_time: string;
	
	@Prop({ type: String, default: "" })
	work_end_time: string;

	@Prop({ type: Number })
	work_time_estimation: number;

	@Prop({ type: Types.ObjectId, ref: UserCollection })
	executor: Types.ObjectId;

	@Prop({ type: String, default: "" })
	description: string;

	@Prop({ type: Number, default: null })
	price: number | null;

	@Prop({ type: [{ type: Types.ObjectId, ref: UserCollection }], default: [] })
	appointments: Types.ObjectId[];
}

export const DynamicQueueSchema = SchemaFactory.createForClass(DynamicQueue);