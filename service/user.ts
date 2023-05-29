import { CognitoUser } from 'amazon-cognito-identity-js';

import userPool from './userPool';

const user = (email: string) =>
	new CognitoUser({
		Username: email,
		Pool: userPool,
	});

export default user;
