import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Нова організація"
};

export default function CreateOrganizationLayout({
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
