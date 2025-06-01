export enum ROUTES {
  WELCOME = "/welcome",
  SIGN_IN = "/sign-in",
  SIGN_UP = "/sign-up",

  PROFILE = "/i/profile",
  DASHBOARD = "/i/dashboard",
  CREATE_QUEUE = "/i/create-queue",
	CREATE_DYNAMIC_QUEUE = "/i/create-dynamic-queue",
	MY_DYNAMIC_QUEUES = "/i/my-dynamic-queues",
	CREATE_QUEUE_STEP_1 = "/i/create-queue/choose-organization",
	CREATE_QUEUE_STEP_2 = "/i/create-queue/queue-settings",
	CREATE_QUEUE_STEP_3 = "/i/create-queue/performer-settings",
  MY_QUEUES = "/i/my-queues",
  CREATE_ORGANIZATION = "/i/create-organization",

	STATIC_QUEUE = "/i/static-queue",

  MY_ORGANIZATIONS = "/i/my-organizations",
  ORGANIZATION_REQUESTS = "/i/organization-requests",
	ORGANIZATION_REQUEST = "/i/organization-request",
  ORGANIZATION_INVITES = "/i/organization-invites",
	EXECUTOR_STATIC_QUEUE = "/i/executor-static-queue",
	EXECUTOR_DYNAMIC_QUEUE = "/i/executor-dynamic-queue",
}

export type Route = (typeof ROUTES)[keyof typeof ROUTES];
