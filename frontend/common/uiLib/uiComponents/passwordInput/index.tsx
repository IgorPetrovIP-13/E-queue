'use client'

import { forwardRef, useState } from 'react'
import { Input } from '@nextui-org/react'
import { EyeSlashFilledIcon } from './EyeSlashFilledIcon'
import { EyeFilledIcon } from './EyeFilledIcon'

interface IPasswordInputProps {
	id: string
	name: string
	size: 'sm' | 'md' | 'lg'
	label: string
	isRequired: boolean
	value: string
	onChange: (e: any) => void
	onBlur: (e: any) => void
	isInvalid: boolean
	errorMessage: string | undefined
}

const LibPasswordInput = forwardRef<HTMLInputElement, IPasswordInputProps>(
	(props, ref) => {
		const [isVisible, setIsVisible] = useState(false)
		const toggleVisibility = () => setIsVisible(!isVisible)

		return (
			<Input
				id={props.name}
				name={props.name}
				size={props.size}
				label={props.label}
				isRequired={props.isRequired}
				value={props.value}
				onChange={props.onChange}
				onBlur={props.onBlur}
				isInvalid={props.isInvalid}
				errorMessage={props.errorMessage}
				ref={ref}
				endContent={
					<button
						className='focus:outline-none mb-1'
						type='button'
						onClick={toggleVisibility}
						aria-label='toggle password visibility'
					>
						{isVisible ? (
							<EyeSlashFilledIcon className='w-6 h-6 text-default-400 pointer-events-none' />
						) : (
							<EyeFilledIcon className='w-6 h-6 text-default-400 pointer-events-none' />
						)}
					</button>
				}
				type={isVisible ? 'text' : 'password'}
			/>
		)
	}
)

export default LibPasswordInput
