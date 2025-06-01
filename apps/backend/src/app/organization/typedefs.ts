import { Types } from "mongoose";

export interface CreateOrganizationDTO {
	user_id: Types.ObjectId;
  organization_logo: string | null;
  organization_type_id: Types.ObjectId;
  organization_title: string;
  organization_description: string;
  organization_website: string;
}
