import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import apiKeys from '../apiKeys';

const useMutationMoodCheckin = () => {
	const router = useRouter();
	const { mutate } = useMutation(apiKeys.createMoodCheckin, {
		onSuccess(data, variables, context) {
			console.log(data);
		},
		onError(error, variables, context) {
			console.log(error);
		},
	});

	return mutate;
};

export default useMutationMoodCheckin;
