import { headers } from "next/headers";

export const getRouteSSR = async () => {
  "use server";
  const headerList = await headers();
  const pathname = headerList.get("x-current-path");

	return pathname;
};
