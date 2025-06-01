import { Button } from "@heroui/button";
import { NavbarBrand, NavbarContent, NavbarItem, Navbar } from "@heroui/navbar";
import { TrendingUpDown } from "lucide-react";
import Link from "next/link";

import { ROUTES } from "@/common/enums/routes-enum";

export default function Header() {
  return (
    <Navbar
      shouldHideOnScroll
      maxWidth="full"
    >
      <NavbarBrand>
        <Link
          className="flex items-center gap-2"
          href={ROUTES.WELCOME}
        >
          <TrendingUpDown size={20} />
          E-QUEUE
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Link
            className="text-primary"
            href={ROUTES.SIGN_IN}
          >
            Увійти
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            color="primary"
            href={ROUTES.SIGN_UP}
            variant="flat"
          >
            Реєстрація
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
