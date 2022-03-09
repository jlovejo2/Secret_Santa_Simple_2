export const authenticated = next => (root, args, context, info) => {
	if (!context.currentUser) {
		throw new Error('User not authenticated');
	}
	console.log('User Authenticated');
	return next(root, args, context, info);
};
