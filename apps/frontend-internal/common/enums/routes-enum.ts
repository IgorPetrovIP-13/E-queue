export enum ROUTES {
  SIGN_IN = "/sign-in",

  DASHBOARD = "/i/dashboard",
	AVAILABLE_ORGANIZATION_REQUESTS = "/i/available-organization-requests",
	ORGANIZATION_REQUEST = "/i/organization-request",
	PROCESSING_ORGANIZATION_REQUESTS = "/i/processing-organization-requests",
}

export type Route = (typeof ROUTES)[keyof typeof ROUTES];
