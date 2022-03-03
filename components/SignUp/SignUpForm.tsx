import React, { FormEvent, SyntheticEvent } from 'react';
import { useForm } from '@hooks/useForm';
import { signupForm } from '@hooks/useForm/helper';

type SignUpFormProps = {
	handleSignUpSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export default function SignupForm(props: SignUpFormProps) {
	const { handleSignUpSubmit } = props;
	const { renderFormInputs, isFormValid } = useForm(signupForm);

	return (
		<form className='signupForm' onSubmit={handleSignUpSubmit}>
			{renderFormInputs()}
			<button type='submit' disabled={!isFormValid()}>
				Submit
			</button>
		</form>
	);
}
