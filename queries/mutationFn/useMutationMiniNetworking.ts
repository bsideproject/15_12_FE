import { useMutation } from '@tanstack/react-query';

import useNavigation from '@/hooks/useNavigation';

import apiKeys from '../apiKeys';

const useMutationMiniNetworking = () => {
	const navigation = useNavigation();

	const { mutate } = useMutation(apiKeys.createMiniNetworking, {
		onSuccess: (data) => {
			navigation.push(`/mininetworking/start-game/${data?.data.room_name}`);
		},
		onError: (error) => {
			console.log(error);
		},
	});

	return mutate;
};

export default useMutationMiniNetworking;
