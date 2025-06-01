import { TrendingUpDown } from "lucide-react";

import Header from "@/modules/non-ptotected/_root/Header";

export default function NonProtectedLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 justify-center px-6 py-9">
        <main className="w-full">
          <section className="flex flex-col items-center justify-center">
            {children}
          </section>
        </main>
      </div>
      <footer className="flex flex-col justify-center pb-9 px-6 gap-3">
        <div className="flex justify-center items-center gap-2">
          <TrendingUpDown size={17} />
          E-QUEUE ADMIN
        </div>
        <p className="text-center text-sm text-gray-400">
          © 2025 Ihor Petrov IP-13. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
