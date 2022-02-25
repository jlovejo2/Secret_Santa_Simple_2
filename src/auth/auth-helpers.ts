import { User } from '../graphql/types';
import jwt from 'jsonwebtoken';
import { genSalt } from 'bcryptjs';
import { compare, hash } from 'bcrypt';

interface decodedTokenType {
	[key: string]: any;
}

export async function tradeTokenForUser(
	token: string
): Promise<User | boolean> {
	const verify = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

	if (!verify) return false;

	const decodedToken = jwt.decode(token, { complete: true }) as decodedTokenType;
	console.log('decode token ', decodedToken);

	return decodedToken.payload.userId;
}

export async function tradeUserForToken(user: User) {
	const token = await generateToken(user);
	const verify = await jwt.verify(token, process.env.JWT_TOKEN_SECRET);

	if (verify) return token;
	else
		throw new Error('Error when creating token for user, token was not verified');
}

async function generateToken(user) {
	return jwt.sign({ userId: user.userId }, process.env.JWT_TOKEN_SECRET, {
		expiresIn: '120m'
	});
}

export async function hashPassword(password: string): Promise<string> {
	try {
		const salt = await genSalt(10);
		const hashedPassword = await hash(password, salt);
		console.log(salt, hashedPassword);
		return hashedPassword;
	} catch (err) {
		console.error(` Error hashing password: `, err);
		return password;
	}
}

export async function validatePassword(password, hashedPassword) {
	const isValid = await compare(password, hashedPassword);
	if (isValid) {
		console.log('password is valid');
		return isValid;
	} else {
		console.log('password invald');
		return isValid;
	}
}
