import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { UserCollection } from "../user/user.schema";
import { OrganizationCollection } from "../organization/organization.schema";
import { OrganizationRole } from "@repo/core/enums/org-roles";

export const OrganizationInviteCollection = "organization_invites";

@Schema({ versionKey: false })
export class OrganizationInvite {
  _id: string;

	@Prop({ type: String, ref: UserCollection })
	user_id: string;

  @Prop({ type: String, ref: OrganizationCollection })
  organization_id: string;

	@Prop({ type: String })
	invitation_comment: string;

	@Prop({ type: String })
	ivitation_role: OrganizationRole;

	@Prop({ type: String })
	user_email: string;
}

export const OrganizationInviteSchema =
  SchemaFactory.createForClass(OrganizationInvite);
