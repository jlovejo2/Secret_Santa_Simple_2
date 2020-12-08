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
			return renderInput({ onInputChange, value, valid, errorMessage, label });
		});
	}

	const onInputChange = useCallback((e: ChangeEvent) => {
		// not yet implemented
	}, []);

	return { renderFormInputs };
};

export default useForm;
