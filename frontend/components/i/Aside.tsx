'use client'

import { useProfile } from '@/common/hooks/useProfile'
import { authService } from '@/services/auth.service'
import { Button, Divider, Link, User } from '@nextui-org/react'
import {
	BadgePlus,
	Building2,
	GitPullRequestArrow,
	Info,
	ListOrdered,
	LogOut,
	TrendingUpDown
} from 'lucide-react'

export default function Aside() {
	const { isLoading, data } = useProfile()

	if (isLoading) return <></>

	return (
		<div className='flex h-full'>
			<aside className='flex flex-col gap-7 w-64 p-6 pt-8'>
				<h1 className='flex items-center gap-2'>
					<TrendingUpDown size={20} />
					E-QUEUE
				</h1>
				<Link
					href='#'
					color='foreground'
				>
					<User
						className='justify-start'
						name={data.surname + ' ' + data.name}
						description={data.email}
						avatarProps={{ src: '/pudge.png' }}
					/>
				</Link>
				<div className='flex-1 flex flex-col justify-between'>
					<div className='flex flex-col gap-3'>
						<div className='flex flex-col gap-1'>
							<Divider />
							<Link
								href='#'
								isBlock
								color='foreground'
								className='flex items-center text-sm p-2 gap-2'
							>
								<BadgePlus size={21} />
								Створити чергу
							</Link>
							<Link
								href='#'
								isBlock
								color='foreground'
								className='flex items-center text-sm p-2 gap-2'
							>
								<ListOrdered size={21} /> Мої черги
							</Link>
						</div>
						<div className='flex flex-col gap-1'>
							<Divider />
							<Link
								href='#'
								isBlock
								color='foreground'
								className='flex items-center text-sm p-2 gap-2'
							>
								<BadgePlus size={21} />
								Створити організацію
							</Link>
							<Link
								href='#'
								isBlock
								color='foreground'
								className='flex items-center text-sm p-2 gap-2'
							>
								<Building2 size={21} /> Мої організації
							</Link>
							<Link
								href='#'
								isBlock
								color='foreground'
								className='flex items-center text-sm p-2 gap-2'
							>
								<GitPullRequestArrow size={21} /> Заявки на створення
							</Link>
						</div>
					</div>
					<div className='flex flex-col gap-2'>
						<Button
							variant='flat'
							className='w-full flex justify-start items-center p-3 gap-2'
						>
							<Info size={20} />
							Про сервіс
						</Button>
						<Button
							color='danger'
							variant='flat'
							className='w-full flex justify-start items-center p-3 gap-2'
							onClick={async () => await authService.logout()}
						>
							<LogOut size={20} />
							Вихід
						</Button>
					</div>
				</div>
			</aside>
			<Divider orientation='vertical' />
		</div>
	)
}
