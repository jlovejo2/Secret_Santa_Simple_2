import { ChangeEvent } from 'mongodb';
import React from 'react';
import { InputField } from '../../components/Input';


type createFormFieldProps = {
    label: string, 
    name: string,
    type: string,
    defaultValue: string,
}

type renderInputProps = {
    handleChange: (e: ChangeEvent) => void,
    value: string,
    isValid: boolean,
    error: string,
    key: string
}

/*
 * creates and returns object representation of form field
 *
 * @param {string} label - label to show with the form input
 * @param {string} name - input name
 * @param {string} type - input type
 * @param {string} defaultValue - default value for the input
 */

const createFormFieldConfig = ({label, name, type, defaultValue = ''}: createFormFieldProps) => {
  return {
    renderInput: ({handleChange, value, isValid, error, key}: renderInputProps) => {
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
        />
      );
    },
    label,
    value: defaultValue,
    valid: false,
    errorMessage: '',
    touched: false,
  };
}

// object representation of signup form
export const signupForm = {
    name: {
      ...createFormFieldConfig('Full Name', 'name', 'text'),
    },
    email: {
      ...createFormFieldConfig('Email', 'email', 'email'),
    },
    password: {
      ...createFormFieldConfig('Password', 'password', 'password'),
    },
    confirmPassword: {
      ...createFormFieldConfig('Confirm Password', 'confirmPassword', 'password'),
    },
  };