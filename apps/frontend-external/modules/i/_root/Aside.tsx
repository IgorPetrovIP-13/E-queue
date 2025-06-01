"use client";

import {
  Button,
  Divider,
  Link,
  User,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from "@heroui/react";
import { Bell, TrendingUpDown, Link as LucideLink } from "lucide-react";
import { useProfile } from "@repo/core/hooks/useProfile";

import AsideLink from "./AsideLink";
import InfoButton from "./InfoButton";
import LogoutButton from "./LogoutButton";

import { ROUTES } from "@/common/enums/routes-enum";

export default function Aside() {
  const { isLoading, data } = useProfile();

  const unread_notifications = 1;

  const notifications = [
    {
      key: "new",
      label: "New file"
    },
    {
      key: "copy",
      label: "Copy link"
    },
    {
      key: "edit",
      label: "Edit file"
    },
    {
      key: "delete",
      label: "Delete file"
    }
  ];

  if (isLoading) return <></>;

  return (
    <div className="sticky top-0 hidden md:flex h-screen">
      <aside className="flex flex-col md:w-14 lg:w-64 gap-7 py-6 px-2 lg:px-7 pt-8 transition-all">
        <h1 className="flex items-center justify-center lg:justify-start gap-2">
          <TrendingUpDown size={21} />
          <span className="hidden lg:inline">E-QUEUE</span>
        </h1>
        <div className="flex flex-col gap-4">
          <Link
            color="foreground"
            href={ROUTES.PROFILE}
          >
            <User
              avatarProps={{
                src: data?.avatar as any,
                alt: `${data?.surname.slice(0, 1)} ${data?.name.slice(0, 1)}`
              }}
              className="justify-start"
              description={
                <span className="hidden lg:inline">{data?.email}</span>
              }
              name={
                <span className="hidden lg:inline break-all">{`${data?.surname} ${data?.name}, ${data?.role}`}</span>
              }
            />
          </Link>
          <Dropdown>
            <div className="relative">
              <DropdownTrigger>
                <Button
                  className="w-full text-sm"
                  size="sm"
                  startContent={<Bell size={20} />}
                  variant="flat"
                >
                  Сповіщення
                  {unread_notifications && (
                    <div className="bg-danger w-4 h-4 rounded-full bg-opacity-90 flex items-center justify-center text-xs">
                      {unread_notifications}
                    </div>
                  )}
                </Button>
              </DropdownTrigger>
            </div>
            <DropdownMenu
              aria-label="Dynamic Actions"
              variant="faded"
            >
              {notifications.map((item, index) => {
                return (
                  <DropdownItem
                    key={index}
                    color="success"
                    description="Item description"
										startContent={<LucideLink size={20}/>}
                  >
                    {item.label}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <Divider />
              <AsideLink href={ROUTES.DASHBOARD} />
            </div>
            <div className="flex flex-col gap-1">
              <Divider />
              <AsideLink href={ROUTES.CREATE_QUEUE} />
              <AsideLink href={ROUTES.MY_QUEUES} />
              <AsideLink href={ROUTES.CREATE_DYNAMIC_QUEUE} />
              <AsideLink href={ROUTES.MY_DYNAMIC_QUEUES} />
            </div>
            <div className="flex flex-col gap-1">
              <Divider />
              <AsideLink href={ROUTES.CREATE_ORGANIZATION} />
              <AsideLink href={ROUTES.ORGANIZATION_REQUESTS} />
              <AsideLink href={ROUTES.MY_ORGANIZATIONS} />
              <AsideLink href={ROUTES.ORGANIZATION_INVITES} />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <InfoButton />
            <LogoutButton />
          </div>
        </div>
      </aside>
      <Divider orientation="vertical" />
    </div>
  );
}
