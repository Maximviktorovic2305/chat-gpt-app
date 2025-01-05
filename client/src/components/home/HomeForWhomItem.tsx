import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '../ui/accordion'

interface Props {
	title: string
	description: string
   value: number
}

const HomeForWhomItem = ({ title, description, value }: Props) => {
	return (
		<AccordionItem value={String(value)}>
			<AccordionTrigger>{title}</AccordionTrigger>
			<AccordionContent className='px-3'>{description}</AccordionContent>
		</AccordionItem>
	)
}

export default HomeForWhomItem
