import React from 'react';
import { useForm } from '../../hooks/useForm';
import { signupForm } from '../../hooks/useForm/helper';

export default function SignupForm(handleSignUpSubmit) {
	const { renderFormInputs, isFormValid } = useForm(signupForm);

	return (
		<form className='signupForm'>
			{renderFormInputs()}
			<button onClick={handleSignUpSubmit} type='submit' disabled={!isFormValid()}>
				Submit
			</button>
		</form>
	);
}
