import { ROUTES } from './routes-enum'
import { Building2, Calendar, CalendarPlus, GitPullRequestArrow, House, NotebookPen } from 'lucide-react'

type AsideValue = {
	title: string
	icon: React.ElementType
}

export const AsideValues: Record<string, AsideValue> = {
	[ROUTES.DASHBOARD]: {
		title: 'Дашборд',
		icon: House
	},
	[ROUTES.CREATE_QUEUE]: {
		title: 'Створити чергу',
		icon: CalendarPlus
	},
	[ROUTES.MY_QUEUES]: {
		title: 'Мої черги',
		icon: Calendar
	},
	[ROUTES.CREATE_ORGANIZATION]: {
		title: 'Нова організація',
		icon: NotebookPen
	},
	[ROUTES.MY_ORGANIZATIONS]: {
		title: 'Мої організації',
		icon: Building2
	},
	[ROUTES.ORGANIZATION_REQUESTS]: {
		title: 'Заявки організацій',
		icon: GitPullRequestArrow
	}
}
