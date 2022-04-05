export const isNumber = value => {
	return typeof value === 'number';
};

export const isString = value => {
	return typeof value === 'string';
};

export const isArray = value => {
	return value && Array.isArray(value);
};

export const isObject = value => {
	return value && typeof value === 'object' && !Array.isArray(value);
};

export const isEmpty = value => {
	if (isArray(value)) return value.length === 0;
	if (isString(value)) return value.trim().length === 0;
	if (isObject(value)) return Object.entries(value).length === 0;
	if (isNumber(value)) return false;

	return !value;
};
