import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Профіль"
};

export default function ProfileLayout({
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
