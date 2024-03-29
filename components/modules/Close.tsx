'use client';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { useCount, useDisconnect } from '@/atoms/socketAtoms';
import useNavigation from '@/hooks/useNavigation';
import CloseImg from 'public/images/close-img.svg';

import ElButton from '../elements/ElButton';
import ElGrid from '../elements/ElGrid';

export default function Close() {
	const navigation = useNavigation();
	const setCount = useSetRecoilState(useCount);
	const disconnect = useRecoilValue(useDisconnect);

	const closeGame = () => {
		setCount(1);
		navigation.push('/home');
		disconnect();
	};

	return (
		<ElGrid between bottomSm>
			<div>
				<CloseImg className="mx-auto mt-[32.05%] mb-[7.69%]" />
				<h2 className="text-h3 text-gray090 text-center">참 잘했어요</h2>
				<p className="text-p2 text-gray070 text-center">
					이 분위기 그대로,
					<br />
					남은 시간도 즐겁게!
				</p>
			</div>
			<ElButton type="button" _onClick={closeGame}>
				HOME
			</ElButton>
		</ElGrid>
	);
}
