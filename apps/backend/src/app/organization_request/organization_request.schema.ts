import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import {
  OrganizationRequestStatus,
  OrganizationRequestStatuses
} from "@repo/core/enums/org-request-status";
import { UserCollection } from "../user/user.schema";
import { OrganizationTypeCollection } from "../organization_type/organization_type.schema";
import { IComment } from "./organization_request.types";
import { IAttachment } from "@repo/core/types/attachment.types";

export const OrganizationRequestCollection = "organization_requests";

@Schema({ versionKey: false, timestamps: true })
export class OrganizationRequest {
  _id: string;

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
  desired_connection: string;

  @Prop()
  organization_description: string;

  @Prop({ type: String, default: "" })
  organization_website: string | null;

  @Prop({ default: [] })
  attachments: IAttachment[];

  @Prop({ type: Types.ObjectId, ref: UserCollection })
  user_id: Types.ObjectId;

  @Prop({ type: String, default: OrganizationRequestStatuses.NOT_CHECKED })
  status: OrganizationRequestStatus;

  @Prop({
    type: Types.ObjectId,
    ref: UserCollection,
    default: null
  })
  admin_id: Types.ObjectId | null;

  @Prop({ default: [] })
  comments: IComment[];

	@Prop({ type: String, default: "" })
	user_comment: string;

  @Prop({ type: String, default: "" })
  rejection_comment: string | null;

  @Prop({ type: String, default: "" })
  approval_comment: string | null;
}

export const OrganizationRequestSchema =
  SchemaFactory.createForClass(OrganizationRequest);
