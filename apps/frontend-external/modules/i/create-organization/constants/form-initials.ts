import { CreateOrganizationRequesttClientValidationSchema } from "@repo/api/services/organization-request/organization-request.validation";

export const initialValues: CreateOrganizationRequesttClientValidationSchema = {
	organization_logo: null,
	organization_type_id: "",
	organization_title: "",
	desired_connection: "",
	organization_description: "",
	organization_website: "",
	user_comment: "",
	attachments: []
};