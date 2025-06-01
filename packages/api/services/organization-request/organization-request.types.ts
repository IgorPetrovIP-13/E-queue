import { OrganizationRequestStatus } from "@repo/core/enums/org-request-status";
import { IAttachment } from "@repo/core/types/attachment.types";

export interface ICreateOrganizationRequestReq {
  organization_logo: string | null;
  organization_type_id: string;
  organization_title: string;
  desired_connection: string;
  organization_description: string;
  organization_website: string | null;
  user_comment: string;
  attachments: IAttachment[];
}

export interface Comment {
  comment: string;
  createdAt: string;
  isAdmin: boolean;
}

export interface ICreateOrganizationRequestRes
  extends Omit<ICreateOrganizationRequestReq, "organization_type_id"> {
  _id: string;
  user_id: string;
  status: OrganizationRequestStatus;
  admin_id: string | null;
  comments: Comment[];
  rejection_comment: string | null;
  approval_comment: string | null;
  createdAt: string;
  updatedAt: string;
  organization_type_id: {
    _id: string;
    title: string;
  };
}

export interface IGetMyOrganizationRequestRes
  extends ICreateOrganizationRequestRes {}

export interface IGetAvailableOrganizationRequestRes
  extends ICreateOrganizationRequestRes {}
