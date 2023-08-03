import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useSetRecoilState } from 'recoil';

import { useDisconnect, usePublish } from '@/atoms/socketAtoms';
import useNavigation from '@/hooks/useNavigation';
import useNotify from '@/hooks/useNotify';
import useSocket from '@/hooks/useSocket';
import getUserSession from '@/service/getUserSession';

import apiKeys from '../apiKeys';

const useMutationSpeedGame = () => {
	const navigation = useNavigation();
	const toast = useNotify();

	const setPublish = useSetRecoilState(usePublish);
	const setDisconnect = useSetRecoilState(useDisconnect);

	const { connect, publish, disconnect } = useSocket();

	const connectOrganizer = async (data: AxiosResponse<any, any>) => {
		const session = await getUserSession();

		connect(`speedgame/${data?.data.room_name}`, { Authorization: `${session?.getAccessToken().getJwtToken()}` });
	};

	const { mutate } = useMutation(apiKeys.createSpeedGame, {
		onSuccess: (data) => {
			connectOrganizer(data);

			setPublish(() => publish);
			setDisconnect(() => disconnect);

			navigation.push(`/speedgame/start-game/${data?.data.room_name}`);
		},
		onError: (error: any) => {
			console.log(error);
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			error.response.status === 401 && toast.error('로그인 후 이용해 주세요.');
		},
	});

	return mutate;
};

export default useMutationSpeedGame;
