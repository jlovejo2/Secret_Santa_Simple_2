import { gql } from '@apollo/client';
import React, { FormEvent, Fragment } from 'react';
import { Modal } from '../Modal';
import SignInForm, { signinForm } from './SignInForm';
import {
	User,
	LoginUserInput,
	useLoginUserMutation
} from '../../src/graphql/types';
import { isEmpty } from '../../src/utils/sanitizers';
import { Router } from 'express';
import { useRouter } from 'next/router';

gql`
	mutation loginUser($input: loginUserInput!) {
		loginUser(input: $input) {
			token
			userId
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
	const router = useRouter();
	const [loginUser] = useLoginUserMutation();

	const handleSignInSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let signInInput: any = {};

		const keysArr = Object.keys(signinForm);
		if (!keysArr) throw Error('no keys in signUpForm');
		for (let field of keysArr) {
			if (field !== 'confirmPassword') signInInput[field] = e.target[field].value;
		}

		const filteredInput: LoginUserInput = signInInput;

		console.log('log in user: ', filteredInput);

		if (!isEmpty(signInInput)) {
			const { data } = await loginUser({ variables: { input: filteredInput } });
			console.log('logged in User ', data);
			if (data) {
				onClose();
				localStorage.setItem('auth-token', data.loginUser.token as string);
				router.push({
					pathname: '/dashboard',
					query: { uid: data.loginUser.userId }
				});
			} else
				throw new Error(
					'An error occurred logging in user.  Please ensure your password and email are correct'
				);
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
