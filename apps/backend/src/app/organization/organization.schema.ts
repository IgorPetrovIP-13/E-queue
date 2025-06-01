import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { OrganizationTypeCollection } from "../organization_type/organization_type.schema";
import { UserOrganizationsCollection } from "../user_organizations/user_organizations.schema";
import { DynamicQueueCollection } from "../dynamic_queues/dynamic_queue.schema";
import { StaticQueueCollection } from "../static_queue/static_queue.schema";

export const OrganizationCollection = "organizations";

export type OrganizationDocument = HydratedDocument<Organization>;

@Schema({ versionKey: false })
export class Organization {
  _id: Types.ObjectId;

  @Prop({ type: String, default: null })
  organization_logo: string | null;

  @Prop({
    type: Types.ObjectId,
    ref: OrganizationTypeCollection
  })
  organization_type_id: Types.ObjectId;

  @Prop()
  organization_title: string;

  @Prop()
  organization_description: string;

  @Prop({ type: String, default: "" })
  organization_website: string | null;

  @Prop({ type: [{type: Types.ObjectId, ref: UserOrganizationsCollection}], default: [] })
  members: Types.ObjectId[];

  @Prop({ type: [{type: Types.ObjectId, ref: StaticQueueCollection}], default: [] })
  static_queues: Types.ObjectId[];

  @Prop({ type: [{type: Types.ObjectId, ref: DynamicQueueCollection}], default: [] })
  dynamic_queues: Types.ObjectId[];
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
