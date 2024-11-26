'use client'

import { Button } from '@nextui-org/button'
import { Divider } from '@nextui-org/divider'
import { Input } from '@nextui-org/input'
import { Controller, SubmitHandler, UseFormHandleSubmit } from 'react-hook-form'

import LibPasswordInput from '@/common/uiLib/uiComponents/passwordInput'
import { Control, FieldErrors } from 'react-hook-form'
import { IFormValues } from '@/types/forms/sign-in-form.types'

interface ISignInForm {
	onSubmit: SubmitHandler<IFormValues>
	handleSubmit: UseFormHandleSubmit<IFormValues, undefined>
	control: Control<IFormValues>
	errors: FieldErrors
	isSubmitting: boolean
	isValid: boolean
	dirtyFields: Record<string, boolean>
}

export default function SignUpForm({
	onSubmit,
	handleSubmit,
	control,
	errors,
	isSubmitting,
	isValid,
	dirtyFields
}: ISignInForm) {
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className='flex flex-col gap-4'>
				<Controller
					name='email'
					control={control}
					render={({ field }) => (
						<Input
							{...field}
							id='email'
							size='sm'
							label='Email'
							isRequired
							type='email'
							isInvalid={!!errors.email}
							errorMessage={errors.email?.message?.toString()}
						/>
					)}
				/>
				<Controller
					name='password'
					control={control}
					render={({ field }) => (
						<LibPasswordInput
							{...field}
							id='password'
							size='sm'
							label='Пароль'
							isRequired
							isInvalid={!!errors.password}
							errorMessage={errors.password?.message?.toString()}
						/>
					)}
				/>
				<Divider />
				<div className='flex justify-end'>
					<Button
						color='secondary'
						variant='flat'
						type='submit'
						isDisabled={
							!isValid || isSubmitting || Object.keys(dirtyFields).length === 0
						}
						isLoading={isSubmitting}
					>
						Підтвердити
					</Button>
				</div>
			</div>
		</form>
	)
}
