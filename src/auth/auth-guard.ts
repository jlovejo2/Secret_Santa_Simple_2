export const authenticated = next => (root, args, context, info) => {
	if (!context.currentUser) {
		throw new Error('Not authenticated');
	}

	return next(root, args, context, info);
};
