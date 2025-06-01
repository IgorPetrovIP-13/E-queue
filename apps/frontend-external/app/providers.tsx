"use client";

import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps
} from "next-themes";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ToastProvider } from "@heroui/toast";
import { SocketProvider } from "@repo/core/providers/SocketProvider";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider navigate={router.push}>
        <NextThemesProvider {...themeProps}>
          	<SocketProvider>{children}</SocketProvider>
          <ToastProvider />
        </NextThemesProvider>
      </HeroUIProvider>
    </QueryClientProvider>
  );
}
