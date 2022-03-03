import React, { FormEvent, SyntheticEvent } from 'react';
import { useForm } from '@hooks/useForm';
import {
	createFormFieldConfig,
	maxLengthRule,
	minLengthRule,
	requiredRule
} from '@hooks/useForm/helper';

type SignInFormProps = {
	handleSignInSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export const signinForm = {
	email: {
		...createFormFieldConfig('Email', 'email', 'email', 'Enter email here...'),
		validationRules: [
			requiredRule('email'),
			minLengthRule('email', 10),
			maxLengthRule('email', 25)
		]
	},
	password: {
		...createFormFieldConfig(
			'Password',
			'password',
			'password',
			'Enter password here...'
		),
		validationRules: [
			requiredRule('password'),
			minLengthRule('password', 8),
			maxLengthRule('password', 20)
		]
	}
};

export default function SignupForm(props: SignInFormProps) {
	const { handleSignInSubmit } = props;
	const { renderFormInputs, isFormValid } = useForm(signinForm);

	return (
		<form className='signupForm' onSubmit={handleSignInSubmit}>
			{renderFormInputs()}
			<button type='submit' disabled={!isFormValid()}>
				Submit
			</button>
		</form>
	);
}
