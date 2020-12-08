import { ChangeEvent } from 'react';
import { InputField } from '../../components/Input';
import { InputFieldProps } from '../../components/Input/input';

type createFormFieldProps = {
	label: string;
	name: string;
	type: string;
	defaultValue: string;
};

export type renderInputProps = {
	handleChange: (e: ChangeEvent) => void;
	value: string;
	isValid: boolean;
	error: string;
	key: string;
};

/*
 * creates and returns object representation of form field
 *
 * @param {string} label - label to show with the form input
 * @param {string} name - input name
 * @param {string} type - input type
 * @param {string} defaultValue - default value for the input
 */

export const createFormFieldConfig = (
	label: string,
	name: string,
	type: string,
	placeholder: string,
	defaultValue = ''
) => {
	const resultObj = {
		renderInput: ({
			handleChange,
			value,
			isValid,
			error,
			key
		}: renderInputProps): JSX.Element => {
			return (
				<InputField
					key={key}
					name={name}
					type={type}
					label={label}
					isValid={isValid}
					value={value}
					handleChange={handleChange}
					errorMessage={error}
					placeholder={placeholder}
				/>
			);
		},
		label,
		value: defaultValue,
		valid: false,
		errorMessage: '',
		touched: false
	};

	return resultObj;
};

// object representation of signup form
export const signupForm = {
	name: {
		...createFormFieldConfig('Full Name', 'name', 'text', 'Enter name here...')
	},
	email: {
		...createFormFieldConfig('Email', 'email', 'email', 'Enter email here...')
	},
	password: {
		...createFormFieldConfig(
			'Password',
			'password',
			'password',
			'Enter password here...'
		)
	},
	confirmPassword: {
		...createFormFieldConfig(
			'Confirm Password',
			'confirmPassword',
			'password',
			'Please confirm password...'
		)
	}
};
