import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Заявки на організацію"
};

export default function DashboardLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="flex flex-col justify-center gap-4">
			{children}
		</section>
	);
}
