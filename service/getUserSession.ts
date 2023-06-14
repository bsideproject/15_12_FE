import { Auth } from 'aws-amplify';

const getUserSession = async () => {
	const test = Auth.currentSession();

	return test;
};

export default getUserSession;
