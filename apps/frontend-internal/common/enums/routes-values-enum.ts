import {
  GitPullRequestArrow,
  House,
  MailPlus,
	User,
} from "lucide-react";

import { Route, ROUTES } from "./routes-enum";

type RouteValue = {
  title: string;
  icon: React.ElementType;
};

export const RoutesValues: Record<Route, RouteValue> = {
  [ROUTES.DASHBOARD]: {
    title: "Дашборд",
    icon: House
  },
	[ROUTES.SIGN_IN]: {
		title: "Вхід",
		icon: User
	},
	[ROUTES.AVAILABLE_ORGANIZATION_REQUESTS]: {
		title: "Доступні заявки",
		icon: MailPlus
	},
	[ROUTES.PROCESSING_ORGANIZATION_REQUESTS]: {
		title: "Обробка заявок",
		icon: GitPullRequestArrow
	},
	[ROUTES.ORGANIZATION_REQUEST]: {
		title: "Заявка",
		icon: MailPlus
	}
};
