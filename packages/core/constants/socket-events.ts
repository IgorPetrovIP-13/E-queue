export const SocketEvents = {
	ORGANIZATION_REQUEST_CHAT_COMMENT: "ORGANIZATION_REQUEST_CHAT_COMMENT",
	GENERAL_NOTIFICATION: "GENERAL_NOTIFICATION",
} as const;

export const SocketGeneralNotificationEventsTypes = {
	ORGANIZATION_REQUEST_STATUS_CHANGED: "ORGANIZATION_REQUEST_STATUS_CHANGED",
	ORGANIZATION_REQUEST_COMMENT: "ORGANIZATION_REQUEST_COMMENT",
	ORGANIZATION_INVITE: "ORGANIZATION_INVITE",
	ORGANIZATION_MEMBER_JOINED: "ORGANIZATION_MEMBER_JOINED",
	ORGANIZATION_MEMBER_LEFT: "ORGANIZATION_MEMBER_LEFT",
} as const;

export interface IGeneralNotification {
	type: SocketGeneralNotificationEventType;
	title: string;
	description: string;
}

export type SocketGeneralNotificationEventType =
	typeof SocketGeneralNotificationEventsTypes[keyof typeof SocketGeneralNotificationEventsTypes];