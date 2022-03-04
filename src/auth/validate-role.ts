export const validateRole = role => next => (root, args, context, info) => {
	if (context.currentUser.Role !== role) {
		throw new Error('User is unauthorized for this action');
	}

	return next(root, args, context, info);
};
