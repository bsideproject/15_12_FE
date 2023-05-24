import { CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js';

import userPool from './userPool';

interface UserAttributeType {
	[key: string]: string;
}

const getUserAttributes = (user: CognitoUser): Promise<UserAttributeType> =>
	new Promise((resolve, reject) => {
		user.getUserAttributes((err, attributes) => {
			if (err) {
				reject(err);
				return;
			}

			const results: UserAttributeType = {};

			attributes?.forEach((attribute) => {
				results[attribute.Name] = attribute.Value;
			});

			resolve(results);
		});
	});

const getSession = () => {
	return new Promise((resolve, reject) => {
		const user = userPool.getCurrentUser();

		if (user) {
			user.getSession(async (err: Error | null, session: CognitoUserSession | null) => {
				if (err) {
					reject(err);
					return;
				}

				const attributes = await getUserAttributes(user);

				resolve({ session, attributes });
			});
		}
	});
};

export default getSession;
