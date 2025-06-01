import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { UserCollection } from "../user/user.schema";
import { OrganizationRole, OrganizationRoles } from "@repo/core/enums/org-roles";

export const UserOrganizationsCollection = "user_organizations";

export type UserOrganizationsDocument = HydratedDocument<UserOrganization>;

@Schema({ versionKey: false })
export class UserOrganization {
  _id: string;

	@Prop({ type: Types.ObjectId, ref: UserCollection })
	user_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'organizations' })
	organization_id: Types.ObjectId;

	@Prop({ type: String, default: OrganizationRoles.MEMBER})
	organization_role: OrganizationRole;
}

export const UserOrganizationSchema = SchemaFactory.createForClass(UserOrganization);
