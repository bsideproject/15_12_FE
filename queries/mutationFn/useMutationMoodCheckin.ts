import { useMutation } from '@tanstack/react-query';

import useNavigation from '@/hooks/useNavigation';

import apiKeys from '../apiKeys';

const useMutationMoodCheckin = () => {
	const navigation = useNavigation();
	const { mutate } = useMutation(apiKeys.createMoodCheckin, {
		onSuccess(data) {
			navigation.push(`/mood-checkin/start-game/room?room=${data?.data.room_name}`);
		},
		onError(error) {
			console.log(error);
		},
	});

	return mutate;
};

export default useMutationMoodCheckin;
