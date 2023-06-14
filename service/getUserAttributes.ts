import { Auth } from 'aws-amplify';

interface UserAttributeType {
	[key: string]: string | boolean;
}

const getUserAttributes = async (): Promise<UserAttributeType> => {
	const { attributes } = await Auth.currentAuthenticatedUser();

	return attributes;
};

export default getUserAttributes;
