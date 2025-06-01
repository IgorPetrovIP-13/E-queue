import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Вхід в систему"
};

export default function LoginLayout({
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
