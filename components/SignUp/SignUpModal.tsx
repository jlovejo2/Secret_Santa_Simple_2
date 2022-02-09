import React, { Fragment } from 'react';
import { Modal } from '../Modal';
import SignupForm from './SignUpForm';

interface SignUpModalProps {
	title: String;
	show: Boolean;
	onClose: () => void;
}

const SignUpModal = (props: SignUpModalProps) => {
	const { title, onClose, show } = props;

	const modalHeaderElem = (
		<Fragment>
			<h1>{title}</h1>
		</Fragment>
	);

	const modalBodyElem = (
		<Fragment>
			<SignupForm />
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
			<div className='mt-4'>
				Already have an account?
				<a
					className='px-1 no-underline border-b border-blue text-blue'
					href='../login/'
				>
					Log in
				</a>
				.
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

export default SignUpModal;
