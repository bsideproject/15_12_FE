'use client';

import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { useCount } from '@/atoms/socketAtoms';
import clsxm from '@/service/mergeStyle';
import Logo from 'public/images/activity-logo.svg';

import ElButton from '../elements/ElButton';
import ElGrid from '../elements/ElGrid';

import ActivityHead from './ActivityHead';

export default function MiniNetworkingMatching() {
	const count = useRecoilValue(useCount);

	const [groupNum, setGroupNum] = useState();

	const inputClasses = clsxm(
		'rounded',
		'border',
		'placeholder:text-gray010',
		'focus:!outline-none',
		'border-gray020',
		'focus:border-blue050',
		'w-[72.22%]',
		'py-[6.11%]',
		'px-[13.33%]',
	);

	return (
		<ElGrid between bottomSm>
			<div>
				<ActivityHead title="미니 네트워킹" />
				<p className="text-p2 text-gray070 mt-[4.49%] mb-[25%]">
					총 {count - 1}명이 참여합니다.
					<br />몇 그룹으로 구성할까요?
				</p>
				<div>
					<Logo className="mb-[5.13%] mx-auto" />
					<div className="flex justify-between items-center w-[57.69%] mx-auto">
						<input className={`${inputClasses}`} type="text" autoComplete="off" />
						<span className="text-h3 text-gray090">그룹</span>
					</div>
					<p className="text-p3 text-orange050 mt-[1.28%]">참여자보다 많은 그룹은 구성할 수 없습니다.</p>
				</div>
			</div>
			<ElButton type="button">그룹 구성하기</ElButton>
		</ElGrid>
	);
}
