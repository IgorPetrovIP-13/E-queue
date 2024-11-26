'use client'

import { Card, CardHeader, CardBody } from '@nextui-org/card'
import { Divider } from '@nextui-org/divider'

import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { initialValues, IFormValues } from '@/types/forms/sign-in-form.types'
import { UserRoundSearch } from 'lucide-react'
import { authService } from '@/services/auth.service'
import SignInForm from '@/components/non-ptotected/login/sign-in/SignInForm'
import signInSchema from '@/common/utils/validationSchemas/sign-in.schema'
import { ROUTES } from '@/common/enums/routes-enum'
import { useRouter } from 'next/navigation'
import { profileService } from '@/services/profile.service'
import { toast } from 'sonner'
import { formatAxiosError } from '@/common/axios/error'

export default function SignInPage() {
	const {
		control,
		reset,
		handleSubmit,
		formState: { errors, isSubmitting, isValid, dirtyFields }
	} = useForm<IFormValues>({
		resolver: zodResolver(signInSchema),
		mode: 'onTouched',
		defaultValues: initialValues
	})

	const router = useRouter()

	const onSubmit: SubmitHandler<IFormValues> = async (values: IFormValues) => {
		const payload = {
			email: values.email,
			password: values.password
		}

		try {
			await authService.signIn(payload);
			console.log(await profileService.getProfile());
			reset()
		} catch (error) {
			toast(formatAxiosError(error))
		}
	}

	return (
		<Card className='w-full max-w-md'>
			<CardHeader className='flex justify-between'>
				<div className='flex items-center gap-2'>
					<UserRoundSearch />
					<h1 className='text-xl'>Вхід</h1>
				</div>
			</CardHeader>
			<Divider />
			<CardBody>
				<SignInForm
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
