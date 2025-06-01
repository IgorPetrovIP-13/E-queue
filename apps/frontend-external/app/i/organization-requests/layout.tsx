import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Мої запити"
};

export default function OrganizationRequestsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      {children}
    </section>
  );
}
