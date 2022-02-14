import React, { ChangeEvent } from 'react';
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
		renderInput: (handleChange, value, isValid, error, key): JSX.Element => {
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
	first_name: {
		...createFormFieldConfig(
			'First Name',
			'first_name',
			'text',
			'Enter first name here...'
		),
		validationRules: [
			requiredRule('first_name'),
			minLengthRule('first_name', 3),
			maxLengthRule('first_name', 50)
		]
	},
	last_name: {
		...createFormFieldConfig(
			'Last Name',
			'last_name',
			'text',
			'Enter last name here...'
		),
		validationRules: [
			requiredRule('last_name'),
			minLengthRule('last_name', 3),
			maxLengthRule('last_name', 50)
		]
	},
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
	},
	confirmPassword: {
		...createFormFieldConfig(
			'Confirm Password',
			'confirmPassword',
			'password',
			'Please confirm password...'
		),
		validationRules: [passwordMatchRule()]
	}
};

/*
 * creates and returns a validation rule object that
 * is used by useForm hook to validate the form inputs
 *
 * @param {string} ruleName - name of the validation rule
 * @param {string} errorMessage - message to display
 * @param {function} validateFunc - validation function
 */
export function createValidationRule(ruleName, errorMessage, validateFunc) {
	return {
		name: ruleName,
		message: errorMessage,
		validate: validateFunc
	};
}

export function requiredRule(inputName) {
	return createValidationRule(
		'required',
		`${inputName} required`,
		(inputValue, formObj) => inputValue.length !== 0
	);
}

export function minLengthRule(inputName, minCharacters) {
	return createValidationRule(
		'minLength',
		`${inputName} should contain atleast ${minCharacters} characters`,
		(inputValue, formObj) => inputValue.length >= minCharacters
	);
}

export function maxLengthRule(inputName, maxCharacters) {
	return createValidationRule(
		'minLength',
		`${inputName} cannot contain more than ${maxCharacters} characters`,
		(inputValue, formObj) => inputValue.length <= maxCharacters
	);
}

export function passwordMatchRule() {
	return createValidationRule(
		'passwordMatch',
		`passwords do not match`,
		(inputValue, formObj) => inputValue === formObj.password.value
	);
}
