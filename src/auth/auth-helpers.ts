import { User } from '../graphql/types';
import jwt from 'jsonwebtoken';

export async function tradeTokenForUser(
	token: string
): Promise<User | boolean> {
	const verify = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

	if (!verify) return false;

	const decodedToken = jwt.decode(token, { complete: true });

	console.log('decode token ', decodedToken);

	return true;
}

function generateToken(user) {
	return jwt.sign(user, process.env.JWT_TOKEN_SECRET, {
		expiresIn: '120m'
	});
}
