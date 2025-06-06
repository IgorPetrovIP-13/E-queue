import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Створення черги",
};

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center">
      {children}
    </section>
  );
}
