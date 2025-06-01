import { Route } from "@/common/enums/routes-enum";
import { RoutesValues } from "@/common/enums/routes-values-enum";

export function getRouteValue(pathname: Route) {
  return RoutesValues[pathname];
}
