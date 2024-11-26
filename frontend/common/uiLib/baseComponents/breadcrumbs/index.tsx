'use client'

import React, { ReactNode } from 'react'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'

type TBreadCrumbProps = {
	homeElement: ReactNode
	separator: ReactNode
	containerClasses?: string
	listClasses?: string
	activeClasses?: string
	capitalizeLinks?: boolean
}

const LibBreadcrumbs = ({
	homeElement,
	separator,
	containerClasses,
	listClasses,
	activeClasses,
	capitalizeLinks
}: TBreadCrumbProps) => {
	const paths = usePathname()
	const pathNames = paths.split('/').filter(path => path)

	return (
		<div>
			<Breadcrumbs>
				<BreadcrumbItem>
					<Link href={'/'}>{homeElement}</Link>
				</BreadcrumbItem>
				{pathNames.length > 0 &&
					pathNames.map((link, index) => {
						let href = `/${pathNames.slice(0, index + 1).join('/')}`
						let itemClasses =
							paths === href ? `${listClasses} ${activeClasses}` : listClasses
						let itemLink = capitalizeLinks
							? link[0].toUpperCase() + link.slice(1, link.length)
							: link
						return (
							<React.Fragment key={index}>
								<li className={itemClasses}>
									<Link href={href}>{itemLink}</Link>
								</li>
								{pathNames.length !== index + 1 && separator}
							</React.Fragment>
						)
					})}
			</Breadcrumbs>
		</div>
	)
}

export default LibBreadcrumbs
