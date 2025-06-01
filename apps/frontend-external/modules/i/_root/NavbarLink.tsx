import { Link } from "@heroui/link";
import { usePathname } from "next/navigation";

import { ROUTES } from "@/common/enums/routes-enum";
import { getRouteValue } from "@/utils/getRouteValue";

interface INavbarLink {
  href: ROUTES;
}

export default function NavbarLink(props: INavbarLink) {
	const pathname = usePathname();
  const { title, icon: Icon } = getRouteValue(props.href);

  return (
    <Link
      isBlock
      className={"flex justify-start items-center text-sm p-2 gap-2"}
      color="foreground"
      href={props.href}
      isDisabled={pathname === props.href}
    >
      {<Icon size={21} />}
      <span className="lg:block">{title}</span>
    </Link>
  );
}
