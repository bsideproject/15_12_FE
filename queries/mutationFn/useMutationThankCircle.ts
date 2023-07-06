import { useMutation } from '@tanstack/react-query';

import useNavigation from '@/hooks/useNavigation';

import apiKeys from '../apiKeys';

const useMutationThankCircle = () => {
	const navigation = useNavigation();
	const { mutate } = useMutation(apiKeys.createThankCircle, {
		onSuccess: (data) => {
			navigation.push(`/thank-circle/start-game/room?room=${data?.data.room_name}`);
		},
		onError: (error) => {
			console.log(error);
		},
	});

	return mutate;
};

export default useMutationThankCircle;
