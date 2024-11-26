import { Tooltip, Button } from '@nextui-org/react'
import { Info } from 'lucide-react'

interface ITooltipProps {
	description: string
}

const LibTooltip = (props: ITooltipProps) => {
	return (
		<Tooltip
			content={props.description}
			closeDelay={150}
		>
			<Button
				isIconOnly
				variant='bordered'
				size='sm'
			>
				<Info />
			</Button>
		</Tooltip>
	)
}

export default LibTooltip
