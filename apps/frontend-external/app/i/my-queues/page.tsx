import { getRouteSSR } from "@repo/core/utils/getRouteSSR";

import { getRouteValue } from "@/utils/getRouteValue";
import { Route } from "@/common/enums/routes-enum";
import FindById from "@/modules/i/my-queues/findById/FindById";
import QueuesWrapper from "@/modules/i/my-queues/queuesList/QueuesWrapper";

export default async function MyQueuesPage() {
	const route = await getRouteSSR();

	const { title, icon: Icon } = getRouteValue(route as Route);

	return (
		<>
			<div className="flex items-center gap-2">
				<Icon size={21} />
				<h1 className="text-md">{title}</h1>
			</div>
			<FindById />
			<QueuesWrapper />
		</>
	);
}
