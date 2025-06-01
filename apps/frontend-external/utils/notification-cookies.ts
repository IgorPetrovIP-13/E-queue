import { IGeneralNotification } from "@repo/core/constants/socket-events";

export interface IStoredNotification extends IGeneralNotification {
  id: number;
  read: boolean;
}

const COOKIE_NAME = "notifications";

const setCookie = (name: string, value: unknown, days = 1): void => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();

  document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))}; expires=${expires}; path=/`;
};

const getCookie = (name: string): IStoredNotification[] => {
  const value = document.cookie.split("; ").find(row => row.startsWith(name + "="));

  try {
    return value ? JSON.parse(decodeURIComponent(value.split("=")[1])) : [];
  } catch {
    return [];
  }
};

export const getNotifications = (): IStoredNotification[] => getCookie(COOKIE_NAME);

export const addNotification = (notification: IGeneralNotification): void => {
  const notifications = getNotifications();
  const newNotif: IStoredNotification = {
    ...notification,
    id: Date.now(),
    read: false
  };

  setCookie(COOKIE_NAME, [newNotif, ...notifications]);
};

export const markAllAsRead = (): void => {
  const notifications = getNotifications().map(n => ({ ...n, read: true }));

  setCookie(COOKIE_NAME, notifications);
};

export const getUnreadCount = (): number => {
  return getNotifications().filter(n => !n.read).length;
};

export const clearNotifications = (): void => {
  setCookie(COOKIE_NAME, []);
};