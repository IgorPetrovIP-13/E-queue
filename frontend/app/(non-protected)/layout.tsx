'use client'

import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Link,
	Button,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle
} from '@nextui-org/react'
import { TrendingUpDown } from 'lucide-react'

export default function NonProtectedLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<div className='min-h-screen flex flex-col'>
			<Navbar
				shouldHideOnScroll
				className='mt-[-1px]'
			>
				<NavbarMenuToggle className='md:hidden' />
				<NavbarBrand>
					<Link
						href={'/welcome'}
						color='foreground'
						className='gap-2'
					>
						<TrendingUpDown size={20} />
						E-QUEUE
					</Link>
				</NavbarBrand>
				<NavbarContent
					className='hidden md:flex gap-4'
					justify='center'
				>
					<NavbarItem>
						<Link
							color='foreground'
							href='#'
						>
							Оновлення
						</Link>
					</NavbarItem>
					<NavbarItem isActive>
						<Link
							color='secondary'
							href='#'
							aria-current='page'
						>
							Техпідтримка
						</Link>
					</NavbarItem>
					<NavbarItem>
						<Link
							color='foreground'
							href='#'
						>
							Детальніше
						</Link>
					</NavbarItem>
				</NavbarContent>
				<NavbarContent justify='end'>
					<NavbarItem>
						<Link
							color='secondary'
							href='/sign-in'
						>
							Увійти
						</Link>
					</NavbarItem>
					<NavbarItem>
						<Button
							as={Link}
							color='secondary'
							href='/sign-up'
							variant='flat'
						>
							Реєстрація
						</Button>
					</NavbarItem>
				</NavbarContent>
				<NavbarMenu className='overflow-hidden bg-opacity-30'>
					<NavbarMenuItem>
						<Button
							as={Link}
							href='#'
							variant='light'
							className='w-full justify-start text-base'
						>
							Оновлення
						</Button>
					</NavbarMenuItem>
					<NavbarMenuItem isActive>
						<Button
							color='secondary'
							as={Link}
							href='#'
							variant='light'
							className='w-full justify-start text-base'
						>
							Техпідтримка
						</Button>
					</NavbarMenuItem>
					<NavbarMenuItem>
						<Button
							as={Link}
							href='#'
							variant='light'
							className='w-full justify-start text-base'
						>
							Детальніше
						</Button>
					</NavbarMenuItem>
				</NavbarMenu>
			</Navbar>
			<div className='flex flex-1 justify-center px-6 py-9'>
				<main className='w-full max-w-[1400]'>{children}</main>
			</div>
			<footer className='flex flex-col justify-center pb-9 px-6 gap-3'>
				<div className='flex justify-center items-center gap-2'>
					<TrendingUpDown size={17} />
					E-QUEUE
				</div>
				<p className='text-center text-sm text-gray-400'>
					© 2024 Ihor Petrov IP-13. All rights reserved.
				</p>
			</footer>
		</div>
	)
}
