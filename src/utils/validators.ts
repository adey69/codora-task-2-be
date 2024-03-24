export const validateRegisterBody = ({
	name,
	email,
	password,
	confirmPassword,
}: IRegisterUserPayload) => {
	let error = "";
	if (!name) {
		error = "Name is required.";
	}

	if (!email) {
		error = "Email is required.";
	} else if (!/\S+@\S+\.\S+/.test(email)) {
		error = "Email is invalid.";
	}

	if (!password) {
		error = "Password is required.";
	} else if (password.length < 6) {
		error = "Password must be longer than 6 characters.";
	}

	if (!confirmPassword) {
		error = "Password Confirmation is required.";
	} else if (confirmPassword !== password) {
		error = "Passwords do not match.";
	}

	return error;
};
