import Aside from '@/components/i/Aside'

export default function ProtectedLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<div className='flex w-full h-full'>
			<Aside />
			<div className='w-full flex flex-1 flex-col p-4'>
				<header className='flex items-center gap-3 rounded-medium border-small border-divider p-4 mb-4'>
					<h2>Заголовок</h2>
				</header>
				<main className='flex-1 rounded-medium border-small border-divider p-4'>
					{children}
				</main>
			</div>
		</div>
	)
}
