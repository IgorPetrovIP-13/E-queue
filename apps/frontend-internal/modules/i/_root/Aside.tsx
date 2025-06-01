"use client";

import { Divider, User } from "@heroui/react";
import { TrendingUpDown } from "lucide-react";
import { useProfile } from "@repo/core/hooks/useProfile";

import AsideLink from "./AsideLink";
import LogoutButton from "./LogoutButton";

import { ROUTES } from "@/common/enums/routes-enum";

export default function Aside() {
  const { isLoading, data } = useProfile();

  if (isLoading) return <></>;

  return (
    <div className="sticky top-0 hidden md:flex h-screen">
      <aside className="flex flex-col md:w-14 lg:w-64 gap-7 py-6 px-2 lg:px-7 pt-8 transition-all">
        <h1 className="flex items-center justify-center lg:justify-start gap-2">
          <TrendingUpDown size={21} />
          <span className="hidden lg:inline">E-QUEUE ADMIN</span>
        </h1>
        <div className="w-full">
          <User
            className="justify-start"
            description={
              <span className="hidden lg:inline">{data?.email}</span>
            }
            name={
              <span className="hidden lg:inline">{`${data?.surname} ${data?.name}`}</span>
            }
          />
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <Divider />
              <AsideLink href={ROUTES.DASHBOARD} />
              <AsideLink href={ROUTES.AVAILABLE_ORGANIZATION_REQUESTS} />
              <AsideLink href={ROUTES.PROCESSING_ORGANIZATION_REQUESTS} />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <LogoutButton />
          </div>
        </div>
      </aside>
      <Divider orientation="vertical" />
    </div>
  );
}
