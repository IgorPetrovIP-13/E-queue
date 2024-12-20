'use client'

import { Card, CardHeader, CardBody } from '@nextui-org/card'
import { Divider } from '@nextui-org/divider'

import SignUpForm from '@/components/non-ptotected/login/sign-up/SignUpForm'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import signUpSchema from '@/common/utils/validationSchemas/sign-up.schema'
import { initialValues, IFormValues } from '@/types/forms/sign-up-form.types'
import { UserRoundPlus } from 'lucide-react'
import { authService } from '@/services/auth.service'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/common/enums/routes-enum'
import { formatAxiosError } from '@/common/axios/error'
import { useMutation } from '@tanstack/react-query'
import { ISignUpReq } from '@/types/services/auth.types'

export default function SignUpPage() {
	const {
		control,
		reset,
		handleSubmit,
		formState: { errors, isSubmitting, isValid, dirtyFields }
	} = useForm<IFormValues>({
		resolver: zodResolver(signUpSchema),
		mode: 'onTouched',
		defaultValues: initialValues
	})

	const router = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['signUp'],
		mutationFn: (data: ISignUpReq) => authService.signUp(data),
		onSuccess: data => {
			toast('Ласкаво просимо на платформу, ' + data.name + '!')
			router.push(ROUTES.DASHBOARD)
			reset()
		},
		onError: error => {
			toast(formatAxiosError(error))
		}
	})

	const onSubmit: SubmitHandler<IFormValues> = async (values: IFormValues) => {
		const payload = {
			name: values.name,
			surname: values.surname,
			email: values.email,
			password: values.password
		}
		mutate(payload)
	}

	return (
		<Card className='w-xl'>
			<CardHeader className='flex justify-between'>
				<div className='flex items-center gap-2'>
					<UserRoundPlus />
					<h1 className='text-xl'>Реєстрація</h1>
				</div>
			</CardHeader>
			<Divider />
			<CardBody>
				<SignUpForm
					onSubmit={onSubmit}
					handleSubmit={handleSubmit}
					control={control}
					errors={errors}
					isSubmitting={isSubmitting}
					isValid={isValid}
					dirtyFields={dirtyFields}
				/>
			</CardBody>
		</Card>
	)
}
