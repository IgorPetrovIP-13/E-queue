import "@repo/ui/styles/globals.css";
import { fontNunito, fontSans } from "@repo/ui/styles/fonts";
import { Metadata } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import {
  SITE_DESCRIPTION,
  SITE_ICON,
  SITE_NAME
} from "@/common/constants/seo.constants";

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`
  },
  description: SITE_DESCRIPTION,
  icons: {
    icon: SITE_ICON
  },
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
    >
			<meta content="width=device-width, initial-scale=1" name="viewport" />
      <body
        className={clsx(
          "min-h-screen bg-background font-nunito antialiased",
          fontNunito.variable
        )}
        lang="en"
        suppressHydrationWarning={true}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
