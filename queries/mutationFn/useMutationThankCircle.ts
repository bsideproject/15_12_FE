import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useSetRecoilState } from 'recoil';

import { usePublish, useDisconnect } from '@/atoms/socketAtoms';
import useNavigation from '@/hooks/useNavigation';
import useSocket from '@/hooks/useSocket';
import getUserSession from '@/service/getUserSession';

import apiKeys from '../apiKeys';

const useMutationThankCircle = () => {
	const navigation = useNavigation();

	const setPublish = useSetRecoilState(usePublish);
	const setDisconnect = useSetRecoilState(useDisconnect);

	const { connect, publish, disconnect } = useSocket();

	const connectOrganizer = async (data: AxiosResponse<any, any>) => {
		const session = await getUserSession();

		connect(
			`thankcircle/${data?.data.room_name}`,
			{ Authorization: `${session?.getAccessToken().getJwtToken()}` },
			'주최자',
		);
	};

	const { mutate } = useMutation(apiKeys.createThankCircle, {
		onSuccess: (data) => {
			connectOrganizer(data);

			setPublish(() => publish);
			setDisconnect(() => disconnect);

			navigation.push(`/thankcircle/start-game/room?room=${data?.data.room_name}`);
		},
		onError: (error) => {
			console.log(error);
		},
	});

	return mutate;
};

export default useMutationThankCircle;
