'use client'

import { ROUTES } from '@/common/enums/routes-enum'
import { useProfile } from '@/common/hooks/useProfile'
import { Divider, Link, User } from '@nextui-org/react'
import { TrendingUpDown } from 'lucide-react'
import AsideLink from './AsideLink'
import InfoButton from './InfoButton'
import LogoutButton from './LogoutButton'

export default function Aside() {
	const { isLoading, data } = useProfile()

	if (isLoading) return <></>

	return (
		<div className='sticky top-0 flex h-screen'>
			<aside className='flex flex-col gap-7 w-14 lg:w-64 transition-all py-6 px-2 lg:px-7 pt-8'>
				<h1 className='flex items-center justify-center lg:justify-start gap-2'>
					<TrendingUpDown size={21} />
					<span className='hidden lg:inline'>E-QUEUE</span>
				</h1>
				<Link
					href={ROUTES.PROFILE}
					color='foreground'
				>
					<User
						className='justify-start'
						name={<span className='hidden lg:inline'>{data.surname + ' ' + data.name}</span>}
						description={<span className='hidden lg:inline'>{data.email}</span>}
						avatarProps={{ src: '/pudge.png' }}
					/>
				</Link>
				<div className='flex-1 flex flex-col justify-between'>
					<div className='flex flex-col gap-3'>
						<div className='flex flex-col gap-1'>
							<Divider />
							<AsideLink href={ROUTES.DASHBOARD} />
						</div>
						<div className='flex flex-col gap-1'>
							<Divider />
							<AsideLink href={ROUTES.CREATE_QUEUE} />
							<AsideLink href={ROUTES.MY_QUEUES} />
						</div>
						<div className='flex flex-col gap-1'>
							<Divider />
							<AsideLink href={ROUTES.CREATE_ORGANIZATION} />
							<AsideLink href={ROUTES.MY_ORGANIZATIONS} />
							<AsideLink href={ROUTES.ORGANIZATION_REQUESTS} />
						</div>
					</div>
					<div className='flex flex-col gap-2'>
						<InfoButton />
						<LogoutButton />
					</div>
				</div>
			</aside>
			<Divider orientation='vertical' />
		</div>
	)
}
