'use client';

import clsx from 'clsx';

import useNavigation from '@/hooks/useNavigation';
import NotImg from 'public/images/notfound-img.svg';

import ElGrid from '../elements/ElGrid';
import HomeHead from '../modules/HomeHead';

export default function ScreenNotFound() {
	const navigation = useNavigation();

	const buttonClasses = clsx('text-p3 text-blue050 underline underline-offset-4');

	return (
		<ElGrid>
			<HomeHead menu={false} />
			<div className="mx-auto mt-[17.63%] mb-[5.13%]">
				<NotImg />
			</div>
			<div className="text-center">
				<h2 className="text-h3 text-gray090 mb-[2.56%]">존재하지 않는 페이지입니다.</h2>
				<p className="text-p2 text-gray070 mb-[5.13%]">
					페이지의 주소를 잘 못 입력했거나,
					<br />
					주소를 변경하거나 삭제해 사용할 수 없습니다.
					<br />
					입력한 URL이 정확한지 다시 한번 확인해 주세요!
				</p>
				<button type="button" className={buttonClasses} onClick={() => navigation.push('/home')}>
					<strong>홈 화면으로 이동</strong>
				</button>
			</div>
		</ElGrid>
	);
}
