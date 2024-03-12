export const validateFields = (fields) => {
	const isValidate = fields.every((field) => field.trim() !== "");

	return isValidate;
};
