import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Жива черга"
};

export default function ProfileLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {children}
    </section>
  );
}
