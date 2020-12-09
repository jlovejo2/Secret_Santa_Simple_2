import { useState, useCallback, ChangeEvent } from 'react';
import { renderInputProps } from './helper';

type useFormProps = {
	value: string;
	label: string;
	errorMessage: string;
	valid: boolean;
	renderInput: ({}: renderInputProps) => JSX.Element;
};

const useForm = (formObj: any) => {
	const [form, setForm] = useState(formObj);

	console.log('form state object: ', form);

	function renderFormInputs() {
		return Object.values(form).map((inputObj: any) => {
			const { value, label, errorMessage, valid, renderInput } = inputObj;
			console.log(
				'input object values:',
				value,
				label,
				errorMessage,
				valid,
				renderInput
			);
			return renderInput(onInputChange, value, valid, errorMessage, label);
		});
	}

	const isInputFieldValid = useCallback(
		inputField => {
			console.log('in is input field valid...');
			for (const rule of inputField.validationRules) {
				if (!rule.validate(inputField.value, form)) {
					inputField.errorMessage = rule.message;
					return false;
				}
			}
			return true;
		},
		[form]
	);

	const onInputChange = useCallback(
		(e: ChangeEvent) => {
			const { name, value } = e.target as HTMLInputElement;
			const inputObj = { ...form[name] };

			console.log('name: ', name);
			console.log('value: ', value);
			inputObj.value = value;

			const isValidInput = isInputFieldValid(inputObj);

			if (isValidInput && !inputObj.valid) {
				inputObj.valid = true;
			} else if (!isValidInput && inputObj.valid) {
				inputObj.valid = false;
			}

			inputObj.touched = true;
			setForm({ ...form, [name]: inputObj });
		},
		[form, isInputFieldValid]
	);

	const isFormValid = useCallback(() => {
		let isValid = true;
		const arr: any[] = Object.values(form);

		for (let i = 0; i < arr.length; i++) {
			if (!arr[i].valid) {
				isValid = false;
				break;
			}
		}

		return isValid;
	}, []);

	return { renderFormInputs, isFormValid };
};

export default useForm;
