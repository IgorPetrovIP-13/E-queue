import { ROUTES } from '@/common/enums/routes-enum'
import { AsideValues } from '@/common/enums/routes-values'
import { Link } from '@nextui-org/link'
import { usePathname } from 'next/navigation'

interface IAsideLink {
	href: ROUTES
}

export default function AsideLink(props: IAsideLink) {
	const pathname = usePathname()
	const { title, icon: Icon } = AsideValues[props.href]

	return (
		<Link
			href={props.href}
			isBlock
			isDisabled={pathname === props.href}
			color='foreground'
			className={`flex justify-center lg:justify-start items-center text-sm p-2 gap-2`}
		>
			{<Icon size={21} />}
			<span className='hidden lg:block'>{title}</span>
		</Link>
	)
}
