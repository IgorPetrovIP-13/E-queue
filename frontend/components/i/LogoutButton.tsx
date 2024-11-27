'use client'

import { formatAxiosError } from '@/common/axios/error'
import { authService } from '@/services/auth.service'
import { Button } from '@nextui-org/button'
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useDisclosure
} from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'
import { LogOut, TriangleAlert } from 'lucide-react'
import { toast } from 'sonner'

export default function LogoutButton() {
	// const router = useRouter()

	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	const { mutate, isPending } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => {
			// router.push(ROUTES.WELCOME)
		},
		onError: error => {
			toast(formatAxiosError(error))
		}
	})

	const handleLogout = (onClose: () => void) => {
		mutate()
		onClose()
	}

	return (
		<>
			<Button
				variant='flat'
				color='danger'
				isIconOnly
				className='w-full flex justify-center lg:justify-start items-center lg:p-3 gap-2'
				onPress={onOpen}
			>
				<LogOut size={20} />
				<span className='hidden lg:inline'>Вихід</span>
			</Button>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
			>
				<ModalContent>
					{onClose => (
						<>
							<ModalHeader className='text-warning flex items-center gap-2'>
								<TriangleAlert size={20} />
								Вихід з системи
							</ModalHeader>
							<ModalBody>
								Після виходу з системи вам доведеться повторно авторизуватися.
							</ModalBody>
							<ModalFooter>
								<Button
									color='danger'
									variant='flat'
									isLoading={isPending}
									onPress={() => handleLogout(onClose)}
								>
									Вийти
								</Button>
								<Button
									color='default'
									variant='flat'
									onPress={onClose}
								>
									Відміна
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	)
}
