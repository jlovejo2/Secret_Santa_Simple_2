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

	function renderFormInputs() {
		return Object.values(form).map((inputObj: any) => {
			const { value, label, errorMessage, valid, renderInput } = inputObj;
			return renderInput(onInputChange, value, valid, errorMessage, label);
		});
	}

	const isInputFieldValid = useCallback(
		inputField => {
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
	}, [form]);

	return { renderFormInputs, isFormValid };
};

export default useForm;
