import React, { ChangeEvent } from 'react';

export type InputFieldProps = {
	name: string;
	type: string;
	label: string;
	isValid: boolean;
	value: string;
	handleChange: (e: ChangeEvent) => void;
	errorMessage: string;
	placeholder: string;
};

const InputField = (props: InputFieldProps) => {
	const {
		label,
		type,
		name,
		handleChange,
		errorMessage,
		isValid,
		value,
		placeholder
	} = props;

	return (
		<div className='inputContainer block'>
			<label>
				<span className='text-gray-800'>{label}</span>
				<input
					type={type}
					name={name}
					value={value}
					onChange={handleChange}
					placeholder={placeholder}
				/>
				{errorMessage && !isValid && <span className='error'>{errorMessage}</span>}
			</label>
		</div>
	);
};

export default InputField;
