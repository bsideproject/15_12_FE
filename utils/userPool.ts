import { CognitoUserPool } from 'amazon-cognito-identity-js';

const userPool = new CognitoUserPool({
	UserPoolId: `${process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID}`,
	ClientId: `${process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID}`,
});

export default userPool;
