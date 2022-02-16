import { gql } from '@apollo/client';
import React, { FormEvent, Fragment } from 'react';
import { signupForm } from '../../hooks/useForm/helper';
import { Modal } from '../Modal';
import SignInForm from './SignInForm';
import {
	User,
	CreateUserInput,
	useCreateUserMutation
} from '../../src/graphql/types';
import { isEmpty } from '../../src/utils/sanitizers';

gql`
	mutation createUser($input: CreateUserInput!) {
		createUser(input: $input) {
			userId
			first_name
		}
	}
`;
interface SignInModalProps {
	title: String;
	show: Boolean;
	onClose: () => void;
}

const SignInModal = (props: SignInModalProps) => {
	const { title, onClose, show } = props;
	// const [createUser] = useCreateUserMutation();

	const handleSignInSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let signUpInput: any = {};

		const keysArr = Object.keys(signupForm);
		if (!keysArr) throw Error('no keys in signUpForm');
		for (let field of keysArr) {
			if (field !== 'confirmPassword') signUpInput[field] = e.target[field].value;
		}

		const filteredInput: CreateUserInput = signUpInput;

		if (!isEmpty(signUpInput)) {
			console.log(filteredInput);
			// const { data } = await createUser({ variables: { input: filteredInput } });
			// console.log('create user: ', data);
		} else {
			throw Error('Error signing in User');
		}
	};

	const modalHeaderElem = (
		<Fragment>
			<h1>{title}</h1>
		</Fragment>
	);

	const modalBodyElem = (
		<Fragment>
			<SignInForm handleSignInSubmit={handleSignInSubmit} />
		</Fragment>
	);

	const modalFooterElem = (
		<Fragment>
			<div className='text-center text-sm text-grey-dark mt-4'>
				By signing up, you agree to the
				<a className='pl-1 no-underline border-b border-grey-dark' href='#'>
					Terms of Service
				</a>{' '}
				and
				<a className='pl-1 no-underline border-b border-grey-dark' href='#'>
					Privacy Policy
				</a>
			</div>
		</Fragment>
	);

	return (
		<Modal
			show={show}
			onClose={onClose}
			closeModalInHeader={true}
			modalHeader={modalHeaderElem}
			modalBody={modalBodyElem}
			modalFooter={modalFooterElem}
		/>
	);
};

export default SignInModal;
