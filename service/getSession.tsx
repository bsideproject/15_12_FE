import { CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js';

import userPool from './userPool';

interface UserAttributeType {
	[key: string]: string;
}

const getUserAttributes = (user: CognitoUser): Promise<UserAttributeType> =>
	new Promise((resolve, reject) => {
		user.getUserAttributes((error, attributes) => {
			if (error) {
				reject(error);
				console.error(error);
			} else {
				const results: UserAttributeType = {};

				attributes?.forEach((attribute) => {
					results[attribute.Name] = attribute.Value;
				});

				resolve(results);
			}
		});
	});

const getSession = () => {
	return new Promise((resolve, reject) => {
		const user = userPool.getCurrentUser();

		if (user) {
			user.getSession(async (err: Error | null, session: CognitoUserSession | null) => {
				if (err) {
					reject(err);
				} else {
					const attributes = await getUserAttributes(user);

					resolve({ session, attributes });
				}
			});
		}
	});
};

export default getSession;
