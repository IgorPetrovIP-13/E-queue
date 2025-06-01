import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Заявки в обробці"
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
