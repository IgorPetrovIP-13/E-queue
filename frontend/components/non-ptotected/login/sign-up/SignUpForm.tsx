'use client'

import { Button } from '@nextui-org/button'
import { Divider } from '@nextui-org/divider'
import { Input } from '@nextui-org/input'
import { Controller, SubmitHandler, UseFormHandleSubmit } from 'react-hook-form'

import LibPasswordInput from '@/common/uiLib/uiComponents/passwordInput'
import { Control, FieldErrors } from 'react-hook-form'
import { IFormValues } from '@/types/forms/sign-up-form.types'

interface ISignUpForm {
	onSubmit: SubmitHandler<IFormValues>
	handleSubmit: UseFormHandleSubmit<IFormValues, undefined>
	control: Control<IFormValues>
	errors: FieldErrors
	isSubmitting: boolean
	isValid: boolean
	dirtyFields: Record<string, boolean>
}

const SignUpForm: React.FC<ISignUpForm> = ({
	onSubmit,
	handleSubmit,
	control,
	errors,
	isSubmitting,
	isValid,
	dirtyFields
}) => {
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className='flex flex-col gap-4'>
				<div className='flex gap-4'>
					<Controller
						name='name'
						control={control}
						render={({ field }) => (
							<Input
								{...field}
								id='name'
								size='sm'
								label="Ім'я"
								isRequired
								isInvalid={!!errors.name}
								errorMessage={errors.name?.message?.toString()}
							/>
						)}
					/>
					<Controller
						name='surname'
						control={control}
						render={({ field }) => (
							<Input
								{...field}
								id='surname'
								size='sm'
								label='Прізвище'
								isRequired
								isInvalid={!!errors.surname}
								errorMessage={errors.surname?.message?.toString()}
							/>
						)}
					/>
				</div>
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
				<Controller
					name='confirmPassword'
					control={control}
					render={({ field }) => (
						<LibPasswordInput
							{...field}
							id='confirmPassword'
							size='sm'
							label='Підтвердження паролю'
							isRequired
							isInvalid={!!errors.confirmPassword}
							errorMessage={errors.confirmPassword?.message?.toString()}
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

export default SignUpForm
