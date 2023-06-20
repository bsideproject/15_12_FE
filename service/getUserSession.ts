import { Auth } from 'aws-amplify';

const getUserSession = async () => {
	try {
		const token = await Auth.currentSession();
		return token;
	} catch (err) {
		console.log(err);
		return null;
	}
};

export default getUserSession;
