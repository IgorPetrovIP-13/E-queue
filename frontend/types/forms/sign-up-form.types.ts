export interface IFormValues {
	name: string
	surname: string
	email: string
	password: string
	confirmPassword: string
}

export const initialValues: IFormValues = {
	name: '',
	surname: '',
	email: '',
	password: '',
	confirmPassword: ''
}
