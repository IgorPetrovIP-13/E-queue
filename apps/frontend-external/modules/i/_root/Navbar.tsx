"use client";

import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextNavbar
} from "@heroui/navbar";
import { User } from "@heroui/react";
import { TrendingUpDown } from "lucide-react";
import Link from "next/link";
import { useProfile } from "@repo/core/hooks/useProfile";

import LogoutButton from "./LogoutButton";
import InfoButton from "./InfoButton";
import NavbarLink from "./NavbarLink";

import { ROUTES } from "@/common/enums/routes-enum";

export default function Navbar() {
  const { isLoading, data } = useProfile();

  if (isLoading) return <></>;

  return (
    <NextNavbar className="md:hidden">
      <NavbarMenuToggle className="md:hidden" />
      <NavbarBrand>
        <h1 className="flex items-center justify-center lg:justify-start gap-2">
          <TrendingUpDown size={21} />
          E-QUEUE
        </h1>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Link
            color="foreground"
            href={ROUTES.PROFILE}
          >
            <User
              avatarProps={{ src: "/user.svg" }}
              className="justify-end flex-row-reverse"
              description={data?.email}
              name={
                <span>{`${data?.surname} ${data?.name}, ${data?.role}`}</span>
              }
            />
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="overflow-hidden bg-opacity-30">
        <NavbarMenuItem>
          <NavbarLink href={ROUTES.DASHBOARD} />
        </NavbarMenuItem>
        <NavbarMenuItem className="mt-3">
          <NavbarLink href={ROUTES.MY_QUEUES} />
        </NavbarMenuItem>
        <NavbarMenuItem>
          <NavbarLink href={ROUTES.CREATE_QUEUE} />
        </NavbarMenuItem>
        <NavbarMenuItem className="mt-3">
          <NavbarLink href={ROUTES.CREATE_ORGANIZATION} />
        </NavbarMenuItem>
        <NavbarMenuItem>
          <NavbarLink href={ROUTES.MY_ORGANIZATIONS} />
        </NavbarMenuItem>
        <NavbarMenuItem>
          <NavbarLink href={ROUTES.ORGANIZATION_REQUESTS} />
        </NavbarMenuItem>
        <NavbarMenuItem className="mt-8">
          <InfoButton />
        </NavbarMenuItem>
        <NavbarMenuItem>
          <LogoutButton />
        </NavbarMenuItem>
      </NavbarMenu>
    </NextNavbar>
  );
}
