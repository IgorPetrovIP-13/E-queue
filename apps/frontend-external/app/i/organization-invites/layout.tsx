import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Запрошення в організації",
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
