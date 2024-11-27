'use client'

import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure
} from '@nextui-org/react'
import { Info } from 'lucide-react'

export default function InfoButton() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	return (
		<>
			<Button
				variant='flat'
				isIconOnly
				className='w-full flex justify-center lg:justify-start items-center lg:p-3 gap-2'
				onPress={onOpen}
			>
				<Info size={20} />
				<span className='hidden lg:inline'>Про сервіс</span>
			</Button>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
			>
				<ModalContent>
					{onClose => (
						<>
							<ModalHeader className='text-blue-400 flex items-center gap-2'>
								<Info size={20} />
								Про сервіс
							</ModalHeader>
							<ModalBody>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									Nullam pulvinar risus non risus hendrerit venenatis.
									Pellentesque sit amet hendrerit risus, sed porttitor quam.
								</p>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									Nullam pulvinar risus non risus hendrerit venenatis.
									Pellentesque sit amet hendrerit risus, sed porttitor quam.
								</p>
								<p>
									Magna exercitation reprehenderit magna aute tempor cupidatat
									consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
									incididunt cillum quis. Velit duis sit officia eiusmod Lorem
									aliqua enim laboris do dolor eiusmod. Et mollit incididunt
									nisi consectetur esse laborum eiusmod pariatur proident Lorem
									eiusmod et. Culpa deserunt nostrud ad veniam.
								</p>
							</ModalBody>
							<ModalFooter>
								<Button
									color='danger'
									variant='flat'
									onPress={onClose}
								>
									Закрити
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	)
}
