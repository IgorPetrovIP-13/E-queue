import { NavbarBrand, Navbar } from "@heroui/navbar";
import { TrendingUpDown } from "lucide-react";

export default function Header() {
  return (
    <Navbar
      shouldHideOnScroll
      maxWidth="full"
    >
      <NavbarBrand className="flex items-center gap-2">
        <TrendingUpDown size={20} />
        E-QUEUE ADMIN
      </NavbarBrand>
    </Navbar>
  );
}
