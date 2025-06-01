import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Мої черги",
};

export default function MyOrganizationsLayout({
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
