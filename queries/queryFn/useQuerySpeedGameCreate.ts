import { useQuery } from '@tanstack/react-query';

import { QuestionProps } from '@/components/screen/SpeedGame';
import useNavigation from '@/hooks/useNavigation';

import apiKeys from '../apiKeys';
import queryKeys from '../queryKeys';

const useQuerySpeedGameCreate = (questions: QuestionProps[]) => {
	const navigation = useNavigation();
	return useQuery(queryKeys.speedGamePost(questions), () => apiKeys.createSpeedGame(questions), {
		onSuccess(data) {
			navigation.push(`/speedgame/start-game/room?room=${data?.data.room_name}`);
		},
		onError(error) {
			console.log(error);
		},
	});
};

export default useQuerySpeedGameCreate;
