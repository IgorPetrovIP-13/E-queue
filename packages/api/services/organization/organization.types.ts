import { Types } from "mongoose";

export interface IGetOrganizationRes {
  _id: string;
  organization_logo: string | null;
  organization_type_id: {
    _id: string;
    title: string;
  };
  organization_description: string;
  organization_website: string | null;
  organization_title: string;
  members: {
    _id: string;
    user_id: {
			_id: string;
			name: string;
			surname: string;
			email: string;
		};
    organization_id: string;
    organization_role: string;
  }[];
  static_queues: Types.ObjectId[];
  dynamic_queues: Types.ObjectId[];
}
