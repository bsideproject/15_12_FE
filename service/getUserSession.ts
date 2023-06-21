import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { Auth } from 'aws-amplify';

const getUserSession = async (): Promise<CognitoUserSession | null> => {
	try {
		const token = await Auth.currentSession();
		return token;
	} catch (err) {
		console.log(err);
		return null;
	}
};

export default getUserSession;
